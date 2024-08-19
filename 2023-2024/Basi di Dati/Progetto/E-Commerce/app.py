# Import delle librerie necessarie
from datetime import datetime
from flask import render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from models import *



# Consente ai nuovi utenti di registrarsi inserendo gli opportuni dati richiesti
@app.route('/registrazione', methods=['GET', 'POST'])
def registrazione():
    if request.method == 'POST':
        new_password = request.form['password']
        if request.form.get('is_venditore') is not None:
            nuovo_utente = Utenti(email=request.form['email'], password=new_password, nome=request.form['nome'],
                                  indirizzo=request.form['indirizzo'], is_venditore=True)  # caso venditore
        else:
            nuovo_utente = Utenti(email=request.form['email'], password=new_password, nome=request.form['nome'],
                                  indirizzo=request.form['indirizzo'], is_venditore=False)  # caso acquirente
        db.session.add(nuovo_utente)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('registrazione.html')


# Consente agli utenti di accedere alla propria dashboard qualora siano già registrati
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


# Se si è venditore si ha accesso a questa funzionalità.
# L'aggiunta dei prodotti avviene inserendo determinati dati negli appositi spazi
@app.route('/aggiungi_prodotto', methods=['GET', 'POST'])
def aggiungi_prodotto():
    if request.method == 'POST':
        url_immagine = request.form['url_immagine']
        nuovo_prodotto = Prodotti(nome=request.form['nome'], descrizione=request.form['descrizione'],
                                  categoria=request.form['categoria'], prezzo=request.form['prezzo'],
                                  disponibilita=request.form['disponibilita'], marca=request.form['marca'],
                                  modello=request.form['modello'], immagine=url_immagine)
        db.session.add(nuovo_prodotto)
        db.session.commit()
        vende = Vende(email=session['email'], id_Prodotti=nuovo_prodotto.id_Prodotti)
        db.session.add(vende)
        db.session.commit()
        return redirect(url_for('dashboard_venditore'))
    return render_template('aggiungi_prodotto.html')


# In possesso del venditore viene passato l'id del prodotto, in modo da facilitarne l'eliminazione
@app.route('/rimuovi_prodotto/<int:id>', methods=['POST'])
def rimuovi_prodotto(id):
    if 'email' not in session or not session['is_venditore']:
        return redirect(url_for('login'))
    prodotto = Prodotti.query.get(id)
    if prodotto:
        venduto = Vende.query.filter_by(id_Prodotti=id, email=session['email']).all()
        for v in venduto:
            db.session.delete(v)
        db.session.commit()
        db.session.delete(prodotto)
        db.session.commit()
    return redirect(url_for('dashboard_venditore'))


# In possesso del venditore viene passato l'id del prodotto, in modo da facilitarne la modifica della disponibilità
@app.route('/aggiorna_prodotti/<int:id>', methods=['GET', 'POST'])
def aggiorna_prodotto(id):
    if 'email' not in session or not session['is_venditore']:
        return redirect(url_for('login'))
    prodotto = Prodotti.query.get(id)
    if request.method == 'POST':
        nuova_disp = request.form.get('nuova_disponibilita')
        nuovo_prezzo = request.form.get('nuovo_prezzo')
        if nuova_disp is not None and nuova_disp != '':
            if int(nuova_disp) >= 0:
                prodotto.disponibilita = int(nuova_disp)

        if nuovo_prezzo is not None and nuovo_prezzo != '':
            if float(nuovo_prezzo) >= 0:
                prodotto.prezzo = float(nuovo_prezzo)

        db.session.commit()
        return redirect(url_for('dashboard_venditore'))
    return render_template('aggiorna_disponibilita.html', prodotto=prodotto)


# Viene utilizzata quando viene fatto il pagamento e di conseguenza i dati vengono aggiunti alla tabella ordini e
# prodotti_ordini, mentre vengono rimossi dal carrello
@app.route('/crea_ordine', methods=['GET', 'POST'])
def crea_ordine():
    if request.method == 'POST':
        carrello = (db.session.query(Prodotti.id_Prodotti, Carrelli.quantita, Prodotti.prezzo).join(Prodotti,
                                                                                                    Carrelli.id_Prodotti == Prodotti.id_Prodotti)
                    .filter(Carrelli.email == session['email']).all())
        totale = sum(item.quantita * item.prezzo for item in carrello)  # calcolo il totale dell'ordine

        nuovo_ordine = Ordini(email=session['email'], stato=True, data=datetime.now(), totale=totale)  # creo l'ordine
        db.session.add(nuovo_ordine)  # lo aggiungo alla tabella nel db
        db.session.commit()  # eseguo il commit()

        for item in carrello:
            prodOrdinati = ProdottiOrdini(id_Ordini=nuovo_ordine.id_Ordine, id_Prodotti=item.id_Prodotti,
                                          quantita=item.quantita, prezzo=item.prezzo)
            db.session.add(prodOrdinati)
        db.session.commit()

        elimina_elementi = db.session.query(Carrelli).filter(session['email'] == Carrelli.email).all()
        for item in elimina_elementi:  # elimino tutto ciò che è presente nel carrello con la mail di cui ho fatto il login
            db.session.delete(item)
        db.session.commit()
        return redirect(url_for('dashboard_acquirente'))
    return render_template('crea_ordine.html')


# Permette all'acquirente di visualizzare i prodotti che sta per acquistare con la possibilità di rimuovere i prodotti.
@app.route('/carrello')
def visualizzaCarrello():
    if 'email' not in session:
        return redirect(url_for('login'))
    carrello = (
        db.session.query(Prodotti.id_Prodotti, Carrelli.quantita, Prodotti.nome, Prodotti.descrizione, Prodotti.prezzo)
        .join(Prodotti, Carrelli.id_Prodotti == Prodotti.id_Prodotti).filter(
            Carrelli.email == session['email']).all())
    totale = sum(item.quantita * item.prezzo for item in carrello)
    return render_template("carrello.html", carrello=carrello, totale=totale)


# Dalla dashboard premendo sul pulsante apposito aggiunge ai prodotti da acquistare quello selezionato
@app.route('/aggiungi_al_carrello/<int:id_Prodotti>', methods=['POST'])
def aggiungi_al_carrello(id_Prodotti):
    if 'email' not in session or session['is_venditore']:
        return redirect(url_for('login'))
    prodotto = Prodotti.query.get(id_Prodotti)
    quantita = int(request.form.get('quantita', 1))
    if prodotto and prodotto.disponibilita > quantita:
        carrello = Carrelli.query.get((session['email'], id_Prodotti))
        if carrello:
            carrello.quantita += quantita  #incrementa la quantità di questo prodotto nel carrello
        else:
            carrello = Carrelli(email=session['email'], id_Prodotti=id_Prodotti, quantita=quantita)
            db.session.add(carrello)
        prodotto.disponibilita -= quantita  # diminuisce la disponibilità di quest'ultimo
        db.session.commit()
        return redirect(url_for('dashboard_acquirente'))
    return redirect(url_for('dashboard_acquirente'))


# elimina il prodotto dal carrello in modo che non venga acquistato nuovamente
@app.route('/rimuovi_dal_carrello/<int:id_Prodotti>', methods=['POST'])
def rimuovi_dal_carrello(id_Prodotti):
    if 'email' not in session or session['is_venditore']:
        return redirect(url_for('login'))
    carrello = Carrelli.query.get((session['email'], id_Prodotti))
    if carrello:
        prodotto = Prodotti.query.get(id_Prodotti)
        carrello.quantita -= 1  # diminuisce la quantità di quel prodotto nel carrello
        if carrello.quantita == 0:
            db.session.delete(carrello)
        prodotto.disponibilita += 1  # aumenta la sua disponibilità
        db.session.commit()
    return redirect(url_for('dashboard_acquirente'))


# Mostra tutti i prodotti presenti nel database
@app.route('/prodotti')
def visualizza_prodotti():
    prodotti = Prodotti.query.all()
    return render_template('prodotti.html', prodotti=prodotti)


# Permette di trovare i prodotti in modo più efficiente, attraverso l'uso di parole chiavi
@app.route('/ricerca', methods=['GET', 'POST'])
def ricerca():
    if 'email' not in session:
        return redirect(url_for('login'))
    utente = Utenti.query.get(session['email'])
    if request.method == 'POST':
        parole_chiave = request.form['parole_chiave']
        prodotti = Prodotti.query.filter(
            Prodotti.nome.contains(parole_chiave) | Prodotti.descrizione.contains(parole_chiave)
            | Prodotti.modello.contains(parole_chiave)).all()
        return render_template('dashboard_acquirente.html', utente=utente, prodotti=prodotti)
    return render_template('dashboard_acquirente.html')


# Sono presente tutti i dati della persona attualmente collegata alla piattaforma
@app.route('/profilo', methods=['GET', 'POST'])
def profilo():
    if 'email' not in session:
        return redirect(url_for('login'))
    utente = Utenti.query.get(session['email'])
    if request.method == 'POST':
        utente.email = request.form['email']
        utente.password = request.form['password']
        utente.nome = request.form['nome']
        utente.indirizzo = request.form['indirizzo']
        db.session.commit()
        if session['is_venditore']:
            return redirect(url_for('dashboard_venditore'))
        else:
            return redirect(url_for('dashboard_acquirente'))
    return render_template('profilo.html', utente=utente)


# Permette all'acquirente di vedere il suo storico degli ordini
@app.route('/ordini', methods=['GET'])
def visualizza_ordini():
    if 'email' not in session:
        return redirect(url_for('login'))
    ordini = db.session.query(Ordini, ProdottiOrdini, Prodotti).join(ProdottiOrdini,
                                                                     Ordini.id_Ordine == ProdottiOrdini.id_Ordini).join(
        Prodotti,
        ProdottiOrdini.id_Prodotti == Prodotti.id_Prodotti).filter(Ordini.email == session['email']).all()
    return render_template('ordini.html', ordini=ordini, utente=Utenti.query.get(session['email']))


# Permette di visualizzare a che punto è l'ordine ovvero se è stato consegnato o meno
@app.route('/aggiorna_stato_ordine/<int:id>', methods=['POST'])
def aggiorna_stato_ordine(id):
    if 'email' not in session or not session['is_venditore']:
        return redirect(url_for('login'))
    ordine = Ordini.query.get(id)
    if ordine:
        ordine.stato = request.form['stato'] == 'True'
        db.session.commit()
    return redirect(url_for('dashboard_venditore'))

#consente di vedere tutti gli ordini che ha ricevuto il venditore e in caso modificarne lo stato
@app.route('/visualizza_ordini_venditore')
def visualizza_ordini_venditore():
    if 'email' not in session or not session['is_venditore']:
        return redirect(url_for('login'))
    ordini = db.session.query(Ordini, ProdottiOrdini, Prodotti).join(ProdottiOrdini, Ordini.id_Ordine == ProdottiOrdini.id_Ordini).join(
        Prodotti, ProdottiOrdini.id_Prodotti == Prodotti.id_Prodotti).join(Vende, Prodotti.id_Prodotti == Vende.id_Prodotti).filter(
        Vende.email == session['email']).all()
    return render_template('ordini.html', ordini=ordini, utente = Utenti.query.get(session['email']))


# Homepage dell'acquirente dove vede i prodotti e può visualizzare tutto
@app.route('/dashboard_acquirente')
def dashboard_acquirente():
    if 'email' not in session:
        return redirect(url_for('login'))
    utente = Utenti.query.get(session['email'])
    prodotti = Prodotti.query.all()
    return render_template('dashboard_acquirente.html', utente=utente, prodotti=prodotti)


# Homepage del venditore dove vede i prodotti e dove può modificarli
@app.route('/dashboard_venditore')
def dashboard_venditore():
    if 'email' not in session:
        return redirect(url_for('login'))
    utente = Utenti.query.get(session['email'])
    prodotti = (db.session.query(Prodotti).join(Vende, Prodotti.id_Prodotti == Vende.id_Prodotti)
                .filter(Vende.email == session['email']).all())
    return render_template('dashboard_venditore.html', utente=utente, prodotti=prodotti)


#Effettua il logout
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
