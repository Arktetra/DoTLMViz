from flask import current_app
from sklearn.manifold import TSNE
from transformers import GPT2Tokenizer
from DoTLMViz import CkptedTransformer
from DoTLMViz.decomposition import PCA

import torch


def load_model():
    """
    An utility function for loading the models. The model to be loaded by the model_name
    in the current_app instance.
    """
    if current_app.model_name == "gpt2-small" and not current_app.is_model_loaded:
        current_app.tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
        current_app.model = CkptedTransformer.from_pretrained("gpt2-small")
        current_app.device = (
            "cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"
        )
        print(f"{current_app.model_name} model loaded successfully!!!")
    elif current_app.is_model_loaded:
        print(f"{current_app.model_name} model already loaded")

    current_app.is_model_loaded = True


def tokenize_and_saveable(text) -> bool:
    """
    - helper function to tokenize and the save the last input text in current app
    - if tokenization is required then will return true else, for cached input return false
    """
    if current_app.last_input["text"] == text:
        print("using last input cache")
        return False
    else:
        token_ids = current_app.tokenizer(text, return_tensors="pt")["input_ids"]
        raw_tokens = current_app.tokenizer.convert_ids_to_tokens(token_ids.squeeze())
        current_app.last_input = {"text": text, "token_ids": token_ids, "raw_tokens": raw_tokens}
        return True


# this is temporary helper function to load model if not
def if_not_load(n):
    current_app.model_name = n
    load_model()


def perform_pca(data: torch.Tensor):
    """
    A utility function for performing PCA on the data.
    """
    pca = PCA(n_components=2)
    pca.fit(data.squeeze())
    return pca(data).squeeze().tolist()


def perform_tsne(data: torch.Tensor, perplexity: float = 5.0):
    """
    A utility function for performing t-SNE on the data.
    """
    model = TSNE(n_components=2, perplexity=perplexity, random_state=41)
    return model.fit_transform(data.squeeze().cpu().detach()).tolist()
