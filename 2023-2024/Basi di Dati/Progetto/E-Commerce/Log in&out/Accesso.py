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
import ConfigurazioneAcquirente
import ConfigurazioneVenditore
from flask_login import *


#app = Flask(__name__)
#app.config['SECRET_KEY'] = 'chiave'
#login_manager = LoginManager()
#login_manager.init_app(app)
#@app.get("/me")
#def me():
 #   if 'username' in session:
  #      username = session['username']
  #      return render_template("Home Page acquirente.html", username=username)
   # else:
   #    return redirect(url_for("login"))
#@app.route("/loginAcquirente", methods=['GET', 'POST'])
#def loginAcquirente():
    #ConfigurazioneAcquirente()
 #   if request.method == "POST":
 #       conn = engine.connected()
 #       query = select(users.c.pwd).where(users.c.email == request.form['user'])

 #       rs = conn.execute(query)
 #       password = rs.fetchone()
 #       conn.close()

 #       if (password is not None):
 #           login_required
 #       else:
 #           return redirect(url_for('home'))
 #   else:
#       return redirect(url_for('home'))
#
# @app.route("/loginVenditore", methods=['GET', 'POST'])
# def loginVenditore():
#     #ConfigurazioneVenditore()
#     if request.method == "POST":
#         conn = engine.connected()
#         query = select(users.c.pwd).where(users.c.email == request.form['user'])
#
#         rs = conn.execute(query)
#         password = rs.fetchone()
#         conn.close()
#
#         if (password is not None):
#             login_required
#         else:
#             return redirect(url_for('home'))
#     else:
#         return redirect(url_for('home'))
#
# @app.post("/logout")
# def logout():
#     session.pop('username', None)
#     redirect(url_for('log'))
#


app = Flask(__name__)
app.config['SECRET_KEY'] = 'progettoBD'  # Sostituisci con la tua chiave segreta
login_manager = LoginManager()
login_manager.init_app(app)
#fare connessione a database postgresql
class User(UserMixin, db.Model):
    email = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=True, nullable=False)
    indirizzo = db.Column(db.String(80), unique=True, nullable=False)
    ruolo = db.Column(db.Boolean, unique=False, nullable=False)
    def __init__(self, nome, indirizzo, email, password, ruolo):
        self.nome = nome
        self.indirizzo = indirizzo
        self.email = email
        self.password = password
        self.ruolo = ruolo

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def __init__(self, name, quantity, id):
        self.name = name
        self.quantity = quantity
        self.id = id
@app.route('/')
def home():
    if 'user_type' in session:
        return f"Benvenuto, {session['user_type']}!"
    return render_template('Log-In.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_type = request.form['user_type']
        session['user_type'] = user_type
        if user_type == 'venditore':
            return redirect(url_for('login_venditore'))
        elif user_type == 'acquirente':
            return redirect(url_for('login_acquirente'))
    return render_template('Log-In.html')

@login_manager.user_loader
def load_user(email):
    conn = engine.connect()
    query = select(users).where(users.c.email == user_id)
    rs = conn.execute(query)
    user = rs.fetchone()
    conn.close()
    return User(user.email, user.pwd)


@app.route('/login_venditore', methods=['GET', 'POST'])
def login_venditore():
    if request.method == 'POST':
        conn = engine.connected()
        query = select(users.c.pwd).where(users.c.email == request.form['user'])

        rs = conn.execute(query)
        password = rs.fetchone()
        conn.close()

        if (password is not None):
            if request.form['pass'] == password:
                user = load_user(request.form['user'])
                login_user('user')
                return redirect(url_for('private'))
            else:
                return redirect(url_for('home'))
        else:
            return redirect(url_for('home'))
    else:
        return render_template('Log-in venditori.html')

@app.route('/login_acquirente', methods=['GET', 'POST'])
def login_acquirente():
    if request.method == 'POST':
        conn = engine.connected()
        query = select(users.c.pwd).where(users.c.email == request.form['user'])

        rs = conn.execute(query)
        password = rs.fetchone()
        conn.close()

        if (password is not None):
            if request.form['pass'] == password:
                user = load_user(request.form['user'])
                login_user('user')
                return redirect(url_for('private'))
            else:
                return redirect(url_for('home'))
        else:
            return redirect(url_for('home'))
    else:
        return render_template('Log-in acquirenti.html')


@app.route('/add_product', methods=['POST'])
def add_product():
    name = request.form['name']
    quantity = request.form['quantity']
    product = Product(name=name, quantity=quantity)
    db.session.add(product)
    db.session.commit()
    return redirect(url_for('dashboard'))

@app.route('/remove_product/<int:id>', methods=['POST'])
def remove_product(id):
    product = Product.query.get(id)
    db.session.delete(product)
    db.session.commit()
    return redirect(url_for('dashboard'))

# @app.route('/dashboard')
# def dashboard():
#     products = Product.query.all()
#     return render_template('dashboard.html', products=products)

@app.route('/dashboard_venditore', methods=['GET', 'POST'])
def dashboard_venditore():
    if request.method == 'POST':
        if 'add' in request.form:
            name = request.form['name']
            quantity = request.form['quantity']
            product = Product(name=name, quantity=quantity)
            db.session.add(product)
            db.session.commit()
        elif 'remove' in request.form:
            id = request.form['id']
            product = Product.query.get(id)
            db.session.delete(product)
            db.session.commit()
    products = Product.query.all()
    return render_template('dashboard_venditore.html', products=products)

@app.route('/dashboard_acquirente', methods=['GET', 'POST'])
def dashboard_acquirente():
    if request.method == 'POST':
        id = request.form['id']
        product = Product.query.get(id)
        if product.quantity > 0:
            product.quantity -= 1
            db.session.commit()
    products = Product.query.all()
    return render_template('dashboard_acquirente.html', products=products)

@app.route('/logout')
def logout():
    session.pop('user_type', None)
    return 'Sei stato disconnesso!'

@app.route('/registrazione', methods=['GET', 'POST'])
def registrazione():
    if request.method == 'POST':
        nome = request.form['nome']
        email = request.form['email']
        password = request.form['pass']
        indirizzo = request.form['indirizzo']
        ruolo = request.form['ruolo']

        user = User(nome, indirizzo, email, password, ruolo)
        db.session.add(user)
        db.session.commit()
    return redirect(url_for('login'))