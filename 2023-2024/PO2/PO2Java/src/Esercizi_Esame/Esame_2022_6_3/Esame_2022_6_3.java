package Esercizi_Esame.Esame_2022_6_3;

import java.util.ArrayList;
import java.util.Collections;
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

    public static <T> double sumBy(Iterable<T> i, Function<T, Double> f) {
        return fold(i, 0., (res, x) -> res + f.apply(x));
    }

    public static <T> int compareBy(T s1, T s2, Function<T, Double> f) {
        Double s11 = f.apply(s1);
        Double s22 = f.apply(s2);
        return s11.compareTo(s22);
    }

    public class Edge implements Comparable<Edge> {
        private final double len;

        public Edge(double len) {
            this.len = len;
        }

        public double length() {
            return len;
        }

        @Override
        public int compareTo(Edge s) {
            return compareBy(this, s, (l) -> length());
        }
    }

    public interface Surface extends Comparable<Surface> {
        double area();

        double perimiter();

        @Override
        default int compareTo(Surface s) {
            return compareBy(this, s, (a) -> area());
        }
    }

    public interface Polygon extends Surface, Iterable<Edge> {
        @Override
        default double perimiter() {
            return sumBy(this, (res) -> res.length());
        }
    }

    public interface Solid extends Comparable<Solid> {
        double outerArea(); // area laterale totale

        double volume();

        @Override
        default int compareTo(Solid s) {
            return compareBy(this, s, (v) -> volume());
        }
    }

    public interface Polyhedron<P extends Polygon> extends Solid, Iterable<P> {
        @Override
        default double outerArea() {
            return sumBy(this, (res) -> res.area());
        }
    }

    public class Sphere implements Solid {
        private final double r;

        public Sphere(double r) {
            this.r = r;
        }

        @Override
        public double outerArea() {
            return 4. * Math.PI * r * r;
        }

        @Override
        public double volume() {
            return 4. / 3. * Math.PI * r * r * r;
        }
    }

    public class Cilinder implements Solid {
        private final double r, h;

        public Cilinder(double r, double h) {
            this.r = r;
            this.h = h;
        }

        @Override
        public double outerArea() {
            return (2. * Math.PI * r) + (Math.PI * r * r);
        }

        @Override
        public double volume() {
            return Math.PI * r * r * h * 2;
        }
    }

    public class Rectangle implements Polygon {
        private final double ba, ha;

        public Rectangle(double b, double h) {
            this.ba = b;
            this.ha = h;
        }

        @Override
        public double area() {
            return ba * ha;
        }

        @Override
        public Iterator<Edge> iterator() {
            ArrayList<Edge> p = new ArrayList<>();
            Edge b = new Edge(ba);
            Edge h = new Edge(ha);
            p.add(b);
            p.add(h);
            p.add(h);
            p.add(b);
            return p.iterator();
        }
    }    public class Square extends Rectangle{
        private double l;
        public Square(double l){
            super(l, l);
        }
    }
    public class Parallelepiped implements Polyhedron<Rectangle> {
        protected final double width, height, depth;
        public Parallelepiped(double width, double height, double depth) {
            this.width = width;
            this.height = height;
            this.depth = depth;
        }
        @Override
        public double volume() { return depth * width * height; }
        @Override
        public Iterator<Rectangle> iterator() {
            Rectangle r1 = new Rectangle(width, height),
                    r2 = new Rectangle(width, depth),
                    r3 = new Rectangle(height, depth);
            return List.of(r1, r2, r3, r1, r2, r3).iterator();
        }
    }
    public class Cube extends Parallelepiped{
        private double l;
        public Cube(double l){super(l, l, l);}
    }
    public  void main(String[] args) {
        // 4.d
        {
            int facet_cnt = 1;
            // questo foreach non compila perché Cube è sottotipo di Iterable<Rectangle>, non di Iterable<Square>
            // si badi che NON è possibile co-variare il tipo di ritorno del metodo iterator() di Cube in modo che si specializzi in Iterator<Square>
            // perché è sound co-variare il tipo più esterno di un tipo parametrico, ma non il type argument
            // for (Square sq : new Cube(10.)) {
            for (Rectangle sq : new Cube(10.)) {  // così invece compilerebbe
                int side_cnt = 1;
                for (Edge e : sq) {
                    System.out.printf("side #%d/%d = %f\n", side_cnt++, facet_cnt, e.length());
                }
                ++facet_cnt;
            }
        }

        // 5
        {
            Cube c1 = new Cube(1.), c2 = new Cube(2.);
            Parallelepiped p1 = new Parallelepiped(1., 2., 3.), p2 = new Parallelepiped(2., 3., 4.);
            List<Polyhedron<? extends Rectangle>> polys = new ArrayList<>(List.of(c1, c2, p1, p2));

            // per testare rapidamente i risultati di queste sort, si usi debugger
            Collections.sort(polys);                                                            // c1
            Collections.sort(polys, (x, y) -> compareBy(x, y, Polyhedron::outerArea));          // c1
            Collections.sort(polys, (x, y) -> compareBy(x, y, (p) -> p.outerArea()));           // c1
//            Collections.sort(polys, (x, y) -> compareBy(x, y, (r) -> r.perimiter()));         // non compila
            Collections.sort(polys, (x, y) -> compareBy(x, y, new Function<>() {                // c1
                @Override
                public Double apply(Polyhedron<? extends Rectangle> r) {
                    return r.volume();
                }
            }));
           // Collections.sort(polys, (x, y) -> Double.compare(sumBy(x, Square::perimiter),     // non compila
             //                                                sumBy(y, Rectangle::perimiter)));
        }
    }

   /* public static <T, State> State fold(Iterable<T> i, final State st0, BiFunction<State, T, State> f) {
        State st = st0;
        for (final T e : i)
            st = f.apply(st, e);
        return st;
    }

    public static <T> double sumBy(Iterable<T> i, Function<T, Double> f){
        return fold(i, 0., (s, x)->s + f.apply(x));
    }

    public static <T> int compareBy(T s1, T s2, Function<T, Double> f){
        Double s11 = f.apply(s1);
        Double s22 = f.apply(s2);
        return s11.compareTo(s22);
    }

    public static class Edge implements Comparable<Edge> {
        private final double len;
        public Edge(double len) { this.len = len; }
        public double length() { return len; }
        @Override
        public int compareTo(Edge s) {
            return compareBy(this, s, (len)->length());
        }
    }

    public interface Surface extends Comparable<Surface> {
        double area();
        double perimiter();
        @Override
        default int compareTo(Surface s) {
            return compareBy(this,s, (res)->area());
        }
    }

    public interface Polygon extends Surface, Iterable<Edge> {
        @Override
        default double perimiter() {
            return sumBy(this, (res)->res.length());
        }
    }

    public interface Solid extends Comparable<Solid> {
        double outerArea(); // area laterale totale
        double volume();
        @Override
        default int compareTo(Solid s) {
            return compareBy(this, s, (res)->volume());
        }
    }

    public interface Polyhedron<P extends Polygon> extends Solid, Iterable<P> {
        @Override
        default double outerArea() {
            return sumBy(this, (res)->res.area());
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
            return (4./3.) * Math.PI * raggio * raggio * raggio;
        }
    }

    public static class Rectangle implements Polygon{
        private final double base;
        private final double altezza;
        Rectangle(double b, double h){
            this.base = b;
            this.altezza = h;
        }

        @Override
        public double area(){
            return base * altezza;
        }


        @Override
        public Iterator<Edge> iterator() {
            Edge b = new Edge(base);
            Edge h = new Edge(altezza);
            ArrayList<Edge> p = new ArrayList<>();
            p.add(b);
            p.add(h);
            p.add(h);
            p.add(b);
            return p.iterator();

        }
    }

    public static class Cilinder implements Solid{
        private final double r;
        private final double h;
        public Cilinder(double r, double h){
            this.r = r;
            this.h = h;
        }

        @Override
        public double outerArea(){
            return 2. * (r * r * Math.PI) + (r * h * Math.PI);
        }

        @Override
        public double volume(){
            return 2. * r * r * h * Math.PI;
        }
    }

    public static class Square extends Rectangle{
        private double l;
        public Square(double l){
            super(l, l);
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
        private double l;
        Cube(double l){
            super(l, l, l);
        }
    }*/

    /* public static <T, State> State fold(Iterable<T> i, final State st0, BiFunction<State*//*1 pram*//*, T*//*2 param*//*, State*//*ret type*//*> f) {
        State st = st0;
        for (final T e : i)
            st = f.apply(st, e);
        return st;
    }

    public static <T> double sumBy(Iterable<T> i, Function<T, Double> f){
        return fold(i, 0.,
                (pippo*//*variabile a cui viene assegnato il valore della lamda*//*, t*//*parametro da convertire*//*)->pippo + f.apply(t));
    }

    public static <T> int compareBy(T s1, T s2, Function<T, Double> f){
        Double s1d, s2d;
        s1d = f.apply(s1);
        s2d = f.apply(s2);
        int res = s1d.compareTo(s2d);
        return res;
    }

    public static class Edge implements Comparable<Edge> {
        private final double len;
        public Edge(double len) { this.len = len; }
        public double length() { return len; }
        @Override
        public int compareTo(Edge s) {
            return compareBy(this, s, (res)->length()); //ritorno su una variabile double il valore della length
        }
    }

    public interface Surface extends Comparable<Surface> {
        double area();
        double perimiter();
        @Override
        default int compareTo(Surface s) {
            return compareBy(this, s, (res)->area());
        }
    }

    public interface Polygon extends Surface, Iterable<Edge> {
        @Override
        default double perimiter() {
            return sumBy(this, (res)->res.length());
        }
    }

    public interface Solid extends Comparable<Solid> {
        double outerArea(); // area laterale totale
        double volume();
        @Override
        default int compareTo(Solid s) {
            return compareBy(this, s, (res)->volume());
        }
    }

    public interface Polyhedron<P extends Polygon> extends Solid, Iterable<P> {
        @Override
        default double outerArea() {
            return sumBy(this,(res)->res.area());
        }
    }

    public static class Sphere implements Solid{
        final double r;

        Sphere(double r){
            this.r = r;
        }

        @Override
        public double outerArea(){
            return 4. * r * r * Math.PI;
        }

        @Override
        public double volume(){
            return (4./3.) * r * r * r * Math.PI;
        }
    }

    public static class Cilinder implements Solid{
        final double r, h;

        Cilinder(double r, double h){
            this.r = r;
            this.h = h;
        }

        @Override
        public double outerArea(){
            return 2. * (r * r * Math.PI) + (r * h * Math.PI);
        }

        @Override
        public double volume(){
            return 2. * r * r * h * Math.PI;
        }
    }

    public static class Rectangle implements Polygon{
        final double b, h;
        Rectangle(double b, double h){
            this.b = b;
            this.h = h;
        }

        @Override
        public double area(){
            return b * h;
        }


        @Override
        public Iterator<Edge> iterator() {
            Edge w = new Edge(b), h = new Edge(b);
            return List.of(w, h, w, h).iterator();
        }
    }

    public static class Square extends Rectangle{
        Square(double l){
            super(l, l);
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
            return width * height  * depth;
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
        Cube(double l){
            super(l, l, l);
        }
    }


    public static void main(String[] args) {
        // 4.d
        {
            int facet_cnt = 1;
            // questo foreach non compila perché Cube è sottotipo di Iterable<Rectangle>, non di Iterable<Square>
            // si badi che NON è possibile co-variare il tipo di ritorno del metodo iterator() di Cube in modo che si specializzi in Iterator<Square>
            // perché è sound co-variare il tipo più esterno di un tipo parametrico, ma non il type argument
            // for (Square sq : new Cube(10.)) {
            for (Rectangle sq : new Cube(10.)) {  // così invece compilerebbe
                int side_cnt = 1;
                for (Edge e : sq) {
                    System.out.printf("side #%d/%d = %f\n", side_cnt++, facet_cnt, e.length());
                }
                ++facet_cnt;
            }
        }

        // 5
        {
            Cube c1 = new Cube(1.), c2 = new Cube(2.);
            Parallelepiped p1 = new Parallelepiped(1., 2., 3.), p2 = new Parallelepiped(2., 3., 4.);
            List<Polyhedron<? extends Rectangle>> polys = new ArrayList<>(List.of(c1, c2, p1, p2));

            // per testare rapidamente i risultati di queste sort, si usi debugger
            Collections.sort(polys);                                                            // c1
            Collections.sort(polys, (x, y) -> compareBy(x, y, Polyhedron::outerArea));          // c1
            Collections.sort(polys, (x, y) -> compareBy(x, y, (p) -> p.outerArea()));           // c1
//            Collections.sort(polys, (x, y) -> compareBy(x, y, (r) -> r.perimiter()));         // non compila
            Collections.sort(polys, (x, y) -> compareBy(x, y, new Function<>() {                // c1
                @Override
                public Double apply(Polyhedron<? extends Rectangle> r) {
                    return r.volume();
                }
            }));
//          Collections.sort(polys, (x, y) -> Double.compare(sumBy(x, Square::perimiter),     // non compila
//                                                             sumBy(y, Rectangle::perimiter)));
        }
    }*/

    /*public static <T> double sumBy(Iterable<T> i, Function<T, Double> f){
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
*/
}
