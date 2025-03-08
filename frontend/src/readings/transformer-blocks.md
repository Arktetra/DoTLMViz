---
title: Transformer Blocks
description: An explanation of transformer blocks.
published: true
order: 3
---

In a transformer, layer by layer, richer and richer contextualized representations of the meanings of input tokens are built using the attention mechanism. At the highest transformer blocks, the residual stream is usually representing the following token.

![image](/images/TransformerBlock.svg)

The transformer block includes:

1. **Residual Stream**
2. **Attention Layer**
3. **MLP**
4. **LayerNorm**

## Residual Stream

    The residual stream is the sum of all previous outputs of layers of the model and also the input to each new layer in the model. The residual stream is fundamental as it is the central object of the transformers, as it is how the model:

    - remembers information
    - moves information between layers for compoistion
    - stores the information that attention moves between positions.

## Attention Layer

Each attention layer in a transformer moves information between pairs of embeddings. Attention layers determine which pairs should interact and what information should flow between them. Thus, attention layers can be seen as iteratively transforming the embedding vectors to build a rich contextualized representations of the meaning of input tokens.

Attention layers are made up of a number of heads - each with their own parameters, attention pattern, and information on how to copy things from source to destination. These heads act independently and additively.

Each attention head can be thought of as consisting of two different circuits:

    - The QK circuit, which determines where to move information to and from.
    - The OV circuit, which determines what information to move.

![image](/images/AttentionHead.svg)

In the above figure,
$$
    \begin{align*}
        \qquad &b = \text{batch size} &\\
        \qquad &s = \text{sequence length} &\\
        \qquad &e = \text{embedding dimension} &\\
        \qquad &n = \text{number of heads} &\\
        \qquad &h = \text{head size (also called } d_{head}, \text{ or } d_k) \\
        \qquad &W_K, W_Q, W_V \text{ are projection matrices of shape } (n, e, h) \\
        \qquad &b_K, b_Q, b_V \text{ are biases of shape } (n, h) \\
        \qquad &W_O \text{ is a projection matrix of shape } (n, h, e) \\
        \qquad &b_O \text{ is a bias of shape } (e)
    \end{align*}
$$

Assuming that $\textbf{x}$ represents the contextual embedding vector at `resid_pre` in the above figure, the attention scores is given by,
    $$
    \begin{align}
            \text{attn scores} = QK^T = \textbf{x}W_QW_K^T\textbf{x}^T
    \end{align}
    $$

The attention scores are scaled and masked, which is then used for computing the attention probabilities,
    $$
    \begin{align}
        A = \text{softmax}\bigg(\dfrac{\textbf{x}W_QW_k^T\textbf{x}^T}{\sqrt{d_{head}}}\bigg)
    \end{align}
    $$

For each key position, we take a weighted average of value vectors from each query position, in accordance with how much attention destination pays to source,
    $$
    \begin{align}
        \textbf{z} = A\textbf{x}W_V
    \end{align}
    $$

A final linear transformation is applied to $\textbf{z}$ by the projection matrix $W_O$ mapping the vectors into the right size to be added to the residual stream
    $$
    \begin{align}
        \text{result} &= \textbf{z}W_O \nonumber \\
        &= A\textbf{x}W_VW_O
    \end{align}
    $$

Finally, the heads are summed over to gain the output of the attention layer as shown in the above figure.

## MLP

The MLP operates on positions in the residual stream independently, and in exactly the same way. It does not move information between positions. Once attention has moved relevant information to a single position in the residual stream, MLPs can actually do computation, reasoning, lookup information, etc.

![MLP](/images/MLP.svg)

The MLP layers are just a standard neural network, with a singular hidden layer and a non-linear activation function. The hidden dimension is normally, $\text{d\_mlp} = 4 * \text{d\_model}$ as shown in the above figure.

## LayerNorm

LayerNorm is a simple normalization function applied at the start of each layer. It converts each input vector to have zero mean and unit variance, and then applies an elementwise scaling and translation.

![LN](/images/LayerNorm.svg)
