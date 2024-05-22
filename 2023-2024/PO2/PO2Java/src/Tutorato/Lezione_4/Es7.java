package Tutorato.Lezione_4;

import java.util.Iterator;
import java.util.Random;

public class Es7 {
    /*singleton -> classe con unica istanza e renderla accessibile a tutti, composta da un solo elemento (metodo)
    1. istanza è parte della classe stessa e deve essere privata e statica come membro
    2. Non deve essere istanziato all'esterno quindi costruttore privato
     3. Metodo statico e pubblico per accedere all'istanza -> inizializza istanza e la restituisce
     */

    public static class Board{
        private static Board p;
        private Board(){
        }

        public static Board getInstance(){ //unico etodo per accedere all'istanza
            if(p == null){
                p = new Board();
            }
            return p;
        }
    }

    public static class RandomSingleton{
        private RandomSingleton(){

        }

        private static Random rnd;

        private  static Random getInstance(){
            if(rnd == null){
                rnd = new Random();
            }
            return rnd;
        }

        //costruisco istanza con un numero intero per settare il seed, sovrascrive quella vecchia
        public RandomSingleton(long seed){
            rnd = new Random(seed);
        }

        //sfrutto classe random per generare i nuovi numeri random di RandomSingleton, sono staccati dalla classe
        public static int nextInt(){
            return getInstance().nextInt();
        }

        public static boolean nextBoolean(){
            return getInstance().nextBoolean();
        }

        public static double nextDouble(){
            return getInstance().nextDouble();
        }
    }

    public static class RandomIterator implements Iterator<Integer> {

        int len;

        public RandomIterator(int len){
            this.len = len;
        }

        @Override
        public boolean hasNext(){
            return len > 0;
        }

        @Override
        public Integer next(){
            len--;
            return RandomSingleton.nextInt();
        }

    }
}
