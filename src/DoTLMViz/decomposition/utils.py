import torch

from jaxtyping import Float
from torch import Tensor
from typing import Optional


def edm(X: Float[Tensor, "n_points dim"]) -> Float[Tensor, "n_points n_points"]:
    """
    Compute Euclidean Distance Matrix, a $n \times n$ matrix representing the
    spacing of a set of $n$ points in Euclidean space. For points $x_1, x_2,
    \ldots x_n$ in $k$-dimensional space $\mathbb{R}^k$, the elements of their
    Euclidean distancem matrix are given by the square of distances between
    them.

    Args:
        X (Float[Tensor, "n_points dim"]): $n$ number of points with each
        of "dim" dimension.

    Return:
        Float[Tensor, "n_points n_points"]: Euclidean distance between each point
        in the input.
    """
    XXT = X @ X.T
    diag_XXT = torch.diag(XXT)
    return (-2 * XXT + diag_XXT).T + diag_XXT


def softmax(
    X: Float[Tensor, "n_points n_points"], diag_zero: Optional[bool] = True, eps: Optional[float] = 1e-8
) -> Float[Tensor, "n_points n_points"]:
    """
    Compute softmax for each row in $X$.

    Note: For use in t-SNE only.

    Args:
        X (Float[Tensor, "n_points n_points"]): euclidean distances.
        diag_zero (Optional[bool]): condition to replace primary diagonal with zero.
        eps (Optional[bool]): a small constant for numerical stability.
    """
    e_x = torch.exp(X)

    if diag_zero:
        e_x.fill_diagonal_(0.0)

    e_x += eps

    return e_x / e_x.sum(dim=1)[:, None]
