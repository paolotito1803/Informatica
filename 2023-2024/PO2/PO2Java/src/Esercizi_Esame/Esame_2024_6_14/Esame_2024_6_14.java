package Esercizi_Esame.Esame_2024_6_14;

import java.util.Iterator;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

public class Esame_2024_6_14 {
    public static <A, B> Iterator<B> mapIterator(Iterator<A> it, Function<A, B> f){
        return new Iterator<B>(){
          @Override
          public boolean hasNext(){
              return it.hasNext();
          }
          @Override
          public B next(){
              A a = it.next();
              B b = f.apply(a);
              return b;
          }
        };
    }

    public static <T> void forEach(Iterable<T> it, Consumer<T> f){
        for(T el : it)
            f.accept(el);
    }

    public class Pair<A, B>{
        private final A first;
        private final B second;
        public Pair(A first, B second){
            this.first = first;
            this.second = second;
        }
        public A getFirst(){return first;}
        public B getSecond(){return second;}
    }
    public static <A, B> Iterator<B> applyFuns(Iterable<Pair<Function<A, B>, A>> l){
        return mapIterator(l.iterator(), (x)->x.getFirst().apply(x.getSecond()));
    }
    public static <A, B> Iterator<B> applyFunctions(Iterable<Pair<Function<A, B>, A>> l){
        return mapIterator(l.iterator(), new Function<Pair<Function<A, B>, A>, B>(){
            @Override
            public B apply (Pair<Function<A, B>, A> x){
                return x.getFirst().apply(x.getSecond());

            }
        });
    }
    public static <T> void acceptFuns(Iterable<Pair<Consumer<T>, T>> l){
        forEach(l, (x)->x.first.accept(x.second));
    }
    public static <A, B> Iterator<Supplier<B>> asyncMapIterator(Iterator<A> it, Function<A, B> f){
        return new Iterator<Supplier<B>>(){
            @Override
            public boolean hasNext(){
                return it.hasNext();
            }
            @Override
            public Supplier<B> next(){
                A a  = it.next();
                Supplier<B> p = new Supplier<B>() {
                    B b;
                    @Override
                    public B get() {
                        Thread t = new Thread(()->b = f.apply(a));
                        t.start();
                        try{ t.join();}catch(InterruptedException m){
                            System.out.println(m);
                        }
                        return b;
                    }
                };
                return p;
            }
        };
    }
    public static <T> void asyncForEach(Iterable<T> it, Consumer<T> f){
        for(T el : it) {
            Thread t = new Thread(() -> f.accept(el));
            t.start();
        }
    }
}
