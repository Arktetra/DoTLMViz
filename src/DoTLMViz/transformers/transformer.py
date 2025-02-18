import torch
import torch.nn as nn

from jaxtyping import Float, Int
from torch import Tensor

from DoTLMViz.core.ckpt import Ckpt

from .embedding import Embedding, PosEmbedding, Unembedding
from .attention import Attention
from .layernorm import LayerNorm
from .mlp import MLP


class TransformerBlock(nn.Module):
    """The Transformer block which consists of the residual stream, MLP, attention
    layer, and normalization layer (LayerNorm)."""

    def __init__(self, config):
        super().__init__()
        self.config = config
        self.ckpt_resid_pre = Ckpt()
        self.ln1 = LayerNorm(config)
        self.attn = Attention(config)
        self.ckpt_resid_mid = Ckpt()
        self.ln2 = LayerNorm(config)
        self.mlp = MLP(config)
        self.ckpt_resid_post = Ckpt()

    def forward(
        self, resid_pre: Float[torch.Tensor, "batch seq_len d_model"]
    ) -> Float[torch.Tensor, "batch seq_len d_model"]:
        """
        Forward pass for transformer block.
        """
        self.ckpt_resid_pre(resid_pre)
        resid_mid = self.attn(self.ln1(resid_pre)) + resid_pre
        self.ckpt_resid_mid(resid_mid)
        resid_post = self.mlp(self.ln2(resid_mid)) + resid_mid
        self.ckpt_resid_post(resid_post)
        return resid_post


class Transformer(nn.Module):
    """A Transformer model that will be created as according to the config passed."""

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
        residual = self.embed(tokens) + self.pos_embed(tokens)
        for block in self.blocks:
            residual = block(residual)
        residual = self.ln_final(residual)
        return self.unembed(residual)
