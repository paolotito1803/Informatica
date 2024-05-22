package Esercizi_Eserciziario.Es9;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Random;

public class Es9 {
    public interface Predicate<T>{
        boolean apply(T x);
    }

    public interface Either<T>{
        T onSuccess(T o);
        void onFailure(T x) throws Exception;
    }

    public static class SkippableArrayList<E> extends ArrayList<E>{
        public Iterator<E> iterator(Predicate<E> p, Either<E> f){
            return new Iterator<E>() {
                private Iterator<E> it = new ArrayList<E>().iterator();

                @Override
                public boolean hasNext() {
                    return it.hasNext();
                }

                @Override
                public E next() {
                    E fail = it.next();
                    if(p.apply(it.next()) == true)
                       return f.onSuccess(it.next());
                    else {
                        try {
                            f.onFailure(it.next());
                        } catch(Exception e){
                           fail = it.next();
                            System.out.println("Eccezione inviata");
                        }
                    }
                    return fail;
                }
            };
        }

        public static void main(String[] args) {
            ArrayList<Integer> ar = new ArrayList<>();
            SkippableArrayList<Integer> sk = new SkippableArrayList<>();
            Random rnd = new Random();

            for(int i = 0; i < 10; i++)
                sk.add(rnd.nextInt(10));
            sk.iterator(new Predicate<Integer>() {
                @Override
                public boolean apply(Integer x) {
                    return x > 5;
                }
            }, new Either<Integer>() {
                @Override
                public Integer onSuccess(Integer o) {
                    return o + 1;
                }

                @Override
                public void onFailure(Integer x) throws Exception {
                    ar.add(x);
                }
            });
        }
    }
}
