package Tutorato.Lezione_1;

import java.util.Arrays;
import java.util.Iterator;

public class Esercizio_Esame_30_1_20 {
    // 1
    public static class Point {
        public final double x, y, z;

        public Point(double x, double y, double z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        public Point move(double dx, double dy, double dz) {
            return new Point(x + dx, y + dy, z + dz);
        }

    }

    // 2
    public interface Solid {
        double area();
        double volume();
        PositionedSolid at(Point origin);
    }

    public interface PositionedSolid {
        Point origin();
    }

    public interface Polyhedron extends Solid {
        double perimeter();
        // 2.a: questo override specializza il tipo di ritono in maniera co-variante
        @Override
        PositionedPolyhedron at(Point origin);
    }

    public interface PositionedPolyhedron extends PositionedSolid, Iterable<Point> {

    }

    // 3
    public static class Cube implements Polyhedron {
        private double side;    // lato del cubo

        public Cube(double side) {
            this.side = side;
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
        public double perimeter() {
            return side * 12;
        }

        @Override
        public PositionedPolyhedron at(Point o) {
            // 3.a: questa anonymous class NON può essere scritta come una lambda perché ha 2 metodi
            return new PositionedPolyhedron() {
                @Override
                public Point origin() {
                    return o;
                }

                @Override
                public Iterator<Point> iterator() {
                    final Point u = o.move(side, side, side);
                    final Point[] ps = new Point[]{
                            o, o.move(side, 0., 0.), o.move(0., side, 0.), o.move(0., 0., side),
                            u, u.move(side, 0., 0.), u.move(0., side, 0.), u.move(0., 0., side),
                    };
                    return Arrays.asList(ps).iterator();
                }
            };
        }

    }

    // 4
    public static class Sphere implements Solid {
        private double ray;     // raggio della sfera

        public Sphere(double ray) {
            this.ray = ray;
        }

        @Override
        public double area() {
            return 4. * Math.PI * ray * ray;
        }

        @Override
        public double volume() {
            return 4. / 3. * Math.PI * ray * ray * ray;
        }

        @Override
        public PositionedSolid at(Point o) {
            // questa anonymous class potrebbe essere scritta una come una lambda invece, perché ha 1 metodo solo:
            // return () -> o;
            return new PositionedSolid() {
                @Override
                public Point origin() {
                    return o;
                }
            };
        }
    }

}
