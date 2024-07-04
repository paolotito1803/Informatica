from flask import Flask
from flask import render_template
from flask import request
from flask import redirect
from flask import url_for

app = Flask(__name__)
@app.route('/')
def home(current_user=None):
    if current_user.is_authenticated:
        return redirect(url_for('private'))
    return render_template("base.html")
