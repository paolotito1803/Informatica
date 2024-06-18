package Esercizi_Esame.Esame_2023_9_5;

import java.nio.channels.FileLockInterruptionException;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.function.Function;
import java.util.function.Supplier;

public class Es1 {
    static <A, B> Iterator<Supplier<B>> asyncIterator(Iterator<A> it, Function<A, B> f) {
        return new Iterator<>() {
            @Override
            public boolean hasNext() {return it.hasNext(); }
            private class Future implements Supplier<B> {
                private Thread t;
                private B res;

                public Future(Supplier<B> f) {
                    t = new Thread(()->{res = f.get();});
                    t.start();
                }

                @Override
                public B get(){
                    try{
                        t.join();
                    }catch(InterruptedException e){
                        throw new RuntimeException(e);
                    }
                    return res;
                }
            }
            @Override
            public Supplier<B> next() {
                A c = it.next();
                return new Future(()->f.apply(c));
            }
        };

    }

    static <T extends Comparable<? super T>> void sortLists(Iterable<List<T>> c){
        Iterator<Supplier<List<T>>> it = asyncIterator(c.iterator(), (l) -> { Collections.sort(l); return l; });
        while(it.hasNext()){
            Supplier<List<T>> s = it.next();
            System.out.println(s.get());
        }
    }

/*    static <A, B> Iterator<Supplier<B>> asyncIterator(Iterator<A> it, Function<A, B> f) {
        return new Iterator<>() {
            @Override
            public boolean hasNext() {
               return it.hasNext();
            }
            private class Future implements Supplier<B> {
                private final Thread t;
                private B res;

                public Future(Supplier<B> f) {
                    t = new Thread(()->{res = f.get();});
                    t.start();
                }

                @Override
                public B get(){
                    try{
                    t.join();
                    }catch(InterruptedException e){
                        throw new RuntimeException(e);
                    }
                    return res;
                }
            }
            @Override
            public Supplier<B> next() {
                A a = it.next();
                return new Future(()->f.apply(a));
            }
        };
    }

    static <T extends Comparable<? super T>> void sortLists(Iterable<List<T>> c){
        Iterator<Supplier<List<T>>> it = asyncIterator(c.iterator(), (l) -> { Collections.sort(l); return l; });
        while(it.hasNext()){
            Supplier<List<T>> s = it.next();
            System.out.println(s.get());
        }
    }*/

}
