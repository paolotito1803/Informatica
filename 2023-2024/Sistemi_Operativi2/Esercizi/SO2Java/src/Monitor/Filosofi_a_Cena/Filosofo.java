package Monitor.Filosofi_a_Cena;

public class Filosofo extends Thread {
    static final int NTHREAD=5;             // numero di filosofi
    final int index;                        // indice locale del filosofo
    Tavola m;
    // il filosofo memorizza il proprio indice e il monitor condiviso
    Filosofo(int index, Tavola m) {
        this.index = index;
        this.m = m;
    }

    // il thread esegue il codiceFilosofo a meno di interruzioni
    public void run()  {
        try {
            //codiceFilosofo(index);
            codiceFilosofo();
        } catch (InterruptedException e) {
            System.out.println("Il filosofo "+index+" e' stato interrotto");
        }
    }
    // il filosofo pensa e mangia come al solito
   /* void codiceFilosofo(int index) throws InterruptedException {
        while(true) {
            // PENSA
            System.out.println("Filosofo " + index +" pensa");
            Thread.sleep(1000);

            // raccoglie la bacchetta sinistra
            // raccoglie la bacchetta destra

            m.raccogli_sx(index);
            m.raccogli_dx(index);

            //MANGIA
            System.out.println("Filosofo " + index +" mangia");
            Thread.sleep(1000);
            // deposita la bacchetta sinistra
            // deposita la bacchetta destra

            m.deposita_sx(index);
            m.deposita_dx(index);
        }*/

        void codiceFilosofo() throws InterruptedException {
            while(true) {
                // PENSA
                System.out.println("Filosofo " + index +" pensa");
                //Thread.sleep(1000);

                m.raccogli_entrambe(index);
                //MANGIA
                System.out.println("Filosofo " + index +" mangia");
                //Thread.sleep(1000);
                m.deposita_entrambe(index);
            }
        }
    public static void main(String args[]) throws InterruptedException {
        int index;

        Tavola m = new Tavola(NTHREAD);
        // crea NTHREAD filosofi e li esegue
        for(index=0;index<NTHREAD;index++) {
            new Filosofo(index,m).start();  //creo un filosofo senza assegnarlo ad una variabile
        }
        // esce lasciando i filosofi al loro destino
        // crea NTHREAD filosofi e li esegue
        /*for(index=0;index<NTHREAD;index++) {
            // Crea il filosofo con indice 'index' e lo esegue
            new Filosofo(index).start(); //creo un filosofo senza assegnarlo ad una variabile
        }*/
        // esce lasciando i filosofi al loro destino
    }
}