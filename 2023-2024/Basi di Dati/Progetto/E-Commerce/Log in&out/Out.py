from flask import Flask, session, redirect, url_for, render_template
from flask import render_template
from flask import request
from flask import redirect
from flask import url_for
from flask_login import *
import login_required
import InAcquirente
import InVenditore
import home

app = Flask(__name__)
@app.route('logout')
@login_required
def logout():
    #logout_user() funzione di python per logOut
    session.pop("username", None)
    return redirect(url_for('login'))