package Esercizi_Eserciziario.Es5;

import TinyJDK.Iterator;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Random;

public class Es5 {
    public interface Function<A, B>{
        public B applay(A a);
    }

    public static <A, B> Iterator<B> mapIterator(Iterator<A> it, Function<A, B> f){
        return new Iterator<B>(){
          @Override
          public boolean hasNext(){
              return it.hasNext();
          }

          @Override
            public B next(){
                return f.applay(it.next());
          }
        };
    }

    public static class Pair<A, B>{
        A first;
        B second;

        public Pair(A first, B second){
            this.first = first;
            this.second = second;
        }

        public static <A> Iterator<Pair<A, A>> pairIterator(Iterator<A> it){
            return new Iterator<Pair<A,A>>(){

                A last;
                @Override
                public boolean hasNext(){
                    if(it.hasNext())
                        last = it.next();
                    return it.hasNext();
                }

                @Override
                public Pair<A, A> next(){
                    return new Pair<>(it.next(), last);
                }
            };
        }

        public static void main(String[] args) {
            Random rnd = new Random();
            Collection<Integer> c = new ArrayList<>();
            int size = Math.abs(rnd.nextInt() % 50) + 1;
            for(int i = 0; i < size; i++)
                c.add(Math.abs(rnd.nextInt() % 1000));
            System.out.println(String.format("lista di cateti (size = %d):\n%s", c.size(), c));
            Iterator<Pair<Integer, Integer>> cateti = pairIterator(c.iterator());
            Iterator<Double> ipotenuse = mapIterator(cateti, (Pair<Integer, Integer> p) ->
                    Math.sqrt(Math.pow(p.first, 2) + Math.pow(p.second, 2)));
            for (int cnt = 1; ipotenuse.hasNext(); ++cnt) {
                System.out.println(String.format("ipotenusa #%d: %g", cnt, ipotenuse.next()));
            }
        }
    }
}
