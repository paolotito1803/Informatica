package Esercizi_Eserciziario.Es7;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;


import java.util.Iterator;
import java.util.Random;

public class Es7 {
    public static class RandomSingleton{
        private RandomSingleton() {
        }
        @Nullable
        private static Random instance;

        @NotNull
        private static Random instance() {
            if (instance == null)
                instance = new Random();
            return instance;
        }

        //devo generare nuovo numero intero random quindi richamo la instance()
        public static int nextInt(){
            return instance().nextInt();
        }

        public static boolean nextBoolean(){
            return instance().nextBoolean();
        }

        public static double nextDouble(){
            return instance().nextDouble();
        }
    }

    public static class RandomIterator implements Iterator<Integer> {

        private int lunghezza;

        public RandomIterator(int lunghezza){
            this.lunghezza = lunghezza;
        }

        @Override
        public boolean hasNext() {
            return lunghezza > 0;
        }

        @Override
        public Integer next() {
            lunghezza--;
            return RandomSingleton.nextInt();
        }
    }
}
