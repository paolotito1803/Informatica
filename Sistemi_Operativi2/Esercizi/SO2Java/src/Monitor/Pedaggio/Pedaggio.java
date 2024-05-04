package Monitor.Pedaggio;

/*public class Pedaggio {

    private int X, Y;   // dimensioni della strada
    private int NTOLLS; // numero di caselli

    private boolean vialibera[];
    private boolean posizioni[][];
    private int pagamenti[];

    public Pedaggio(int x, int y, int ntolls) {
        this.X = x;
        this.Y = y;
        this.NTOLLS = ntolls;

        vialibera = new boolean[NTOLLS];
        posizioni = new boolean[X][Y];
        pagamenti = new int[NTOLLS];
    }

    // si muove da x,y a nx,ny. Se nx,ny è occupato attende altrimenti
    // occupa nx,ny e libera x,y.
    public synchronized void move(int x, int y, int nx, int ny) throws InterruptedException {
        while(posizioni[nx][ny]) {
            wait();
        }
        posizioni[nx][ny] = true; //occupo il posto
        libera(x, y); //libero il posto
    }

    // libera la posizione x,y sulla strada (invocata quando l'auto esce definitivamente)
    public synchronized void libera(int x, int y) {
        posizioni[x][y] = false; //libero la posizione
        notifyAll();
    }

    // paga a idCasello un valore parziale che si accumula ai pagamenti precedenti
    // corrisponde a inserire una moneta o banconota nella macchinetta.
    // Viene invocato tante volte, fino a raggiungimento della cifra corretta
    public synchronized void paga(int idCasello, int parziale) {
        pagamenti[idCasello] += parziale;
    }

    // idCasello attende che il pagamento del totale sia avvenuto. Accumula i vari
    // pagamenti parziali e esce solamente quando il totale è stato raggiunto.
    // Viene invocato una volta sola e esce solo quando il totale è stato raggiunto
    // Quando il pagamento è effettuato da' il via libera all'auto.
    public synchronized void incassa(int idCasello, int totale) throws InterruptedException {
        while(pagamenti[idCasello] < totale) {
            wait();
        }
        pagamenti[idCasello] = 0;

        vialibera[idCasello] = true; //si alza la sbarra ma la macchina è ancora al  casello
        notifyAll();; //notifico che lo sportello è libero
    }

    // Attende l'OK dell'avenuto pagamento prima di superare il casello.
    // Quando ha il via libera procede.
    public synchronized void attendiOK(int idCasello) throws InterruptedException {
        while(!vialibera[idCasello]) {
            wait();
        }

        vialibera[idCasello] = false; //libero il casello

    }
}*/

public class Pedaggio {

    private int X, Y;   // dimensioni della strada
    private int NTOLLS; // numero di caselli
    private boolean[][] strada; // posizioni sulla strada
    private int[] caselli; // stato dei caselli

    public Pedaggio(int x, int y, int ntolls) {
        this.X = x;
        this.Y = y;
        this.NTOLLS = ntolls;
        this.strada = new boolean[x][y];
        this.caselli = new int[ntolls];
    }

    public synchronized void move(int x, int y, int nx, int ny) throws InterruptedException {
        while (strada[nx][ny]) { // se la posizione è occupata, aspetta
            wait();
        }
        strada[x][y] = false; // libera la posizione corrente
        strada[nx][ny] = true; // occupa la nuova posizione
        notifyAll(); // notifica gli altri thread in attesa
    }

    public synchronized void libera(int x, int y) {
        strada[x][y] = false; // libera la posizione
        notifyAll(); // notifica gli altri thread in attesa
    }

    public synchronized void paga(int idCasello, int parziale) {
        caselli[idCasello] += parziale; // accumula il pagamento parziale
        //notifyAll(); // notifica gli altri thread in attesa
    }

    public synchronized void incassa(int idCasello, int totale) throws InterruptedException {
        while (caselli[idCasello] < totale) { // se il pagamento non è completo, aspetta
            wait();
        }
        caselli[idCasello] -= totale; // riduce il pagamento
        notifyAll(); // notifica gli altri thread in attesa
    }

    public synchronized void attendiOK(int idCasello) throws InterruptedException {
        while (caselli[idCasello] > 0) { // se il pagamento non è stato incassato, aspetta
            wait();
        }
        // quando il pagamento è stato incassato, procede
    }
}






