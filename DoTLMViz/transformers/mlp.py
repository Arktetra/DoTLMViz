import torch
import torch.nn as nn

from jaxtyping import Float


class MLP(nn.Module):
    """Implementation of MLP for transformer."""

    def __init__(self, config):
        super().__init__()
        self.config = config
        self.W_in = nn.Parameter(torch.empty((config.d_model, config.d_mlp)))
        self.W_out = nn.Parameter(torch.empty((config.d_mlp, config.d_model)))
        self.b_in = nn.Parameter(torch.zeros((config.d_mlp)))
        self.b_out = nn.Parameter(torch.zeros((config.d_model)))
        nn.init.normal_(self.W_in, std=config.init_range)
        nn.init.normal_(self.W_out, std=config.init_range)

    def forward(
        self, residual: Float[torch.Tensor, "batch seq_len d_model"]
    ) -> Float[torch.Tensor, "batch seq_len d_model"]:
        """Forward pass for MLP"""
        raise NotImplementedError
