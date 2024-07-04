from flask import Flask
from flask import render_template
from flask import request
from flask import redirect
from flask import url_for

app = Flask(__name__)
@app.route('/login_required')
def login_required():
    if request.form['pass'] == password:
        user = load_user(request.form['user'])
        login_users('user')
        return redirect(url_for('private'))
    else:
        return redirect(url_for('home'))