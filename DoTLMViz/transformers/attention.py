import torch
import torch.nn as nn

from jaxtyping import Float
from torch import Tensor


class Attention(nn.Module):
    """Implementation of Attention."""

    def __init__(self, config):
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

    def forward(
        self, normalized_resid_pre: Float[Tensor, "batch seq_len d_model"]
    ) -> Float[torch.Tensor, "batch seq_len d_model"]:
        """Forward pass for Attention layer."""
        raise NotImplementedError
