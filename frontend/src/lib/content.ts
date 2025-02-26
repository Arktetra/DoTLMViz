export const content: Record<string, string> = {
	'token-embedding': `<p><strong>Token Embedding:</strong> A token embedding is a learned mapping that converts discrete tokens (such as words, subwords, or characters) into continuous, high-dimensional vectors. In transformer models, each token is mapped via a lookup table (typically denoted as <em>W<sub>E</sub></em>) to its corresponding vector. These embeddings form the initial input layer, enabling the model to begin constructing contextual representations.</p>`,

	'positional-embedding': `<p><strong>Positional Embedding:</strong> Positional embeddings inject sequence order information into the model. They map each token's position in the input sequence to a unique vector, which is then added to the token embeddings. This addition allows the transformer to distinguish between tokens based solely on their positions, ensuring that the sequential context is preserved.</p>`,

	'layernorm': `<p><strong>Layer Normalization (LayerNorm):</strong> LayerNorm is applied at the start of each transformer layer to normalize input vectors to have zero mean and unit variance. Following normalization, learnable scaling and bias parameters are applied. This process not only stabilizes the training process but also smooths the gradient flow. In visualization, comparing the distributions before and after LayerNorm can provide insights into its impact on the data.</p>`,

	'attention-head': `<p><strong>Attention Head:</strong> An attention head is a critical component of the self-attention mechanism in transformers. It computes a weighted representation of the input by using separate learned projections for queries (<em>W<sub>Q</sub></em>), keys (<em>W<sub>K</sub></em>), and values (<em>W<sub>V</sub></em>). The attention scores are calculated using the formula:</p>
  <p style="text-align: center;">A = softmax((x · W<sub>Q</sub> · W<sub>K</sub><sup>T</sup>) / √(d<sub>head</sub>))</p>
  <p>This process enables the model to capture diverse relationships between tokens by utilizing multiple independent heads.</p>`,

	'mlp': `<p><strong>Multi-Layer Perceptron (MLP):</strong> Within each transformer block, the MLP is a feedforward neural network that processes each token independently. It generally consists of a linear projection that expands the dimensionality (often by a factor of 4), followed by a non-linear activation function (such as GeLU), and then a second linear projection that maps the result back to the original dimension. This component is essential for performing complex, position-wise transformations on the data.</p>`,

	'unembedding': `<p><strong>Unembedding:</strong> The unembedding process maps the final hidden representations from the transformer back to the token vocabulary space. This is achieved through a linear projection using a matrix (denoted as <em>W<sub>U</sub></em>), which produces logits for each token. These logits are then passed through a softmax function to generate a probability distribution over the vocabulary, ultimately guiding the model's text generation.</p>`,

	'control-parameter': `<p><strong>Control Parameters:</strong> These parameters govern the sampling process during text generation, influencing both the randomness and diversity of the output:</p>
  <ul>
	<li><strong>Temperature:</strong> Adjusts the randomness of predictions. Lower values (e.g., 0.7) lead to more deterministic outputs, while higher values (e.g., 1.5) introduce greater randomness. The effect is mathematically described as <em>y = softmax(u / τ)</em>, where τ is the temperature.</li>
	<li><strong>Top-p (Nucleus Sampling):</strong> Limits sampling to the smallest set of tokens whose cumulative probability meets or exceeds a threshold <em>p</em> (for example, 0.9), ensuring that only the most likely tokens are considered.</li>
	<li><strong>Top-k:</strong> Restricts the sampling to the top <em>k</em> tokens with the highest probabilities (for instance, k=50), further controlling the randomness by focusing on the most promising candidates.</li>
  </ul>`
  };

