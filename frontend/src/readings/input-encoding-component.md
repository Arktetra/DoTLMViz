---
title: Input Encoding Component
description: An explanation of token embedding.
published: true
order: 1
---

The input encoding component converts a sequence of $N$ tokens into a matrix $X$ of shape $[N \times d]$, where $d$ is the dimension of the embedding vectors. The matrix $X$ has an embedding for each word in the context.

The input embedding is formed from a combination of two embeddings: an input token embedding and an input positional embedding.

1. **Input Token Embedding**

    A token embedding is a learned mapping that converts discrete tokens (such as words, subwords, or characters) into continuous, high-dimensional vectors. In transformer models, each token is mapped via a lookup table (typically denoted as $W_E$) to its corresponding vector. These embedding form the initial input layer, enabling the model to begin constructing contextual representations.

2. **Positional Embedding**

    The positional embedding can be thought of as a lookup table mapping the index of the position of each token to a residual stream vector. This helps transformers to have access to positional information so they know two tokens are next to each other (and hence probably relevant to each other).

An input embedding that captures the positional information is produced by adding the token embedding for each input to its corresponding positional embedding. The individual token and position embedding are both of shape $[1 \times d]$, so their sum is also $[1 \times d]$.
