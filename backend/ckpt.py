from flask import Blueprint, current_app, request, jsonify

from DoTLMViz import KernelDensityEstimator

bp = Blueprint("ckpt", __name__, url_prefix="/ckpt")


def get_ckpt_act(request):
    """
    A utility function for getting the activation from the checkpoint.
    """
    act_name = request.json["act_name"]
    layer_name = request.json["layer_name"]
    block = request.json["block"]

    return current_app.ckpts.get(act_name, layer_name, block)


@bp.route("/act", methods=["POST"])
def get_act():
    """
    Get the checkpointed activation using the activation name, layer name
    and block number in the POST request.
    """
    try:
        if request.method == "POST":
            act_name = request.json["act_name"]
            layer_name = request.json["layer_name"]
            block = request.json["block"]

            act = current_app.ckpts.get(act_name, layer_name, block)

            return act.squeeze().tolist()
    except Exception as e:
        print("Error: ", str(e))
        return jsonify({"Error": str(e)}), 500


@bp.route("/mlp_outs", methods=["POST"])
def get_mlp_outs():
    """
    Returns a neuron's output for each input using the activation name,
    layer name, block number, and neuron number in the POST request.
    """
    try:
        if request.method == "POST":
            act_name = request.json["act_name"]
            layer_name = request.json["layer_name"]
            block = request.json["block"]
            neuron = request.json["neuron"]

            act = current_app.ckpts.get(act_name, layer_name, block)

            return act.squeeze().T[neuron].tolist()
    except Exception as e:
        print("Error: ", str(e))
        return jsonify({"Error": str(e)}), 500


@bp.route("/prob_density", methods=["POST"])
def get_kde():
    """
    Returns the estimated probability density for the activation specified
    by the activation name, layer name, block number, and neuron number
    in the POST request.
    """
    try:
        if request.method == "POST":
            act = get_ckpt_act(request).detach().cpu()
            kde = KernelDensityEstimator()
            return kde.estimate(act, start=-5, end=5, steps=500)
    except Exception as e:
        print("Error: ", str(e))
        return jsonify({"Error": str(e)}), 500
