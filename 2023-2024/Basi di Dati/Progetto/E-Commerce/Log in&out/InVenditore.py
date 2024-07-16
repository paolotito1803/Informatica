from flask import Flask
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


