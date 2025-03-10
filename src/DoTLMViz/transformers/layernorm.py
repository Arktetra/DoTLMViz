import torch
import torch.nn as nn

from jaxtyping import Float
from torch import Tensor

from DoTLMViz.core import Ckpt


class LayerNorm(nn.Module):
    """
    Converts each input vector to have zero mean and unit variance, and then
    applies an elementwise scaling and translation.
    """

    def __init__(self, config):
        super().__init__()
        self.config = config
        self.w = nn.Parameter(torch.ones(config.d_model))
        self.b = nn.Parameter(torch.zeros(config.d_model))

        # For checkpointing
        self.ckpt_scaled = Ckpt()
        self.ckpt_normalized = Ckpt()

    def forward(self, residual: Float[Tensor, "batch seq_len d_model"]) -> Float[Tensor, "batch seq_len d_model"]:
        mean = residual.mean(dim=-1, keepdim=True)
        var = residual.var(dim=-1, keepdim=True, unbiased=False)
        residual = (residual - mean) / (var + self.config.layer_norm_eps).sqrt()
        self.ckpt_scaled(residual)
        residual = residual * self.w + self.b
        self.ckpt_normalized(residual)
        return residual
