package Tutorato.Lezione_5;

import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.function.Function;
import java.util.function.Supplier;

//appello 5/9/23
public class asynclt {
    /*
    trasformazione all'interno di un iteratre di una lista di tipo A a tipo B. In modo Asincrono vuol dire che viene fatto da un thread diverso
    Per fare questo dobbiamo tornare anche una lambda da passare al nuovo thread che partirà
     */
    static <A,B> Iterator<Supplier<B>> asyncIterator(Iterator<A> it, Function<A,B> f){
       return new Iterator<Supplier<B>>() {
           @Override
           public boolean hasNext() {
               return it.hasNext();
           }

           private class Future implements Supplier<B>{
               private B r;
               private final Thread t;
               public Future(Supplier<B> f){
                   t = new Thread(() -> {r = f.get();});
                   t.start();
               }


              @Override
              public B get() {
                  try {
                      t.join();//faccio aspettare che il thread finisca prima di andare alla prossima riga di codice
                  }catch (InterruptedException e){
                      throw new RuntimeException(e);
                  }
                  return r;
              }
          }

           @Override
           public Supplier<B> next() {
               A a = it.next();
               return new Future(() -> f.apply(a));
           }
       };
   }
    static <T extends Comparable<? super T>> void sortLists(Iterable<List<T>> c){
        Iterator<Supplier<List<T>>> it = asyncIterator(c.iterator(),(l) ->
        {
            Collections.sort(l); return l;});

        while(it.hasNext()){
            Supplier<List<T>> f = it.next(); // attende che ogni thread termini la sua computazione e va avanti
        }
    }
    /*
     * L'interfaccia comparable definisce come due elementi possono essere confrontati
     * public Interface Comparable<T>{
     *   int compareTo(T o);
     *   // this -> A
     *   // parametro compareTo -> T
     * }
     * */

    public static void main(String[] args) {

    }
}
