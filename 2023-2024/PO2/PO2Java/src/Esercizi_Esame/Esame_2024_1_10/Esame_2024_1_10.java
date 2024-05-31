package Esercizi_Esame.Esame_2024_1_10;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.function.Function;

public class Esame_2024_1_10 {
    public static class FactorialThread extends Thread {
        private int result;
        private final int n;

        public FactorialThread(int n){
            this.n = n;
        }

        public int getResult(){
            try{
                join();
            }catch (InterruptedException e){
                throw new RuntimeException(e);
            }
            return result;
        }

        @Override
        public void run() {
            result = fact(n);
        }
    }
}
