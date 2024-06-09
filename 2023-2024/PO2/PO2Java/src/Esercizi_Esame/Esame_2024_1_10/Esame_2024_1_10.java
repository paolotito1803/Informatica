package Esercizi_Esame.Esame_2024_1_10;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.function.Function;

import static functional.HigherOrderFunctions.map;

public class Esame_2024_1_10 {

    public static class FactorialThread extends Thread{
        private int res;
        private final int nume;

        FactorialThread(int nume){
            this.nume = nume;
        }

        @Override
        public void run(){
            res = fact(nume);
        }

        public int getResult(){
            try{
                join();
            }catch(InterruptedException e){
                throw new RuntimeException(e);
            }
            return res;
        }

        public int getNume(){
            return nume;
        }

        public static int fact(int nume){
            if(nume <= 1)
                return 1;
            else
                nume = nume * fact(nume - 1);
            return nume;
        }

        static Collection<FactorialThread> parallelFactorial(Collection<Integer> c){
            Collection<FactorialThread> p = new ArrayList<>();
            for(int i : c){
                FactorialThread ft = new FactorialThread(i);
                ft.start();
                p.add(ft);
            }
            return p;
        }

        public static void main(String[] args) {
            for (FactorialThread t : parallelFactorial(List.of(0, 1, 2, 3, 11, 12, 23, 35)))   // chiamare anche parallelFactorial2() per provarla
                System.out.printf("fact(%d) = %d\n", t.getNume(), t.getResult());
        }

        public static <A, B> List<B> map(Iterable<A> i, Function<A, B> f){
           List<B> res = new ArrayList<>();
           for(A it : i){
               B b = f.apply(it);
               res.add(b);
           }
           return res;
        }

        public static Collection<FactorialThread> parallelFactorial2(Collection<Integer> c){
            return map(c,(n) -> { FactorialThread t = new FactorialThread(n); t.start(); return t; });
        }
    }



}
