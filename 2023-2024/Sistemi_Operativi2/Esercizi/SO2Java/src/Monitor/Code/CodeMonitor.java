package Monitor.Code;

/*
 * COMMENTO GENERALE:
 *
 * Illustrare la soluzione proposta spiegando accuratamente:
 *
 * - Come si è arrivati a scegliere le strutture dati utilizzate
 * per la sincronizzazione
 *
 * SCRIVERE QUI!
 *
 * - Come funziona, intuitivamente, la sincronizzazione
 *
 * SCRIVERE QUI!
 *
 * - Come sono state utilizzate le wait e le notify / notifyAll
 *
 * SCRIVERE QUI!
 *
 * Commentare, inoltre, accuratamente il codice delle funzioni.
 *
 * Una consegna è insufficiente se:
 *
 * - non funziona (anche se commentata accuratamente)
 * - i commenti sono assenti / scarsi / non accurati
 * - realizza la sincronizzazione in modo non chiaro o inutilmente complesso
 */

public class CodeMonitor {
    // Dichiarare qui le variabili del monitor


    // La persona è la prossima ad essere servita e attende che si liberi
    // lo sportello. Se la persona è sulla coda prioritaria (priority è
    // true) appena lo sportello si libera la persona può procedere. Se
    // la persona è sulla coda normale (priority è false) la persona
    // attende che non ci siano altre persone in coda prioritaria già
    // in attesa e che lo sportello si liberi. In altre parole, dà
    // la precedenza a persone in attesa in coda prioritaria.
    boolean occupato = false, attendere = false;
    synchronized void attendiSportello(boolean priority)
            throws InterruptedException {
        if (priority) {
            attendere = true; //chi non ha priorità deve attendere
           while(occupato){ //attendo quando è occupato perchè c'è qualcuno allo sportello prima di me
               wait();
           }
           attendere = false; //nessuno deve attendere quindi lascio posto a quelli senza priorità
        } else {
            while(occupato || attendere == true){ //aspetto quando c'è qualcuno o ho lo sportello occupato
                wait();
            }
        }
        occupato = true; //ho qualcuno che è andato allo sportello
    }

    // La persona ha raggiunto lo sportello, ha fruito del servizio e ora
    // lo libera
    public synchronized void liberaSportello() {
        occupato = false; //sportello libero
        notifyAll();
    }
}

