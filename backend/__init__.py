from flask import Flask
from pathlib import Path

import socket

socket.setdefaulttimeout(10)


def create_app(test_config=None):
    """
    An application factory for creating a Flask instance. Any configuration,
    registration and other setup the application needs will happen inside this
    function, then the application will be returned.

    Args:
        test_config (_type_, optional): test configuraiton. Defaults to None.
    """
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY="dev",
    )

    # some intialization steps
    # caching the last input request, this will be helpful for development process mostly
    app.last_input = {"text": "", "token_ids": [], "raw_tokens": []}
    app.is_model_loaded = False
    app.logits = None
    app.ckpts = None

    if test_config is None:
        # Load the instance config (if it exists), when not testing
        app.config.from_pyfile("config.py", silent=True)
    else:
        # Load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        Path(app.instance_path).mkdir(parents=True, exist_ok=True)
    except OSError:
        pass

    from . import model

    app.register_blueprint(model.bp)

    from . import ckpt

    app.register_blueprint(ckpt.bp)

    from . import embed

    app.register_blueprint(embed.bp)

    return app
