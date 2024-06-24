package Esercizi_Esame.Esame_2023_1_13;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;


public class Es1 {
    public interface Pool<R> {
        R acquire() throws InterruptedException; // acquisisce una risorsa
        void release(R x); // rilascia una risorsa e la rimette nella pool
    }

    public interface Resource<T> {
        T get(); // getter dell'oggetto di tipo T
        void autorelease(); // rilascia questo oggetto e lo rimette nella pool da cui proviene
    }

   public class SimplePool<R> implements Pool<R> {
        private BlockingQueue<R> q = new LinkedBlockingQueue<>();

        @Override
       public R acquire() throws InterruptedException{
            return q.take();
        }

        @Override
       public void release(R x){
            q.add(x);
        }
   }

   public class AutoPool<R> implements Pool<Resource<R>>{
        private BlockingQueue<R> q = new LinkedBlockingQueue<>();

        public void aggiungi(R x){
            q.add(x);
        }

        @Override
       public Resource<R> acquire() throws InterruptedException{
            R res = q.take();
            return new Resource<R>(){
              @Override
              public R get(){
                  return res;
              }

              @Override
              protected void finalize(){
                  autorelease();
              }

              @Override
                public void autorelease(){
                    aggiungi(res);
              }
            };
        }

        @Override
       public void release(Resource<R> x){
            x.autorelease();
        }
   }
}
