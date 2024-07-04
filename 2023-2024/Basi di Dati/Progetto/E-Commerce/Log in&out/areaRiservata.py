from flask import Flask
from flask import render_template
from flask import request
from flask import redirect
from flask import url_for
import login_required

app = Flask(__name__)
@app.route('/private')
@login_required
def private():
    conn = engine.connect()
    query = select(users)
    all_users = conn.execute(query)
    resp = make_response(render_template(" private . html ",
                                         users=all_users))
    conn.close()
    return resp