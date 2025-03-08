---
title: Lanuage Modeling Head
description: An explanation of Language Modeling Head.
published: true
order: 4
---

Here, the word head refers to the additional neural circuitry that is added on top of the basic transformer architecture when we apply pretrained transformer models to various tasks. The language model head is the circuitry we need to do language modeling. The task of the language modeling head is to take the output of the final transformer layer from the last token $N$ and use it to predict the upcoming word at position $N + 1$.

The language modeling head consists of a linear layer and a softmax layer.

1. **Unembedding Layer**
    The unembedding layer is a linear layer which projects the output $h_N^L$ (the output token embedding at position $N$ from the final transformer block $L$) to the logit vector that will have a single score for each of the $|V|$ possible words in the vocabulary $V$. The logit vector, $\textbf{u}$, has a dimensionality of $1 \times |V|$.
    $$
    \begin{align}
        \textbf{u} = h^L_N W_U
    \end{align}
    $$

2. **Softmax Layer**
    The logits $\textbf{u}$ from the unembedding layer are converted into probabilities $\textbf{y}$ over the vocabulary by a softmax layer.
    $$
    \begin{align}
        \textbf{y} = \text{softmax}(\textbf{u})
    \end{align}
    $$

To generate text, a word is decoded from the probabilities $\textbf{y}$ obtained from the Softmax layer.
