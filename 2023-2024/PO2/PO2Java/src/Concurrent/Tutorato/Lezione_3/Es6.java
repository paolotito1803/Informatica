package Tutorato.Lezione_3;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

public class Es6 {
    public interface Pool<T, R> {
        void add(T x); // popola la pool con un nuovo elemento
        R acquire() throws InterruptedException; // acquisisce una risorsa
        void release(R x); // rilascia una risorsa e la rimette nella pool
    }

    public interface BasicPool<T> /*dichiaro un generics*/ extends Pool<T, T> /*uso il generc*/{
    }

    public static class SimplePool<T> implements BasicPool<T>{

        private BlockingQueue<T> queue = new LinkedBlockingQueue<>();

        @Override
        public void add(T x) {
            queue.add(x);
        }

        @Override
        public T acquire() throws InterruptedException {
            return queue.take();
        }

        @Override
        public void release(T x) { //prende una risorsa e la rimette in coda
            this.add(x);
        }
    }

    public interface Resource<T>{
        T get();
        void release();
    }

    public static class AutoPool<T> implements Pool<T, Resource<T>>{

        private BlockingQueue<T> queue = new LinkedBlockingQueue<>();

        @Override
        public void add(T x) {
            queue.add(x);
        }

        @Override
        public Resource<T> acquire() throws InterruptedException {
            T r = queue.take();
            return new Resource<T>() {
                @Override
                public T get() {
                    return r;
                }

                @Override
                public void release() {
                    add(r);
                }

                @Override
                public void finalize() {
                    this.release(); //this dell'anonimus class
                }
            };
        }

        @Override
        public void release(Resource<T> x) {
            x.release();
        }
    }
}
