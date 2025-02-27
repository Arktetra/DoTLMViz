from flask import Blueprint, current_app, request, jsonify

from . import utils

bp = Blueprint("embed", __name__, url_prefix="/embed")


@bp.route("/reduced", methods=["POST"])
def get_reduced_embed():
    """
    Get dimensionally reduced embeddings.
    """
    try:
        embed_name = request.json["embed_name"]
        method = request.json["method"]

        assert embed_name in ["embed", "pos_embed"], f"Unknown embedding name '{embed_name}'."

        assert method in ["PCA", "t-SNE"], f"Unknown method name '{method}'."

        embeddings = current_app.ckpts.get(embed_name, None, None)

        if method == "PCA":
            return utils.perform_pca(embeddings)
        elif method == "t-SNE":
            perplexity = request.json["perplexity"]
            return utils.perform_tsne(embeddings, perplexity)

    except Exception as e:
        print("Error: ", str(e))
        return jsonify({"Error": str(e)}), 500
