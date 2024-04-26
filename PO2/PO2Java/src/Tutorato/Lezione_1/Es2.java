package Tutorato.Lezione_1;

import java.util.Iterator;
import java.util.List;

public class Es2 {
    public static class Point {
        public final double x,y;

        public Point(double x, double y){
            this.x = x;
            this.y = y;
        }
    }

    public static class Line {
        private final Point p1,p2;

        public Line(Point p1, Point p2){
            this.p1 = p1;
            this.p2 = p2;
        }

        public double length(){
            return Math.sqrt(Math.pow(p1.x - p2.x,2) + Math.pow(p1.y - p2.y,2));
        }


    }

    public abstract class Polygon {
        protected final List<Point> points;

        protected Polygon(List<Point> points) {
            assert points.size() >= 3;
            this.points = points;
        }

        public Iterator<Line> lineIterator() {
            return new Iterator<Line>() {
                private final Iterator<Point> it = points.iterator(); // sfrutto l'iteratore dei point perchè uso una lista di punti
                private Point last = it.next(); // ritorna il primo punto presente nella lista

                @Override
                public boolean hasNext() {
                    return it.hasNext();
                }

                @Override
                public Line next() {
                    Point p = it.next();
                    Line r = new Line(last, p);
                    last = p;
                    return r;
                }
            };
        }

        public double perimeter() {
            Iterator<Line> lineIt = lineIterator();
            double p = 0;
            while (lineIt.hasNext()) {
                p += lineIt.next().length();
            }
            return p;
        }

        public abstract double area();
    }
}
