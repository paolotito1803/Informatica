package Monitor.Filosofi_a_Cena;

public class Tavola {
    private boolean bacchette[]; // le bacchette
    private final int NFIL;      // il numero di filosofi
    // crea le NFIL bacchette e le inizializza a true (presenti)
    // NOTA: non serve sincronizzarlo e' prima della creazione dei filosofi
    Tavola(int NFIL) {
        int i;
        this.NFIL=NFIL;                 // memorizza il numero dei filosofi
        bacchette = new boolean[NFIL];  // crea le bacchette
        for (i=0;i<NFIL;i++)    // inizializza le bacchette a true
            bacchette[i] = true;
    }
    // raccoglie la bacchetta sinistra
    synchronized void raccogli_sx(int index) throws InterruptedException {
        while(!bacchette[index]){
            wait();
        }
        bacchette[index] = true;
    }
    // raccoglie la bacchetta destra
    synchronized void raccogli_dx(int index) throws InterruptedException {
        raccogli_sx((index+1)%NFIL); // la dx e' sx del filosofo successivo
    }
    // deposita la bacchetta sinistra e notifica TUTTI i filosofi
    synchronized void deposita_sx(int index) {
        if(!bacchette[index]){
            notifyAll();
            bacchette[index] = true;
        }
    }
    // deposita la bacchetta destra e notifica TUTTI i filosofi
    synchronized void deposita_dx(int index) {
        deposita_sx((index+1)%NFIL); // la dx e' sx del filosofo successivo
    }


    public void raccogli_entrambe(int index) throws InterruptedException {
        while(!bacchette[index] && !bacchette[(index + 1) % NFIL]){
            wait();
        }
        bacchette[index] = true;
        bacchette[(index + 1) % NFIL] = true;
    }

    public void deposita_entrambe(int index) {
        if(!bacchette[index] && !bacchette[(index + 1) % NFIL]){
            notifyAll();
            bacchette[index] = true;
            bacchette[(index + 1) % NFIL] = true;
        }
    }
}
