import torch
import torch.nn as nn

from jaxtyping import Float, Int
from torch import Tensor

from .embedding import Embedding, PosEmbedding, Unembedding
from DoTLMViz.transformers.attention import Attention
from DoTLMViz.transformers.layernorm import LayerNorm
from DoTLMViz.transformers.mlp import MLP


class TransformerBlock(nn.Module):
    """Implmentation of Transformer block for transformer."""

    def __init__(self, config):
        super().__init__()
        self.config = config
        self.ln1 = LayerNorm(config)
        self.attn = Attention(config)
        self.ln2 = LayerNorm(config)
        self.mlp = MLP(config)

    def forward(
        self, resid_pre: Float[torch.Tensor, "batch seq_len d_model"]
    ) -> Float[torch.Tensor, "batch seq_len d_model"]:
        """
        Forward pass for transformer block.
        """
        raise NotImplementedError


class Transformer(nn.Module):
    """Implementation of Transformer."""

    def __init__(self, config):
        super().__init__()
        self.config = config
        self.embed = Embedding(config)
        self.pos_embed = PosEmbedding(config)
        self.blocks = nn.ModuleList([TransformerBlock(config) for _ in range(config.n_layers)])
        self.ln_final = LayerNorm(config)
        self.unembed = Unembedding(config)

    def forward(self, tokens: Int[Tensor, "batch seq_len"]) -> Float[Tensor, "batch seq_len d_vocab"]:
        """
        Forward pass for transformer.
        """
        raise NotImplementedError
