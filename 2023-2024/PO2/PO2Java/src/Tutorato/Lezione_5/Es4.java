package Tutorato.Lezione_5;

import java.util.Set;

public class Es4 {
    public interface Equatable<T>{
        boolean equalsTo(T x);
    }

    public static class Person<P extends Person<P>> implements Equatable<P>{
        public final String name;
        public final int age;

        public Person(String name, int age){
            this.name = name;
            this.age = age;
        }

        @Override
        public boolean equals(Object o){ // non posso specializzare il parametro perchè altrimenti non è più un override questo però la rende "unsafe"
            if(o == null)
                return false;
            if(o == this)
                return true;
            if(this.getClass() != o.getClass()) //devo ritornare se sono dello stesso tipo o meno
                return false;
            else
                return this.equalsTo((P)o);
        }

        @Override
        public boolean equalsTo(P other){
            return this.name.equals(other.name) && this.age == other.age;
        }

        @Override
        public String toString(){
            return name;
        }
    }

    public static class Artist extends Person<Artist>{
        public final Hair hair;

        public Artist(String name, int age, Hair hair){
            super(name,age);
            this.hair = hair;
        }

        @Override
        public boolean equalsTo(Artist other){
            return super.equalsTo(other) && this.hair.equals(other.hair);
        }
    }

    public static class Hair implements Equatable<Hair> {
        public final int length;
        public final Set<Color> colors;
        public Hair(int length, Set<Color> colors) {
            this.colors = colors;
            this.length = length;
        }

        @Override
        public boolean equals(Object o) {
            if(o == null)
                return false;
            else if(o == this)
                return true;
            else if(o.getClass() != getClass())
                return false;
            else
                return this.equalsTo((Hair)o);
        }

        @Override
        public boolean equalsTo(Hair x) {
            return this.length == x.length && x.colors.equals(this.colors);
        }
    }

    public enum Color {
        BROWN, DARK, BLONDE, RED, GRAY;
    }

    public static void main(String[] args) {
        Person alice = new Person("Alice", 23),
                david = new Artist("Bowie", 69, new Hair(75, Set.of(Color.RED, Color.BROWN, Color.GRAY)));
        Artist morgan = new Artist("Morgan", 47, new Hair(20, Set.of(Color.GRAY, Color.DARK))),
                madonna = new Artist("Madonna", 60, new Hair(50, Set.of(Color.BLONDE)));

        System.out.println(alice.equals(null));
        System.out.println(alice.equals(alice));
        System.out.println(alice.equals(david));
        System.out.println(alice.equalsTo(morgan));
        System.out.println(morgan.equals(morgan));
        System.out.println(morgan.equals(madonna));
        System.out.println(morgan.equals(david));
        System.out.println(david.equalsTo(morgan));
        System.out.println(madonna.equals(3));

        //null.equals(david);
        //morgan.equalsTo(david);
        //madonna.equalsTo("Madonna");
    }
}
