package Tutorato.Lezione_3;


import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Produttore_Consumatore {
    //bisogna rendere il buffer di lettura e scrittura bloccante
    public static List<Integer> buff = new ArrayList();

    public static class Producer extends Thread {
        public Producer(){
            super("Producer");
        }
        @Override
        public void run(){
            Random rnd = new Random();
            while(true){
                int n = rnd.nextInt();
               synchronized (buff) {
                    buff.add(n);
                    buff.notify(); //devo usare lo stesso oggetto che uso come semaforo con la wait e la notify
                }
            }
        }
    }



    public static class Consumer extends Thread {
        public Consumer(){
            super("Consumer");
        }

        @Override
        public void run(){
            while(true){
                synchronized (buff) {
                    if(buff.isEmpty()){
                        try {
                            buff.wait();
                        } catch (InterruptedException e) {
                            throw new RuntimeException(e);
                        }
                    }
                    int n = buff.remove(0);

                }
            }
        }
    }
}
