/*
 * Corso di Sistemi Operativi 2021
 * Terza esercitazione: monitor
 *
 * Author: Riccardo Focardi
 *
 * Compilare con: javac Piazza.java
 */

import java.util.Random;
import java.util.HashMap;
import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;

public class Piazza {
    final static int  N_THREAD=40;
    final static int SLEEPBASE=100;
    final static int N_ITER=20;
    final static Person[] person = new Person[N_THREAD];
    final static String contrade[] =  new String[] {"Bruco","Chiocciola","Civetta","Aquila"};
    private static int flag = 0;
    static Random rand = new Random(48);
    static private HashMap<String,Integer> n_persone = new HashMap<String,Integer>();
    static private HashMap<String,Integer> max_persone = new HashMap<String,Integer>();
    static HashMap<String,List<String>> conflicts = new HashMap<String,List<String>>();
    static private HashMap<String,List<String>> permitted = new HashMap<String,List<String>>();
    static private List<String> checked = new ArrayList<String>();

    public static void main(String args[]) throws InterruptedException {
        int i,j,k;

        Monitor m = new Monitor();

        for (String kk : contrade) {
            permitted.put(kk,new ArrayList<String>());
        }
        conflicts.put("Bruco",Arrays.asList("Chiocciola", "Civetta", "Aquila"));
        conflicts.put("Chiocciola",Arrays.asList("Bruco", "Aquila"));
        conflicts.put("Civetta",Arrays.asList("Bruco"));
        conflicts.put("Aquila",Arrays.asList("Bruco", "Chiocciola"));

        for (String kk : contrade) {
            for (String p : contrade) {
                if (p != kk && !conflicts.get(kk).contains(p)) {
                    permitted.get(kk).add(p);
                }
            }
        }
        // System.out.println(permitted);

        for(j=0;j<N_ITER;j++) {
            for (String kk : contrade) {
                max_persone.put(kk,0);
                n_persone.put(kk,0);
            }
            checked = new ArrayList<String>();

            for (i=0;i<N_THREAD;i++) {
                k=rand.nextInt(4);
                person[i] = new Person(j,m,k);
                max_persone.put(contrade[k],max_persone.get(contrade[k])+1);
                person[i].start();
            }
            // System.out.println(max_persone);

            for (String kk : contrade) {
                if (max_persone.get(kk)==0) {
                    System.out.println(String.format("[ERRORE] Nessuna persona %s!",kk));
                    System.exit(1);
                }
            }

            for (i=0;i<N_THREAD;i++) {
                person[i].join();
            }
        }
        System.out.println(String.format("Terminato, flag=%06x",flag));
    }

    static class Person extends Thread {
        String contrada;
        Monitor m;
        int j;

        Person(int j,Monitor m, int k) {
            this.contrada = contrade[k];
            this.m = m;
            this.j = j;
            flag = (flag + (k*(rand.nextInt(16777216))))%16777216;
        }

        public void run() {
            try {
                go();
            } catch (InterruptedException e) {
                System.out.println(String.format("Persona %s interrotta!",contrada));
            }
        }

        public void go() throws InterruptedException {
            // System.out.println(String.format("Saluti dal thread di tipo %s", this.contrada));
            // m.test1();


            synchronized(m) {
                m.entra(contrada);
                System.out.println(String.format("[%s] entra in piazza", this.contrada));

                n_persone.put(contrada,n_persone.get(contrada)+1);

                for (String k : conflicts.keySet()) {
                    if (n_persone.get(k)>0) {
                        for (String c : conflicts.get(k)) {
                            if (n_persone.get(c)>0) {
                                System.out.println(String.format("[ERRORE] %s assieme a %s",k,c));
                                System.out.println(String.format("Stato: %s",n_persone));
                                System.out.println(String.format("Iterazione: %d",j));

                                System.exit(1);
                            }
                        }
                    }
                }
            }

            sleep(SLEEPBASE);

            synchronized(m) {
                m.esce(contrada);
                if (!permitted.get(contrada).isEmpty()
                        && !checked.contains(contrada)
                        && n_persone.get(contrada) == max_persone.get(contrada))
                {
                    boolean ok=false;
                    for (String k : permitted.get(contrada)) {
                        if (n_persone.get(k)==max_persone.get(k)) {
                            ok=true;
                            checked.add(k);
                        }
                    }
                    if (!ok) {
                        ok=true;
                        for (String k : permitted.get(contrada)) {
                            if (!checked.contains(k)) {
                                ok=false;
                                break;
                            }
                        }
                    }
                    if (!ok) {
                        System.out.println(String.format("[ERRORE] uno di %s non è entrato insieme a %s!",permitted.get(contrada), contrada));
                        System.out.println(String.format("Stato: %s",n_persone));
                        System.out.println(String.format("Iterazione: %d",j));

                        System.exit(1);
                    }
                    checked.add(contrada);
                }
                n_persone.put(contrada,n_persone.get(contrada)-1);
            }

            System.out.println(String.format("[%s] esce dalla piazza", this.contrada));
        }
    }
}
/*
In quessta classe eseguo le seguenti operaioni:
1. Utilizzo  due HashMap. inPiazza tiene traccia del numero di persone per ogni contrada che sono attualmente in piazza.
     e contrade mi definisce le contrade che ho.
 2. Nel costruttore, inizializziamo entrambi gli HashMap. Ogni contrada inizia con 0 persone in piazza e un nuovo oggetto
    di blocco.
 3. La funzione entra è sincronizzata sull’oggetto this del monitor. Se la persona non può entrare in piazza (controllato
    dalla funzione canEnter), allora aspetta. Quando può entrare, incrementa il conteggio delle persone in piazza per la sua
   contrada.
4. La funzione esce è anche sincronizzata sull’oggetto this del monitor. Quando una persona esce dalla piazza, decrementa
    il conteggio delle persone in piazza per la sua contrada e notifica tutte le persone in attesa su this.
 5. La funzione canEnter controlla se una persona può entrare in piazza. Una persona può entrare solo se non ci sono persone
    in piazza da contrade con cui ha un conflitto.
 */
class Monitor {
    //queste due variabili le uso per tener traccia di quante persone sono presenti in piazza e quando devo bloccarne l'ingresso
    private final HashMap<String, Integer> inPiazza = new HashMap<>();
    private final String[] contrade =  new String[] {"Bruco","Chiocciola","Civetta","Aquila"};
    private final HashMap<String, List<String>> conflict = new HashMap<>();

    //inizializzo le variabili con le contrade e le persone presenti, inizialmente sono 0 in quanto la piazza è vuota
    Monitor() {
        for (String contrada : Piazza.contrade) {
            inPiazza.put(contrada, 0);
        }
        //inserisco tutti i vari conflitti
        //le contrate nell'arraylist sono tutte le contrade con cui non si deve incontrare la contrada specificata nella parte iniziale
        conflict.put("Bruco", Arrays.asList("Chiocciola", "Civetta", "Aquila"));
        conflict.put("Chiocciola", Arrays.asList("Bruco", "Aquila"));
        conflict.put("Civetta", Arrays.asList("Bruco"));
        conflict.put("Aquila", Arrays.asList("Bruco", "Chiocciola"));
    }

    //in questa funzione utilizzo una funzione ausiliaria per poter bloccare l'accesso in caso il valore di ritorno sia false altrimenti
    //incremento il valore del numero delle persone presenti nella piazza. Sincronizzo ovviamente su me stesso ovvero this
    void entra(String contrada) throws InterruptedException {
        while (!canEnter(contrada)) {
            wait();
        }
        inPiazza.put(contrada, inPiazza.get(contrada) + 1);

    }

    //anche in questo caso sincronizzo me stesso e vado a decrementare il numero delle persone presenti nella piazza esendo che ne esce una alla
    //volta e notifico a tutti che una persona è uscita e quindi ne può entrare un'altra.
    void esce(String contrada) {
        inPiazza.put(contrada, inPiazza.get(contrada) - 1);
        notifyAll();
    }

    //questa è la funzione ausiliaria che mi sono creato peer poter gestire l'ingresso delle persone, in questa funzione mi scorro tuttte le
    //contrade e controllo che siano diverse dal mio iteratore e inoltre controllo che l'elemento presente in conflict contenga il mio
    //iteratore (ovvero se si stanno per scontrare le contrade che non devono farlo)
    // e se le persone presenti in piazza delle contrade che creano conflitto sono maggiori di 0 ritorno false
    private boolean canEnter(String contrada) {
        for (String other : contrade) {
            if (!other.equals(contrada) && conflict.get(contrada).contains(other) && inPiazza.get(other) > 0) {
                return false;
            }
        }
        return true;
    }
}
