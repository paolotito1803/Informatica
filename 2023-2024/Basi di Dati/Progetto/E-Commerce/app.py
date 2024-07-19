# Import delle librerie necessarie
from flask import Flask, render_template, request, redirect, url_for, session
import psycopg2
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'progettoDB'
# Configurazione del database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:postgres@localhost/E-commerce'
db = SQLAlchemy(app)


# Definizione dei modelli
class Utenti(db.Model):
    email = db.Column(db.String(80), primary_key=True)
    password = db.Column(db.String(120), nullable=False, unique=True)
    nome = db.Column(db.String(120), nullable=False)
    indirizzo = db.Column(db.String(120), nullable=False)
    is_venditore = db.Column(db.Boolean, nullable=False)


class Prodotti(db.Model):
    id_Prodotti = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(80), nullable=False)
    descrizione = db.Column(db.String(120), nullable=False)
    categoria = db.Column(db.String(120), nullable=False)
    prezzo = db.Column(db.Float, nullable=False)
    disponibilita = db.Column(db.Integer, nullable=False)
    marca = db.Column(db.String(120), nullable=False)
    modello = db.Column(db.String(120), nullable=False)


class Ordini(db.Model):
    id_Ordine = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), db.ForeignKey('utenti.email'), nullable=False)
    stato = db.Column(db.Boolean, nullable=False)
    data = db.Column(db.Date, nullable=False)
    totale = db.Column(db.Float, nullable=False)


class Carrelli(db.Model):
    email = db.Column(db.String(80), db.ForeignKey('utenti.email'), primary_key=True)
    id_Prodotti = db.Column(db.Integer, db.ForeignKey('prodotti.id_Prodotti'), primary_key=True)
    quantita = db.Column(db.Integer, nullable=False)
    #prezzo = db.Column(db.Float, nullable=False)


class Prodotti_Ordini(db.Model):
    id_Prodotti = db.Column(db.Integer, db.ForeignKey('prodotti.id_Prodotti'), primary_key=True)
    id_Ordini = db.Column(db.Integer, db.ForeignKey('ordini.id_Ordine'), primary_key=True)
    quantita = db.Column(db.Integer, nullable=False)
    prezzo = db.Column(db.Float, nullable=False)


class Vende(db.Model):
    email = db.Column(db.String(80), db.ForeignKey('utenti.email'), primary_key=True)
    id_Prodotti = db.Column(db.Integer, db.ForeignKey('prodotti.id_Prodotti'), primary_key=True)


# Funzioni per la gestione degli utenti
@app.route('/registrazione', methods=['GET', 'POST'])
def registrazione():
    if request.method == 'POST':
        new_password = request.form['password']
        if request.form.get('is_venditore') is not None:
            nuovo_utente = Utenti(email=request.form['email'], password=new_password, nome=request.form['nome'],
                                  indirizzo=request.form['indirizzo'], is_venditore=True)
        else:
            nuovo_utente = Utenti(email=request.form['email'], password=new_password, nome=request.form['nome'],
                                  indirizzo=request.form['indirizzo'], is_venditore=False)
        db.session.add(nuovo_utente)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('registrazione.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        utente = Utenti.query.filter_by(email=request.form['email']).first()
        if utente and utente.password == request.form['password']:
            session['email'] = utente.email
            session['is_venditore'] = utente.is_venditore
            if session['is_venditore'] is True:
                return redirect(url_for('dashboard_venditore'))
            else:
                return redirect(url_for('dashboard_acquirente'))
    return render_template('login.html')


# Funzioni per la gestione dei prodotti
@app.route('/aggiungi_prodotto', methods=['GET', 'POST'])
def aggiungi_prodotto():
    if request.method == 'POST':
        nuovo_prodotto = Prodotti(nome=request.form['nome'], descrizione=request.form['descrizione'],
                                  categoria=request.form['categoria'], prezzo=request.form['prezzo'],
                                  disponibilita=request.form['disponibilita'])
        db.session.add(nuovo_prodotto)
        db.session.commit()
        return redirect(url_for('dashboard_venditore'))
    return render_template('aggiungi_prodotto.html')


# Funzioni per la gestione degli ordini
@app.route('/crea_ordine', methods=['GET', 'POST'])
def crea_ordine():
    if request.method == 'POST':
        nuovo_ordine = Ordini(email=request.form['email'], stato=request.form['stato'], data=request.form['data'],
                              totale=request.form['totale'])
        db.session.add(nuovo_ordine)
        db.session.commit()
        return redirect(url_for('dashboard_acquirente'))
    return render_template('crea_ordine.html')


@app.route('/rimuovi_prodotto/<int:id>', methods=['POST'])
def rimuovi_prodotto(id):
    if 'email' not in session or not session['is_venditore']:
        return redirect(url_for('login'))
    prodotto = Prodotti.query.get(id)
    if prodotto:
        db.session.delete(prodotto)
        db.session.commit()
    return redirect(url_for('dashboard_venditore'))


# Funzioni per la gestione del carrello
@app.route('/aggiungi_al_carrello/<int:id_Prodotti>', methods=['POST'])
def aggiungi_al_carrello(id_Prodotti):
    if 'email' not in session or session['is_venditore']:
        return redirect(url_for('login'))
    prodotto = Prodotti.query.get(id_Prodotti)
    if prodotto and prodotto.disponibilita > 0:
        carrello = Carrelli.query.get((session['email'], id_Prodotti))
        if carrello:
            carrello.quantita += 1
        else:
            carrello = Carrelli(email=session['email'], id_Prodotti=id_Prodotti, quantita=1)
            db.session.add(carrello)
        prodotto.disponibilita -= 1
        db.session.commit()
        return redirect(url_for('dashboard_acquirente'))
    return redirect(url_for('dashboard_acquirente'))


@app.route('/rimuovi_dal_carrello/<int:id_Prodotti>', methods=['POST'])
def rimuovi_dal_carrello(id_Prodotti):
    if 'email' not in session or session['is_venditore']:
        return redirect(url_for('login'))
    carrello = Carrelli.query.get((session['email'], id_Prodotti))
    if carrello:
        prodotto = Prodotti.query.get(id_Prodotti)
        carrello.quantita -= 1
        if carrello.quantita == 0:
            db.session.delete(carrello)
        prodotto.disponibilita += 1
        db.session.commit()
    return redirect(url_for('dashboard_acquirente'))


@app.route("/carrello")
def visualizzaCarrello():
    if 'email' not in session:
        return redirect(url_for('login'))
    carrello = db.session.query(Carrelli, Prodotti).join(Prodotti, Carrelli.id_Prodotti == Prodotti.id_Prodotti).filter(
        Carrelli.email == session['email'].all())
    return render_template("carrello.html", carrello=carrello)


# Funzioni per la visualizzazione dei prodotti e la ricerca
@app.route('/prodotti')
def visualizza_prodotti():
    prodotti = Prodotti.query.all()
    return render_template('prodotti.html', prodotti=prodotti)


@app.route('/ricerca', methods=['GET', 'POST'])
def ricerca():
    if request.method == 'POST':
        parole_chiave = request.form['parole_chiave']
        prodotti = Prodotti.query.filter(
            Prodotti.nome.contains(parole_chiave) | Prodotti.descrizione.contains(parole_chiave)).all()
        return render_template('ricerca.html', prodotti=prodotti)
    return render_template('ricerca.html')


@app.route('/profilo', methods=['GET', 'POST'])
def profilo():
    if 'email' not in session:
        return redirect(url_for('login'))
    utente = Utenti.query.get(session['email'])
    if request.method == 'POST':
        utente.nome = request.form['nome']
        utente.indirizzo = request.form['indirizzo']
        db.session.commit()
        return redirect(url_for('dashboard'))
    return render_template('profilo.html', utente=utente)


# Funzioni per la visualizzazione e l'aggiornamento dello stato degli ordini
@app.route('/ordini', methods=['GET'])
def visualizza_ordini():
    if 'email' not in session:
        return redirect(url_for('login'))
    ordini = Ordini.query.filter_by(email=session['email']).all()
    return render_template('ordini.html', ordini=ordini)


@app.route('/aggiorna_stato_ordine/<int:id>', methods=['POST'])
def aggiorna_stato_ordine(id):
    if 'email' not in session or not session['is_venditore']:
        return redirect(url_for('login'))
    ordine = Ordini.query.get(id)
    if ordine:
        ordine.stato = request.form['stato']
        db.session.commit()
    return redirect(url_for('dashboard_acquirente'))


@app.route('/dashboard_acquirente')
def dashboard_acquirente():
    if 'email' not in session:
        return redirect(url_for('login'))
    utente = Utenti.query.get(session['email'])
    prodotti = Prodotti.query.all()
    return render_template('dashboard_acquirente.html', utente=utente, prodotti=prodotti)


@app.route('/dashboard_venditore')
def dashboard_venditore():
    if 'email' not in session:
        return redirect(url_for('login'))
    utente = Utenti.query.get(session['email'])
    prodotti = Prodotti.query.all()
    return render_template('dashboard_venditore.html', utente=utente, prodotti=prodotti)


@app.route('/logout')
def logout():
    if 'email' in session:
        session.pop('email', None)
        session.pop('is_venditore', None)
    return redirect(url_for('login'))


@app.route('/home')
def home():
    return render_template("home.html")


@app.route('/')
def index():
    return redirect(url_for('home'))


if __name__ == '__main__':
    app.run(debug=True)

