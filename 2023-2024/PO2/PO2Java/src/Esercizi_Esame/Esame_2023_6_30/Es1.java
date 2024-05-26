package Esercizi_Esame.Esame_2023_6_30;

import java.util.Iterator;
import java.util.function.Function;
public class Es1 {
    public static class Pair<A, B>{
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
    }
}
