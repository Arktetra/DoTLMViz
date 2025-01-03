import torch
import torch.nn as nn

from jaxtyping import Float, Int
from torch import Tensor


class Embedding(nn.Module):
    """Implementation of Embedding."""

    def __init__(self, config):
        super().__init__()
        self.config = config
        self.W_E = nn.Parameter(torch.empty((config.d_vocab, config.d_model)))
        nn.init.normal_(self.W_E, std=self.config.init_range)

    def forward(self, tokens: Int[Tensor, "batch seq_len"]) -> Float[torch.Tensor, "batch seq_len d_model"]:
        """Forward pass for Embedding layer."""
        raise NotImplementedError


class PosEmbedding(nn.Module):
    """Implementation of Positional Embedding."""

    def __init__(self, config):
        super().__init__()
        self.config = config
        self.W_pos = nn.Parameter(torch.empty((config.n_ctx, config.d_model)))
        nn.init.normal_(self.W_pos, std=config.init_range)

    def forward(self, tokens: Int[Tensor, "batch seq_len"]) -> Float[Tensor, "batch seq_len d_model"]:
        """Forward pass for Position Embedding Layer."""
        raise NotImplementedError


class Unembedding(nn.Module):
    """Implementation of Unembedding."""

    def __init__(self, config):
        super().__init__()
        self.config = config
        self.W_U = nn.Parameter(torch.empty((config.d_model, config.d_vocab)))
        self.b_U = nn.Parameter(torch.zeros((config.d_vocab), required_grad=False))
        nn.init.normal_(self.W_U, std=config.init_range)

    def forward(
        self, normalized_resid_final: Float[Tensor, "batch seq_len d_model"]
    ) -> Int[torch.Tensor, "batch seq_len d_vocab"]:
        """Forward pass for Unembedding Layer."""
        raise NotImplementedError
