package Esercizi_Eserciziario.Es10;

import TinyJDK.ArrayList;

import java.util.Iterator;

import static java.lang.Math.abs;


public class Es10 {

    public static class FancyArrayList<T> extends ArrayList<T>{
        public interface Function<A, B>{
            B applay(A a);
        }

        public  Iterator<T> iterator(int step, Function<T, T> f){
            return new Iterator<T>(){
                int pos = step > 0 ? 0 : size() - 1;


                @Override
                public boolean hasNext(){
                    return pos >= 0 && pos < size();
                }

                @Override
                public T next(){
                    T ret;
                    if(step >= 0){
                        ret = get(pos);
                        pos += step;
                    }
                    else{
                        ret = get(pos);
                        pos -= Math.abs(step);
                    }
                    return f.applay(ret);
                }
            };
        }
        //override se intendo in totale e lo è di arraylist altrimenti se mi chiedo se è un override del metodo qui sopra allora no.
        public Iterator<T> iterator(){
            return iterator(1, new Function<T, T>(){

                @Override
                public T applay(T t) {
                    return t;
                }
            });
        }

        public Iterator<T> backwardIterator(){
            return iterator(-1, new Function<T, T>(){
               @Override
               public T applay(T t){
                   return t;
               }
            });
        }
    }
}
