from flask import Flask
from flask import render_template
from flask import request
from flask import redirect
from flask import url_for

app = Flask(__name__)
@app.route('/')
def render_web_log():
    return render_template(reg = users)

@app.route('/user/<username>')
def profile(username):
        if username in users:
            return render_template('profile.html', user = username)
        else:
            return render_template('prifule.html')
users = ['venditore', 'acquirente']
@app.route('/login', methods=['GET', 'POST'])
def login():
    user = request.form("user")
    return redirect(url_for('profile', username = user))