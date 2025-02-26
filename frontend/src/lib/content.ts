export const content: Record<string, string> = {
	'gpt2-small': `
  <section id="gpt2-small">
	<p><strong>GPT‑2 Small</strong> is a 124-million parameter decoder‑only transformer model developed by OpenAI. It is widely used for text generation, language understanding, and as a base model for further research and fine‑tuning.</p>
	<h2>Model Architecture</h2>
	<ul>
	  <li><strong>Number of Layers:</strong> 12 transformer blocks</li>
	  <li><strong>Hidden Size:</strong> 768</li>
	  <li><strong>Attention Heads:</strong> 12 (each head has a dimension of 64, since 768/12 = 64)</li>
	  <li><strong>Feed‑Forward Network Dimension:</strong> 3072 (typically 4 times the hidden size)</li>
	  <li><strong>Vocabulary Size:</strong> 50,257 tokens</li>
	  <li><strong>Context Window:</strong> Up to 1024 tokens</li>
	</ul>
	<h2>Core Components</h2>
	<p>The GPT‑2 Small model is built exclusively using decoder layers of the transformer architecture. Its key components include:</p>
	<ul>
	  <li><strong>Token Embedding:</strong> Converts discrete tokens into continuous vectors using a learned lookup table.</li>
	  <li><strong>Positional Embedding:</strong> Adds information about token positions to the token embeddings, allowing the model to understand word order.</li>
	  <li><strong>Self‑Attention Mechanism:</strong> Uses multiple attention heads to capture relationships between tokens. The attention scores are computed using the formula:</li>
	</ul>
	<p style="text-align:center; font-style:italic;">Attention = softmax((Q · K<sup>T</sup>) / √(d<sub>head</sub>))</p>
	<ul>
	  <li><strong>Layer Normalization (LayerNorm):</strong> Applied before or after each sub‑layer to stabilize training by normalizing inputs.</li>
	  <li><strong>Multi‑Layer Perceptron (MLP):</strong> A feed‑forward network that processes each token independently, typically expanding and then reducing the dimensionality.</li>
	  <li><strong>Unembedding:</strong> Projects the final hidden states back into the vocabulary space to produce logits for next-token prediction.</li>
	</ul>
	<h2>Training & Usage</h2>
	<p>GPT‑2 Small was trained on a large dataset (WebText) using a self‑supervised objective where the model predicts the next token in a sequence. Due to its moderate size and open availability, it has become a popular choice for educational purposes and rapid prototyping of text generation systems.</p>
	<p>This project, DoTLMViz, leverages GPT‑2 Small to provide interactive visualizations of these internal components, allowing users to explore embeddings, attention patterns, layer norms, and more.</p>
  </section>
`,
	'token-embedding': `<p><strong>Token Embedding:</strong> A token embedding is a learned mapping that converts discrete tokens (such as words, subwords, or characters) into continuous, high-dimensional vectors. In transformer models, each token is mapped via a lookup table (typically denoted as <em>W<sub>E</sub></em>) to its corresponding vector. These embeddings form the initial input layer, enabling the model to begin constructing contextual representations.</p>`,

	'positional-embedding': `<p><strong>Positional Embedding:</strong> Positional embeddings inject sequence order information into the model. They map each token's position in the input sequence to a unique vector, which is then added to the token embeddings. This addition allows the transformer to distinguish between tokens based solely on their positions, ensuring that the sequential context is preserved.</p>`,

	layernorm: `<p><strong>Layer Normalization (LayerNorm):</strong> LayerNorm is applied at the start of each transformer layer to normalize input vectors to have zero mean and unit variance. Following normalization, learnable scaling and bias parameters are applied. This process not only stabilizes the training process but also smooths the gradient flow. In visualization, comparing the distributions before and after LayerNorm can provide insights into its impact on the data.</p>`,

	'attention-head': `<p><strong>Attention Head:</strong> An attention head is a critical component of the self-attention mechanism in transformers. It computes a weighted representation of the input by using separate learned projections for queries (<em>W<sub>Q</sub></em>), keys (<em>W<sub>K</sub></em>), and values (<em>W<sub>V</sub></em>). The attention scores are calculated using the formula:</p>
  <p style="text-align: center;">A = softmax((x · W<sub>Q</sub> · W<sub>K</sub><sup>T</sup>) / √(d<sub>head</sub>))</p>
  <p>This process enables the model to capture diverse relationships between tokens by utilizing multiple independent heads.</p>`,

	mlp: `<p><strong>Multi-Layer Perceptron (MLP):</strong> Within each transformer block, the MLP is a feedforward neural network that processes each token independently. It generally consists of a linear projection that expands the dimensionality (often by a factor of 4), followed by a non-linear activation function (such as GeLU), and then a second linear projection that maps the result back to the original dimension. This component is essential for performing complex, position-wise transformations on the data.</p>`,
	'mlp-linear': `
    <section id="mlp-linear-up">
      <h1><strong>MLP Linear (Expansion)</strong></h1>
      <p>This is the first linear transformation in the MLP module. It expands the input hidden state from 768 dimensions to 3072 dimensions using a learned weight matrix of shape [768, 3072] and a bias vector of shape [3072]. This expansion enables the model to capture a richer, higher-dimensional representation before nonlinearity is applied.</p>
    </section> <br>
<section id="mlp-linear-down">
      <h1><strong>MLP Linear (Projection)</strong></h1>
      <p>This is the second linear transformation in the MLP module. It projects the expanded representation from 3072 dimensions back to 768 dimensions using a weight matrix of shape [3072, 768] and a bias vector of shape [768]. This projection fuses the nonlinearly transformed features back into the model’s original dimensionality, preparing the output for subsequent processing in the transformer block.</p>
    </section>
  `,
	'mlp-gelu': `
    <section id="mlp-gelu">
      <h1><strong>MLP GeLU Activation</strong></h1>
      <p>The Gaussian Error Linear Unit (GeLU) activation function introduces nonlinearity into the MLP module. Unlike simpler functions such as ReLU, GeLU probabilistically weights inputs based on their value under a Gaussian distribution, which results in smoother and more nuanced activations.</p>
    </section>
  `,
	unembedding: `<p><strong>Unembedding:</strong> The unembedding process maps the final hidden representations from the transformer back to the token vocabulary space. This is achieved through a linear projection using a matrix (denoted as <em>W<sub>U</sub></em>), which produces logits for each token. These logits are then passed through a softmax function to generate a probability distribution over the vocabulary, ultimately guiding the model's text generation.</p>`,

	'control-parameter': `<p><strong>Control Parameters:</strong> These parameters govern the sampling process during text generation, influencing both the randomness and diversity of the output:</p>
  <ul>
	<li><strong>Temperature:</strong> Adjusts the randomness of predictions. Lower values (e.g., 0.7) lead to more deterministic outputs, while higher values (e.g., 1.5) introduce greater randomness. The effect is mathematically described as <em>y = softmax(u / τ)</em>, where τ is the temperature.</li>
	<li><strong>Top-p (Nucleus Sampling):</strong> Limits sampling to the smallest set of tokens whose cumulative probability meets or exceeds a threshold <em>p</em> (for example, 0.9), ensuring that only the most likely tokens are considered.</li>
	<li><strong>Top-k:</strong> Restricts the sampling to the top <em>k</em> tokens with the highest probabilities (for instance, k=50), further controlling the randomness by focusing on the most promising candidates.</li>
  </ul>`
};
