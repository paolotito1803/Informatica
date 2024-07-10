from flask import Flask
from flask import render_template
from flask import request
from flask import redirect
from flask import url_for
from flask_login import *
import login_required
import home

app = Flask(__name__)
@app.route('logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))