package Esercizi_Eserciziario.Es6;

/*
6. Si prenda in considerazione la seguente interfaccia Java:

Una pool `e un container di oggetti che si comporta come una coda bloccante: `e possibile ottenere una risorsa con
acquire() per poi restituirla alla pool tramite il metodo release().
Il generic T astrae il tipo degli oggetti contenuti internamente nella pool, mentre R `e il tipo della risorsa restituita
dalla acquire(): il motivo per cui sono due generic differenti `e per consentire alle classi che implementano questa
interfaccia di rappresentare in modo diverso, se necessario, gli elementi conservati all’interno e le risorse restituite
dalla acquire().
Quando la coda `e vuota e nessun oggetto `e disponibile, il metodo acquire() deve essere bloccante: al fine di semplificare l’implementazione, si utilizzi un oggetto di tipo LinkedBlockingQueue come campo interno. Riportiamo
un estratto della classe LinkedBlockingQueue definita dal JDK con i metodi pubblici pi`u significativi

(a) Si definisca una interfaccia BasicPool che estende l’interfaccia Pool e che ha un solo generic per rappresentare
sia il tipo degli elementi interni sia il tipo delle risorse restituite dalla acquire().
(b) Si implementi una classe SimplePool che implementa l’interfaccia BasicPool e realizza una semplice coda
bloccante.
(c) Si implementi una classe AutoPool che implementa l’interfaccia Pool realizzando un meccanismo di autorelease delle risorse. Se p `e una pool, l’obiettivo `e fare in modo che una risorsa x acquisita tramite la
chiamata p.acquire() non debba essere esplicitamente riconsegnata alla pool chiamando p.release(x), ma
sia possibile rilasciarla invocando x.release().
Suggerimento: si definisca un nuovo tipo parametrico Resource che si comporta come un proxy per l’oggetto
contenuto al suo interno e che implementa la logica di auto-release rilasciando this.
(d) Si automatizzi il meccanismo di cui sopra facendo in modo che un oggetto di tipo Resource si rilasci autonomamente quando non esistono pi`u riferimenti ad esso.
Suggerimento: la superclasse Object definisce un metodo finalize() che viene invocato nel momento in
cui l’oggetto viene cancellato dal garbage collector
 */

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

public class Es6 {
    public interface Pool<T, R> {
        void add(T x); // popola la pool con un nuovo elemento
        R acquire() throws InterruptedException; // acquisisce una risorsa
        void release(R x); // rilascia una risorsa e la rimette nella pool
    }

    public static interface BasicPool<T> extends Pool<T, T>{
    }

    public static class SimplePool<T> implements BasicPool<T>{

        private BlockingQueue<T> p = new LinkedBlockingQueue<>();

        @Override
        public void add(T x) {
            p.add(x);
        }

        @Override
        public T acquire() throws InterruptedException {
            return p.take();
        }

        @Override
        public void release(T x) {
            p.add(x);
        }
    }

    public interface Resource<T>{
        void release();
        T get();
    }

    public static class AutoPool<T> implements Pool<T, Resource<T>>{

        private BlockingQueue<T> p = new LinkedBlockingQueue<>();

        @Override
        public void add(T x) {
            p.add(x);
        }

        @Override
        public Resource<T> acquire() throws InterruptedException {
            T r = p.take();
            return new Resource<T>() {
                @Override
                public T get() {
                    System.out.println(String.format("acquired: %s", r));
                    return r;
                }
                @Override
                public void release() {
                    System.out.println(String.format("released: %s", r));
                    add(r);
                }

                @SuppressWarnings("deprecation")
                @Override
                public void finalize() {
                    release();
                }
            };
        }

        @Override
        public void release(Resource<T> x) {
            x.release();
        }
    }
}
