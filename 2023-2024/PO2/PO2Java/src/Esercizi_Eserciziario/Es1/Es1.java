package Esercizi_Eserciziario.Es1;

import java.util.*;
import java.util.function.Function;

public class Es1 {
    public static class Point{
        public final double x, y, z;
        public Point(double x, double y, double z){
            this.x = x;
            this.y = y;
            this.z = z;
        }

        public Point move(double dx, double dy, double dz){
            return new Point(x + dx, y + dy, z + dz);
        }
    }

    public interface Solid extends Comparable<Solid> {
        double area();
        double volume();
        PositionedSolid at(Point origin);
        static <S extends Solid> int compareBy(Function<S, Double> f, S s1, S s2) {
            return Double.compare(f.apply(s1), f.apply(s2));
        }
        static <S extends Solid> Comparator<S> comparatorBy(Function<S, Double> f) {
            return (s1, s2) -> compareBy(f, s1, s2);
        }
        default int compareTo(Solid s) {
            return compareBy((x) -> x.volume(), this, s);
        }
    }
    public interface Polyhedron extends Solid {
        double perimeter();
        @Override
        PositionedPolyhedron at(Point origin);
    }
    public interface PositionedSolid {

        Point origin();
    }
    public interface PositionedPolyhedron extends PositionedSolid, Iterable<Point> {}


    public class Cube implements Polyhedron {
        private double side; // lato del cubo

        Cube(double side){
            this.side = side;
        }

        @Override
        public double perimeter(){
            return side * 12;
        }

        @Override
        public double area() {
            return side * side * 6;
        }

        @Override
        public double volume() {
            return side * side * side;
        }

        @Override
        public PositionedPolyhedron at(Point origin) {
            return new PositionedPolyhedron() {
                @Override
                public Point origin() {
                    return origin;
                }

                @Override
                public Iterator<Point> iterator() {
                    final Point u = origin.move(side, side, side);
                    final Point[] ps = new Point[]{
                            origin, origin.move(side, 0., 0.), origin.move(0., side, 0.), origin.move(0., 0., side),
                            u, u.move(side, 0., 0.), u.move(0., side, 0.), u.move(0., 0., side),
                    };
                    return Arrays.asList(ps).iterator();
                }
            };
        }
    }

    public static class Sphere implements Solid {
        private double ray; // raggio della sfera
        public Sphere(double ray){
            this.ray = ray;
        }

        @Override
        public double area() {
            return 4 * Math.PI * ray * ray;
        }

        @Override
        public double volume() {
            return 4/3 * Math.PI * ray * ray * ray;
        }

        @Override
        public PositionedSolid at(Point origin) {
            return new PositionedSolid (){
                @Override
                public Point origin(){
                    return origin;
                }

            };
        }
    }
    public  void main(String[] args) {
        Cube cube1 = new Cube(11.), cube2 = new Cube(23.);
        Sphere sphere1 = new Sphere(12.), sphere2 = new Sphere(35.);
        List<Solid> solids = List.of(cube1, cube2, sphere1, sphere2);
        List<Cube> cubes = List.of(cube1, cube2);
        List<Sphere> spheres = List.of(sphere1, sphere2);
        List<? extends Polyhedron> polys = cubes;

        Collections.sort(cubes);
        Collections.sort(spheres, Solid.comparatorBy(Sphere::area));

        Comparator<Cube> cmpCube = Solid.comparatorBy(Cube::perimeter);
        Comparator<Solid> cmpSolid = Solid.comparatorBy(Solid::area);
        //Comparator<Sphere> cmpSphere = Solid.comparatorBy(Sphere::perimeter);   // non compila
        //Comparator<Solid> cmpSolid2 = Solid.comparatorBy(Cube::area);           // non compila
        Comparator<Polyhedron> cmpPoly = Solid.comparatorBy(Polyhedron::volume);
        Comparator<Sphere> cmpSphere2 = Solid.comparatorBy(Solid::area);
        Comparator<Polyhedron> cmpPoly2 = Solid.comparatorBy(Solid::volume);
        Comparator<Cube> cmpCube2 = Solid.comparatorBy(Polyhedron::perimeter);

        //Collections.sort(solids, cmpCube2);     // non compila
        Collections.sort(cubes, cmpSolid);
        Collections.sort(spheres, cmpSphere2);
        //Collections.sort(solids, cmpPoly2);     // non compila
        //Collections.sort(cubes, cmpSolid2);
        Collections.sort(cubes, cmpPoly);
        //Collections.sort(spheres, cmpPoly2);    // non compila
        Collections.sort(polys, cmpSolid);

        Point p = new Point(1., -1.5, 2.);
        for(Polyhedron poly : polys){
            for(Point q : poly.at(p))
            System.out.println(q);
        }
    }
}
