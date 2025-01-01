import torch
import torch.nn as nn

from jaxtyping import Float
from torch import Tensor


class LayerNorm(nn.Module):
    """Implementation of LayerNorm."""

    def __init__(self, config):
        super().__init__()
        self.config = config
        self.w = nn.Parameter(torch.ones(config.d_model))
        self.b = nn.Parameter(torch.zeros(config.d_model))

    def forward(self, residual: Float[Tensor, "batch seq_len d_model"]):
        """Forward pass of LayerNorm.

        Args:
            residual (_type_): _description_
        """
        raise NotImplementedError
