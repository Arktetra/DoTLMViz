---
title: Decoding
description: An explanation of decoding.
published: true
order: 5
---

The task of choosing a word to generate on the basis of the probabilities that the model assigns to the possible words is called decoding. Decoding from a language model by repeatedly choosing the next word conditioned on the previous choices is called autoregressive generation or causal LM generation. Some of the common methods for decoding are described below:

1. Greedy Decoding
2. Beam Search
3. Random Sampling
4. Top-k Sampling
5. Nucleus or Top-p Sampling
6. Temperature Sampling

## Greedy Decoding

In greedy decoding, the word among the possible words for which the model assigns the largest probability is chosen as the next word. It is a greedy algorithm because it makes the choice which is locally optimal, and doesn't take into concern whether the choice will turn out to have been the best choice.
$$
\begin{align}
\hat{w_t} = \text{argmax}_{w \in V} P(w | \textbf{w}_{<t})
\end{align}
$$

In practice, it is not used with large language models because the word it chooses are extremely predictable, which makes the resulting text generic and often quite repetitive.

## Random Sampling

In random sampling, the next word $w$ is chosen by sampling from the distribution $p(w)$. It means that for generating a sequence of words $W = w_1, w_2, \ldots, w_N$ until the end-of-sequence token is reached, $w \sim p(w)$ if performed. Random sampling also doesn't work well because even though it mostly generates sensible, high-probable words, there are many odd, low probability words in the tail of the distribution, and even though each one is low probability, if all those rare words are added up, they constitute a large enough portion of the distribution that they get chosen often enough to result in generating weird sentences.

## Top-k Sampling

Top-$k$ sampling is the generalizatoin of greedy decoding. It first selects the words with top $k$ probabilities, renormalizes their distribution and performs random sampling on them. More formally:

1. Choose a number of words $k$.
2. For each word in the vocabulary $V$, use the language model to compute the likelihood of this word given the context $p(w_t | \textbf{w}_{< t})$
3. Sort the words by their likelihood, and select the top-$k$ most probable words.
4. Renormalize the scores of the selected $k$ words to be a legitimate probability distribution.
5. Randomly sample a word from the renormalized distribution.

## Nucleus or Top-p Sampling

A problem with top-$k$ sampling is that $k$ is fixed, but the shape of the probability distribution over words differ in different contexts. An alternative that solves this problem is top-$p$ sampling or nucleus sampling which selects the top $p$ percent of the probability mass instead of the top $k$ words. The hope of top-$p$ sampling is that the measure will be more robust in very different cotnexts, dynamically increasing and decreasing the pool of word candidates.

Given a distribution $P(w_t | \textbf{w}_{<t})$, the distribution is sorted by their likelihoods, and then the top-$p$ vocabulary $V^{(p)}$ is the smallest set of words such that
$$
\begin{align}
    \sum_{w \in V^{(p)}} P(w | \textbf{w}_{<t}) \ge p
\end{align}
$$

## Temperature Sampling

In temperature sampling, we reshape the distribution by simply dividing the logit by a temperature parameter $\tau$ before we normalize it by passing it through a softmax. Thus, the probability vector $\textbf{y}$ is calculated as
$$
\begin{align}
\textbf{y} = \text{softmax}(\textbf{u} / \tau)
\end{align}
$$
