"""
Basic password gate.
"""

from flask import Blueprint, current_app, make_response, redirect, render_template, request

bp = Blueprint("auth", __name__, url_prefix="/auth")


@bp.route("/", methods=["GET"])
def login():
    """Render login form."""
    next_url = request.args.get("next", "/")
    return render_template("auth/login.html", error=None, next_url=next_url)


@bp.route("/", methods=["POST"])
def submit():
    """Handle password submission."""
    password = request.form.get("password", "")
    next_url = request.form.get("next", "/")

    if password != current_app.config.get("BASIC_PASSWORD"):
        return render_template(
            "auth/login.html",
            error="Incorrect password.",
            next_url=next_url,
        )

    response = make_response(redirect(next_url))
    # Remember this device long-term.
    response.set_cookie(
        "lute_auth",
        "1",
        max_age=60 * 60 * 24 * 365 * 10,
        httponly=True,
        samesite="Lax",
    )
    return response
