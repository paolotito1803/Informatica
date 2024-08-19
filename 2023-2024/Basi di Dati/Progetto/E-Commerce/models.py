from flask_sqlalchemy import SQLAlchemy
from config import app

db = SQLAlchemy(app)


# Definizione dei modelli con riferimento alle tabelle presenti nel database
class Utenti(db.Model):
    __table_name__ = 'utenti'
    email = db.Column(db.String(80), primary_key=True)
    password = db.Column(db.String(120), nullable=False, unique=True)
    nome = db.Column(db.String(120), nullable=False)
    indirizzo = db.Column(db.String(120), nullable=False)
    is_venditore = db.Column(db.Boolean, nullable=False)


class Ordini(db.Model):
    __table_name__ = 'ordini'
    id_Ordine = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), db.ForeignKey('utenti.email'), nullable=False)
    stato = db.Column(db.Boolean, nullable=False)
    data = db.Column(db.Date, nullable=False)
    totale = db.Column(db.Float, nullable=False)


class Prodotti(db.Model):
    __table_name__ = 'prodotti'
    id_Prodotti = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(80), nullable=False)
    descrizione = db.Column(db.String(120), nullable=False)
    categoria = db.Column(db.String(120), nullable=False)
    prezzo = db.Column(db.Float, nullable=False)
    disponibilita = db.Column(db.Integer, nullable=False)
    marca = db.Column(db.String(120), nullable=False)
    modello = db.Column(db.String(120), nullable=False)
    immagine = db.Column(db.String(120))


class Carrelli(db.Model):
    __table_name__ = 'carrelli'
    email = db.Column(db.String(80), db.ForeignKey('utenti.email'), primary_key=True)
    id_Prodotti = db.Column(db.Integer, db.ForeignKey('prodotti.id_Prodotti'), primary_key=True)
    quantita = db.Column(db.Integer, nullable=False)


class Vende(db.Model):
    __table_name__ = 'vende'
    email = db.Column(db.String(80), db.ForeignKey('utenti.email'), primary_key=True)
    id_Prodotti = db.Column(db.Integer, db.ForeignKey('prodotti.id_Prodotti'), primary_key=True)


class ProdottiOrdini(db.Model):
    __table_name__ = 'prodotti_ordini'
    id_Prodotti = db.Column(db.Integer, db.ForeignKey('prodotti.id_Prodotti'), primary_key=True)
    id_Ordini = db.Column(db.Integer, db.ForeignKey('ordini.id_Ordine'), primary_key=True)
    quantita = db.Column(db.Integer, nullable=False)
    prezzo = db.Column(db.Float, nullable=False)

