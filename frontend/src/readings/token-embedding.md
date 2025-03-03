---
title: Token Embedding
description: An explanation of token embedding.
published: true
order: 1
---

A token embedding is a learned mapping that converts discrete tokens (such as words, subwords, or characters) into continuous, high-dimensional vectors. In transformer models, each token is mapped via a lookup table (typically denoted as $W_E$) to its corresponding vector. These embedding form the initial input layer, enabling the model to begin constructing contextual representations.
