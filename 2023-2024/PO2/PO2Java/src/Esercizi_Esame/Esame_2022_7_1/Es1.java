package Esercizi_Esame.Esame_2022_7_1;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Random;
import java.util.function.Function;

public class Es1 {
    public interface Predicate<T> extends Function<T, Boolean>{}

    public interface Either<T>{
        T onSuccess(T t);
        void onFailure(T t) throws Exception;
    }

    public static class SkippableArrayList<E> extends ArrayList<E> {
        Iterator<E> iterator(Predicate<E> p, Either<E> f){
            final Iterator<E> it = super.iterator();
            return new Iterator<E>() {
                @Override
                public boolean hasNext(){
                    return it.hasNext();
                }

                @Override
                public E next(){
                    E x = it.next();
                    if(p.apply(x))
                        f.onSuccess(x);
                    else {
                        try {
                            f.onFailure(x);
                        }
                        catch(Exception e){}
                    }
                    return x;
                }
            };
        }
        public void main(String[] args) {
            ArrayList<Integer> dst = new ArrayList<>();
            SkippableArrayList<Integer> src = new SkippableArrayList<>();
            Random rnd = new Random();
            src.add(rnd.nextInt(10));
            src.iterator();
        }
    }

}
