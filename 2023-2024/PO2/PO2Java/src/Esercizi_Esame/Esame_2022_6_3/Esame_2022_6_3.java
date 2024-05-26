package Esercizi_Esame.Esame_2022_6_3;

import java.util.Iterator;
import java.util.List;
import java.util.function.BiFunction;
import java.util.function.Function;

public class Esame_2022_6_3 {
    public static <T, State> State fold(Iterable<T> i, final State st0, BiFunction<State, T, State> f) {
        State st = st0;
        for (final T e : i)
            st = f.apply(st, e);
        return st;
    }

    public static <T> double sumBy(Iterable<T> i, Function<T, Double> f){
        return fold(i, 0., (a, k)-> a + f.apply(k));
    }

    public static <T> int compareBy(T s1, T s2, Function<T, Double> f){
        Double s11 = f.apply(s1);
        Double s22 = f.apply(s2);
        return Double.compare(s11, s22);

        //return Double.compare(f.apply(s1), f.apply(s2)); //serve per comparare tra double usando il metodo compare
    }

    public static class Edge implements Comparable<Edge> {
        private final double len;

        public Edge(double len) { this.len = len; }

        public double length() { return len; }

        @Override
        public int compareTo(Edge s) {
            return compareBy(this, s , Edge::length);
        }
    }

    public interface Surface extends Comparable<Surface> {
        double area();
        double perimiter();

        @Override
        default int compareTo(Surface s) {
            return compareBy(this, s, Surface::area);
        }
    }

    public interface Polygon extends Surface, Iterable<Edge> {
        @Override
        default double perimiter() {
            return sumBy(this, Edge::length);
        }
    }

    public interface Solid extends Comparable<Solid> {
        double outerArea(); // area laterale totale
        double volume();
        @Override
        default int compareTo(Solid s) {
            return compareBy(this, s, Solid::volume);
        }
    }

    public interface Polyhedron<P extends Polygon> extends Solid, Iterable<P> {
        @Override
        default double outerArea() {
            return sumBy(this, P::area);
        }
    }

    public static class Sphere implements Solid{
        private final double raggio;

        public Sphere(double r){
            this.raggio = r;
        }

        @Override
        public double outerArea(){
            return 4. * Math.PI * raggio * raggio;
        }

        @Override
        public double volume(){
            return (4. / 3.) * Math.PI * raggio * raggio * raggio;
        }
    }

    public static class Cilinder implements Solid{
        private final double raggio;
        private final double altezza;

        public Cilinder(double r, double h){
            this.raggio = r;
            this.altezza = h;
        }

        @Override
        public double outerArea(){
            return (2. * Math.PI * raggio * raggio) + (2. * Math.PI * altezza * raggio);
        }

        @Override
        public double volume(){
            return Math.PI * raggio * raggio * altezza;
        }
    }

    public static class Rectangle implements Polygon{
        public final double base;
        public final double altezza;

        public Rectangle(double b, double h){
            this.base = b;
            this.altezza = h;
        }

        @Override
        public double area(){
            return base * altezza;
        }

        @Override
        public Iterator<Edge> iterator(){
            Edge w = new Edge(base), h = new Edge(altezza);
            return List.of(w, h, w, h).iterator();
        }
    }

    public static class Square extends Rectangle{
        private final double l;

        public Square(double l, double base, double altezza){
            super(base, altezza);
            this.l = l;
        }
    }

    public static class Parallelepiped implements Polyhedron<Rectangle> {
        protected final double width, height, depth;
        public Parallelepiped(double width, double height, double depth) {
            this.width = width;
            this.height = height;
            this.depth = depth;
        }
        @Override
        public double volume() {
            return width * height * depth;
        }
        @Override
        public Iterator<Rectangle> iterator() {
            Rectangle r1 = new Rectangle(width, height),
                    r2 = new Rectangle(width, depth),
                    r3 = new Rectangle(height, depth);
            return List.of(r1, r2, r3, r1, r2, r3).iterator();
        }
    }

    public static class Cube extends Parallelepiped{
        public Cube(double s){
            super(s, s, s);
        }
    }

}
