import einops
import torch
import torch.nn as nn

from jaxtyping import Float
from torch import Tensor

from DoTLMViz.core import Ckpt


class Attention(nn.Module):
    """Multi-head attention layer for transforming the embedding vectors to build
    a contextualized representations of the meaning of input tokens."""

    IGNORE: torch.Tensor

    def __init__(self, config, device=None):
        super().__init__()
        self.config = config
        self.W_Q = nn.Parameter(torch.empty((config.n_heads, config.d_model, config.d_head)))
        self.W_K = nn.Parameter(torch.empty((config.n_heads, config.d_model, config.d_head)))
        self.W_V = nn.Parameter(torch.empty((config.n_heads, config.d_model, config.d_head)))
        self.W_O = nn.Parameter(torch.empty((config.n_heads, config.d_head, config.d_model)))
        self.b_Q = nn.Parameter(torch.zeros((config.n_heads, config.d_head)))
        self.b_K = nn.Parameter(torch.zeros((config.n_heads, config.d_head)))
        self.b_V = nn.Parameter(torch.zeros((config.n_heads, config.d_head)))
        self.b_O = nn.Parameter(torch.zeros((config.d_model)))
        nn.init.normal_(self.W_Q, std=config.init_range)
        nn.init.normal_(self.W_K, std=config.init_range)
        nn.init.normal_(self.W_V, std=config.init_range)
        nn.init.normal_(self.W_O, std=config.init_range)
        self.register_buffer("IGNORE", torch.tensor(float("-inf"), device=device, dtype=torch.float32))

        # for checkpointing
        self.ckpt_q = Ckpt()
        self.ckpt_k = Ckpt()
        self.ckpt_v = Ckpt()
        self.ckpt_scores = Ckpt()
        self.ckpt_pattern = Ckpt()
        self.ckpt_z = Ckpt()
        self.ckpt_attn_out = Ckpt()

    def forward(
        self, normalized_resid_pre: Float[Tensor, "batch seq_len d_model"]
    ) -> Float[torch.Tensor, "batch seq_len d_model"]:
        query = (
            einops.einsum(
                normalized_resid_pre,
                self.W_Q,
                "batch seq_len d_model, n_heads d_model d_head -> batch seq_len n_heads d_head",
            )
            + self.b_Q
        )
        key = (
            einops.einsum(
                normalized_resid_pre,
                self.W_K,
                "batch seq_len d_model, n_heads d_model d_head -> batch seq_len n_heads d_head",
            )
            + self.b_K
        )
        value = (
            einops.einsum(
                normalized_resid_pre,
                self.W_V,
                "batch seq_len d_model, n_heads d_model d_head -> batch seq_len n_heads d_head",
            )
            + self.b_V
        )

        attn_scores = einops.einsum(
            query,
            key,
            "batch seq_len_Q n_heads d_head, batch seq_len_K n_heads d_head -> batch n_heads seq_len_Q seq_len_K",
        )

        attn_scores_masked = self.apply_causal_mask(attn_scores / self.config.d_head**0.5)
        attn_pattern = attn_scores_masked.softmax(-1)

        z = einops.einsum(
            value,
            attn_pattern,
            "batch seq_len_K n_heads d_head, batch n_heads seq_len_Q seq_len_K -> batch seq_len_Q n_heads d_head",
        )

        attn_out = (
            einops.einsum(
                z, self.W_O, "batch seq_len_Q n_heads d_head, n_heads d_head d_model -> batch seq_len_Q d_model"
            )
            + self.b_O
        )

        self.ckpt_q(query)
        self.ckpt_k(key)
        self.ckpt_v(value)
        self.ckpt_scores(attn_scores_masked)
        self.ckpt_pattern(attn_pattern)
        self.ckpt_z(z)
        self.ckpt_attn_out(attn_out)

        return attn_out

    def apply_causal_mask(
        self, attn_scores: Float[torch.Tensor, "batch n_heads seq_len_Q seq_len_K"]
    ) -> Float[torch.Tensor, "batch n_heads seq_len_Q seq_len_K"]:
        """Apply causal mask on attention scores."""
        all_ones = torch.ones(attn_scores.size(-2), attn_scores.size(-1), device=attn_scores.device)
        mask = torch.triu(all_ones, diagonal=1).bool()
        attn_scores.masked_fill_(mask, self.IGNORE)
        return attn_scores
