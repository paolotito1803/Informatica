package Esercizi_Esame.Esame_2023_6_30;

import java.util.Iterator;
import java.util.function.Function;
public class Es1 {
    public static class FunSeq<X extends Number & Comparable<? super X>, Y extends Number>
            implements Iterable<Pair<X, Y>> {
        private final X a, b;
        private final Function<? super X, ? extends Y> f;
        private final Function<X, X> inc;

        public FunSeq(X a, X b, Function<? super X, ? extends Y> f, Function<X, X> inc) {
            this.a = a;
            this.b = b;
            this.f = f;
            this.inc = inc;
        }

        @Override
        public Iterator<Pair<X, Y>> iterator(){
            return new Iterator<Pair<X, Y>>(){
                X x = a;
                @Override
                public boolean hasNext(){
                    return x.compareTo(b) <= 0;
                }

                @Override
                public Pair<X, Y> next(){
                    Pair<X, Y> attuale = new Pair<>(x, f.apply(x));
                    x = inc.apply(x);
                    return attuale;
                }
            };
        }
    }
    public static class Pair<A, B>{
        private final A first;
        private final B second;
        public Pair(A first, B second){
            this.first = first;
            this.second = second;
        }
        public A getFirst(){return first;}
        public B getSecond(){return second;}
    }

    public static void main(String[] args){
        FunSeq<Double, Double> parabola = new FunSeq<>(-2., 2., (x)->x*x + 2*x - 1, (x)->x + 0.1);
        FunSeq<Double, Integer> parabola2 = new FunSeq<>(-2., 2., (x)->(int) (x*x + 2*x - 1), (x)->x + 0.1);
    }























    /*public static class FunSeq<X extends Number & Comparable<? super X>, Y extends Number>
            implements Iterable<Pair<X, Y>> {
        private final X a, b;
        private final Function<? super X, ? extends Y> f;
        private final Function<X, X> inc;
        public FunSeq(X a, X b, Function<? super X, ? extends Y> f, Function<X, X> inc) {
            this.a = a;
            this.b = b;
            this.f = f;
            this.inc = inc;
        }

        @Override
        public Iterator<Pair<X, Y>> iterator() {

            return new  Iterator<Pair<X, Y>>() {
                X count = a;
                @Override
                public boolean hasNext() {
                    return count.compareTo(b) <= 0;
                }

                @Override
                public Pair<X, Y> next() {
                    Pair<X, Y> p = new Pair<>(count, f.apply(count));
                    count = inc.apply(count);
                    return p;
                }
            };
        }
    }

    public static class Pair<X, Y>{
        private final X a;
        private final Y b;

        public Pair(X a , Y b){
            this.a = a;
            this.b = b;
        }
    }

    public static void main(String[] args) {
        FunSeq<Double, Double> parabola = new FunSeq<>(-2., 2., (x)->x*x + x*2 -1, (x)->x+0.1);
        FunSeq<Double, Integer> p = new FunSeq<>(-2., 2.,  (x)-> (int)(x*x + 2*x - 1), (x)->x+0.1);
    }*/

   /* public static class FunSeq<X extends Number & Comparable<? super X>, Y extends Number>
            implements Iterable<Pair<X, Y>> {
        private final X a, b;
        private final Function<? super X, ? extends Y> f;
        private final Function<X, X> inc;
        public FunSeq(X a, X b, Function<? super X, ? extends Y> f, Function<X, X> inc) {
            this.a = a;
            this.b = b;
            this.f = f;
            this.inc = inc;
        }

        @Override
        public Iterator<Pair<X, Y>> iterator(){
            X count = a;
            return new Iterator<Pair<X, Y>>() {
                @Override
                public boolean hasNext(){
                    return count.compareTo(b) <= 0;
                }

                @Override
                public Pair<X, Y> next(){
                    inc.apply(count); //inc serve per andare al prossimo numero
                    Pair<X, Y> p = new Pair<>(count, f.apply(count));
                  return p;

                }
            };
        }
    }

    public static class Pair<A, B>{
        private final A first;
        private final B second;
        public Pair(A first, B second){
            this.first = first;
            this.second = second;
        }
    }

    public static void main(String[] args) {
        FunSeq<Double, Double> parabola = new FunSeq<>(-2., 2., (x)->x*x + 2*x - 1, (x)->x+0.1);
        for(Pair<Double, Double> p : parabola){
            System.out.println(p.first);
            System.out.println(p.second);
        }

        FunSeq<Double, Integer> parabola2 = new FunSeq<>(-2. ,2., (x)->(int) (x*x + 2*x - 1), (x)->x+0.1);
        for(Pair<Double, Double> p : parabola){
            System.out.println(p.first);
            System.out.println(p.second);
        }
    }*/


    /*public static class Pair<A, B>{
        public final A first;
        public final B second;

        Pair(A first, B second) {
            this.first = first;
            this.second = second;
        }
    }
    public static class FunSeq<X extends Number & Comparable<? super X>, Y extends Number>
            implements Iterable<Pair<X, Y>> {
        private final X a, b;
        private final Function<? super X, ? extends Y> f;
        private final Function<X, X> inc;

        public FunSeq(X a, X b, Function<? super X, ? extends Y> f, Function<X, X> inc) {
            this.a = a;
            this.b = b;
            this.f = f;
            this.inc = inc;
        }

        @Override
        public Iterator<Pair<X, Y>> iterator() {
            return new Iterator<Pair<X, Y>>() {
                private X x = a;
                @Override
                public boolean hasNext() {
                    return x.compareTo(b) <= 0;
                }

                @Override
                public Pair<X, Y> next() {
                    Pair<X, Y> p = new Pair<>(x, f.apply(x));
                    inc.apply(x);
                    return p;
                }
            };
        }

        static void test1(){
            for (Pair<Double, Double> p : new FunSeq<>(-2., 2., (x) -> x * x - 2 * x + 1, (x) -> x + 0.1)){
                final double x = p.first, y = p.second;
                System.out.printf("f(%g) = %g\n", x, y);
            }
        }

        public static void test2() {
            for (Pair<Double, Integer> p : new FunSeq<>(-2., 2., (x) -> (int) (x * x - 2 * x + 1), (x) -> x + 0.1)) {
                final double x = p.first;
                final int y = p.second;
                System.out.printf("f(%g) = %d\n", x, y);
            }
        }
    }*/

        /*  public Iterator<Pair<X, Y>> iterator(){
            return new Iterator<Pair<X, Y>>(){
                X k = a;
                @Override
                public boolean hasNext(){
                    return k.compareTo(b) <= 0;
                }

                @Override
                public Pair<X, Y> next(){
                    Pair<X, Y> p = new Pair<>(k, f.apply(k));
                    k = inc.apply(k);
                    return p;
                }
            };
        }
    }

    public class Pair<X, Y>{
        private final X first;
        private final Y second;

        public Pair(X first, Y second){
            this.first = first;
            this.second = second;
        }
    }

    public  void main(String[] args) {
        FunSeq<Double, Double> parabola = new FunSeq<>(-2., 2., (x)->x*x+2*x-1, (x)->x+0.1);
        FunSeq<Double, Integer> parabola2 = new FunSeq<>(-2., 2., (x)->(int)(x*x+2*x-1), (x)->x+0.1);
    }*/
}
