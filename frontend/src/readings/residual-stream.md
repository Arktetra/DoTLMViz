---
title: Residual Stream
description: An explanation of residual stream.
published: true
order: 2
---

The residual stream is the sum of all previous outputs of layers of the model and also the input to each new layer in the model. The residual stream is fundamental as it is the central object of the transformers, as it is how the model:

- remembers information
- moves information between layers for composition
- stores the information that attention moves between positions.
