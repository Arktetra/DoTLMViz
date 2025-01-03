import torch

from transformer_lens import HookedTransformer

from DoTLMViz.transformers.config import GPT2SmallConfig as Config
from DoTLMViz.transformers.layernorm import LayerNorm
from DoTLMViz.transformers.embedding import Embedding, PosEmbedding, Unembedding
from DoTLMViz.transformers.attention import Attention
from DoTLMViz.transformers.mlp import MLP
from DoTLMViz.transformers.transformer import TransformerBlock, Transformer

device = "cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"


def load_gpt2_test(cls, gpt2_layer, input):
    cfg = Config(debug=True)
    layer = cls(cfg).to(device)
    layer.load_state_dict(gpt2_layer.state_dict(), strict=False)

    print("Input shape: ", input.shape)

    output = layer(input)
    if isinstance(output, tuple):
        output = output[0]
    print("output shape: ", output.shape)

    try:
        reference_output = gpt2_layer(input)
    except:
        reference_output = gpt2_layer(input, input, input)

    print("Reference output shape: ", reference_output.shape, "\n")
    comparison = torch.isclose(output, reference_output, atol=1e-4, rtol=1e-3)
    print(f"{comparison.sum() / comparison.numel():.2%} of the values are correct.\n")
    return True if comparison.sum() / comparison.numel() == 1 else False


class TestTransformer:
    reference_gpt2 = HookedTransformer.from_pretrained(
        "gpt2-small", fold_ln=False, center_unembed=False, center_writing_weights=False, device=device
    )
    text = "Alpha beta gamma delta epsilon eta zeta"
    tokens = reference_gpt2.to_tokens(text).to(device)
    logits, cache = reference_gpt2.run_with_cache(tokens, device=device)

    def test_embedding(self):
        assert load_gpt2_test(Embedding, self.reference_gpt2.embed, self.tokens)

    def test_pos_embedding(self):
        assert load_gpt2_test(PosEmbedding, self.reference_gpt2.pos_embed, self.tokens)

    def test_layer_norm(self):
        assert load_gpt2_test(LayerNorm, self.reference_gpt2.ln_final, self.cache["resid_post", 11])

    def test_attention(self):
        assert load_gpt2_test(Attention, self.reference_gpt2.blocks[0].attn, self.cache["normalized", 0, "ln1"])

    def test_mlp(self):
        assert load_gpt2_test(MLP, self.reference_gpt2.blocks[0].mlp, self.cache["normalized", 0, "ln2"])

    def test_transformer_block(self):
        assert load_gpt2_test(TransformerBlock, self.reference_gpt2.blocks[0], self.cache["resid_pre", 0])

    def test_unembedding(self):
        assert load_gpt2_test(Unembedding, self.reference_gpt2.unembed, self.cache["ln_final.hook_normalized"])

    def test_transformer(self):
        assert load_gpt2_test(Transformer, self.reference_gpt2, self.tokens)
