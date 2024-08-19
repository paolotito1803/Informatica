from flask import Flask

app = Flask(__name__)
app.config['SECRET_KEY'] = 'progettoDB'
# Configurazione del database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:postgres@localhost/E-commerce'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

