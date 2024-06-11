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

    public static class SkippableArrayList<E> extends ArrayList<E>{
        Iterator<E> iterator(Predicate<E> p, Either<E> f){
            Iterator<E> it = super.iterator();
            return new Iterator(){
                @Override
                public boolean hasNext(){
                    return it.hasNext();
                }

                @Override
                public E next(){
                    E x = it.next();
                    if(p.apply(x) == true)
                        return f.onSuccess(x);
                    else{
                        try{
                            f.onFailure(x);
                        }catch(Exception m){
                            System.out.println(m);
                        }
                    }
                    return x;
                }
            };
        }
    }

    public static void main(String args[]){
        ArrayList<Integer> dst = new ArrayList<>();
        SkippableArrayList<Integer> src = new SkippableArrayList<>();
        Random r = new Random();
        for(int i = 0; i <= 10; i++)
            src.add(r.nextInt(0, 11));
        src.iterator(new Predicate<Integer>(){
            @Override
            public Boolean apply(Integer t){
                return t > 5;
            }
        }, new Either<Integer>(){
            @Override
            public Integer onSuccess(Integer i){
                return i + 1;
            }

            @Override
            public void onFailure(Integer i){
                dst.add(i);
            }
        });
    }






















   /* public interface Predicate<T> extends Function<T, Boolean>{}

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
*/
}
