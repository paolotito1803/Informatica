package Esercizi_Eserciziario.Es2;

import java.util.Iterator;

public class Es2 {
    public interface BiFunc<A, B, C>{
        C apply(A a, B b);
    }

    public static class Pair<A, B>{
        public final A first;
        public final B second;

        public Pair(A first, B second){
            this.first = first;
            this.second = second;
        }
    }

    public static class Triple<A, B, C> extends Pair<A, B>{
        public final C third;

        public Triple(A first, B second, C third){
            super(first, second);
            this.third = third;
        }

        public static<A, B, C> Iterator<Triple<A, B, C>> evalIterator(Iterator<Pair<A, B>> it, BiFunc<A, B, C> f){
            return new Iterator<Triple<A, B, C>>(){
                @Override
                public boolean hasNext(){
                    return it.hasNext();
                }

                @Override
                public Triple<A, B, C> next(){ //devo restituire un Triple quindi faccio new Triple
                    return new Triple<>(it.next().first, it.next().second, f.apply(it.next().first, it.next().second));
                    //Triple richiede 3 parametri, i primi due che legge, ovvero first e second dell'iteratore che però li posso leggere con
                    //la next e la funzione che trasforma questi due
                }
            };
        }

        public static class FiboSequence implements Iterable<Integer>{
            public int len;

            FiboSequence(int len){
                this.len = len;
            }

            @Override
            public Iterator<Integer> iterator() {
                return new Iterator<Integer>(){
                    private int i = 0;

                    @Override
                    public boolean hasNext(){
                        return i < len;
                    }

                    @Override
                    public Integer next(){
                        return NumFibo(i++);
                    }

                    private int NumFibo(int i){
                       if(i == 0)
                           return 0;
                       else if(i <= 2)
                            return 1;
                       else{
                           return NumFibo(i - 1) + NumFibo(i - 2);
                       }
                    }
                };
            }
        }
    }
}
