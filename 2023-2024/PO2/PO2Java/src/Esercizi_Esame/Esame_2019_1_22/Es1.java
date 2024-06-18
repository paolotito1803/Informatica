package Esercizi_Esame.Esame_2019_1_22;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.Random;

public class Es1 {
    public interface Function<A, B>{
        B apply(A a);
    }

    public static <A, B> Iterator<B> mapIterator(Iterator<A> it, Function<A, B> f){
        return new Iterator<B>(){
            @Override
            public boolean hasNext(){
                return it.hasNext();
            }

            @Override
            public B next(){
                A a = it.next();
                return f.apply(a);
            }
        };
    }

    public static class Pair<A, B>{
        public A first;
        public B second;

        public Pair(A first, B second){
            this.first = first;
            this.second = second;
        }

        public static <A, B> Iterator<Pair<A, A>> pairIterator(Iterator<A> it){
            return new Iterator<Pair<A, A>>(){
                @Override
                public boolean hasNext(){
                    boolean primo = it.hasNext();
                    return primo && it.hasNext();
                }

                @Override
                public Pair<A, A> next(){
                    A primo = it.next();
                    return new Pair<A, A>(primo, it.next());
                }
            };
        }
    }

    public static void main(String args[]){
        Collection<Integer> p = new ArrayList<>();
        Random r = new Random();
        for (int i = 0; i <= 10; i++)
            p.add(r.nextInt());
        Iterator<Pair<Integer, Integer>> it = Pair.pairIterator(p.iterator());
        Iterator<Double> ipo = mapIterator(it, new Function<Pair<Integer, Integer>, Double>(){
           @Override
           public Double apply(Pair<Integer, Integer> c){
               return Math.sqrt((c.first * c.first) + (c.second * c.second));
           }
        });
    }


    /*public interface Function<A, B>{
        B apply(A a);
    }

    public static <A, B> Iterator<B> mapIterator(Iterator<A> it, Function<A, B> f){
        return new Iterator(){
            @Override
            public boolean hasNext(){
                return it.hasNext();
            }

            @Override
            public B next(){
                *//*A p = it.next();
                return f.apply(p);*//*
                return f.apply(it.next());
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

        public static <A, B> Iterator<Pair<A, A>> pairIterator(Iterator<A> it){
            return new Iterator(){
              @Override
              public boolean hasNext(){
                  boolean prox = it.hasNext();
                  return prox && it.hasNext();
              }

              @Override
                public Pair<A, A> next(){
                  A p = it.next();
                  return new Pair<A, A>(p, it.next());
              }
            };
        }
    }

    public static void main(String[] args) {
        Collection<Integer> col = new ArrayList<Integer>();
        Random m = new Random();
        for(int i = 0; i <= 10; i++)
            col.add(m.nextInt(0, 11));
        Iterator<Pair<Integer, Integer>> cateti = Pair.pairIterator(col.iterator());
        Iterator<Double> ipotenus = mapIterator(cateti, new Function<Pair<Integer, Integer>, Double>(){
           @Override
           public Double apply(Pair<Integer, Integer> p){
               return Math.sqrt(Math.pow(p.first, 2) + Math.pow(p.second, 2));
           }
        });
    }*/
}
