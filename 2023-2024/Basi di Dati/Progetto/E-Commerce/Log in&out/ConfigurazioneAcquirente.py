from flask import Flask
from flask_login import *

app = Flask(__name__)
app.config['SECRET_KEY'] = 'acquirente'
login_manager = LoginManager()
login_manager.init_app(app)