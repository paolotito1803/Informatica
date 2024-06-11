package Esercizi_Esame.Esame_2019_1_22;

import java.util.concurrent.LinkedBlockingQueue;

public class Es2 {
    public interface Pool<T, R> {
        void add(T x); // popola la pool con un nuovo elemento
        R acquire() throws InterruptedException; // acquisisce una risorsa
        void release(R x); // rilascia una risorsa e la rimette nella pool
    }

    public interface BasicPool<T> extends Pool<T, T>{}

    public interface Resource<T>{
        void autoRelease();
    }

    public static class SimplePool<T> implements BasicPool<T>{
        LinkedBlockingQueue<T> it =  new LinkedBlockingQueue<>();

        @Override
        public void add(T x){
            it.add(x);
        }

        @Override
        public T acquire() throws InterruptedException{
            return it.take();
        }

        @Override
        public void release(T x){
            it.add(x);
        }
    }

    public static class AutoPool<T> implements Pool<T, Resource<T>>{
        LinkedBlockingQueue<T> it =  new LinkedBlockingQueue<>();
        @Override
        public Resource<T> acquire() throws InterruptedException{
            T key = it.take();
            return new Resource<T>(){
                @Override
                public void autoRelease(){
                    it.add(key);
                }

                public void finalize(){
                    autoRelease();
                }
            };
        }

        @Override
        public void add(T x){
            it.add(x);
        }

        @Override
        public void release(Resource<T> x){
            x.autoRelease();
        }
    }

}
