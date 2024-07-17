from flask import Flask, session
from flask import render_template
from flask import request
from flask import redirect
from flask import url_for
from sqlalchemy import *
import login_required
from flask import request
from flask import redirect
from flask import url_for
import ConfigurazioneVenditore

app = Flask(__name__)
@app.get('/me')
def me():
    if 'username' in session:
        username = session['username']
        return render_template("Home Page acquirente.html", username=username)
    else:
       return redirect(url_for("login"))
@app.route('/login', methods=["GET", "POST"])
def loginVenditore():
    ConfigurazioneVenditore()
    if request.method == "POST":
         conn = engine.connected()
         query = select(users.c.pwd).where (users.c.email == request.form['user'])

         rs = conn.execute(query)
         password = rs.fetchone()
         conn.close()

         if (password is not None):
            login_required
         else:
             return redirect(url_for('home'))
    else:
        return redirect(url_for('home'))


