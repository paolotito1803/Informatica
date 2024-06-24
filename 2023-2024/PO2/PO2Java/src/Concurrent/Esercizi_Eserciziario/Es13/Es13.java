package Esercizi_Eserciziario.Es13;

import java.util.List;

import static java.util.Collections.max;

public class Es13 {
    public static class Geometry {
        public static class Point {
            public final double x, y;

            public Point(double x, double y) {
                this.x = x;
                this.y = y;
            }
        }

        public static abstract class Line<S extends Line<S>> implements Comparable<S> {
            public abstract double length();

            @Override
            public int compareTo(S l) {
                return Double.compare(length(), l.length());
            }
        }

        public static class Segment extends Line<Segment> {
            private Point p1, p2;

            public Segment(Point p1, Point p2) {
                this.p1 = p1;
                this.p2 = p2;
            }

            @Override
            public double length() {
                return Math.sqrt(Math.pow(p1.x - p2.x, 2.) + Math.pow(p1.y - p2.y, 2.));
            }
        }

        public static class Polyline extends Line<Polyline> {
            private List<? extends Point> points;

            public Polyline(List<? extends Point> points) {
                this.points = points;
            }

            @Override
            public double length() {
                double res = 0;
                for (int i = 0; i < points.size(); i++) {
                    res += new Segment(points.get(i), points.get(i + 1)).length();
                }
                return res;
            }
        }

        public static class Point3D extends Point{
            private final double z;

            public Point3D(double x, double y, double z) {
                super(x, y);
                this.z = z;
            }
        }

        public static void main(String[] args) {
            Point a = new Point3D(0., 0., 0.),
                    b = new Point3D(1., 1., 1.),
                    c = new Point3D(2., 0., 3.);
            Polyline abc = new Polyline(List.of(a, b, c)),
                    bac = new Polyline(List.of(b, a, c));
            System.out.println(String.format("max length = %g", max(abc, bac).length()));
        }

        public static <T extends Comparable<T>> T max(T a, T b){
            if(a.compareTo(b) > 0)
                return a;
            else
                return b;
        }
    }
}
