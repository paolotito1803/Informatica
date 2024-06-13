package Esercizi_Esame.Esame_2019_6_20;

import java.awt.*;
import java.util.*;
import java.util.List;

public class Es1 {
    public interface Equatable<T> {
        boolean equalsTo(T x);
    }

    public static class Person<P extends Person<P>> implements Equatable<P> {
        public final String name;
        public final int age;

        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o)
                return true;
            if (o == null)
                return false;
            if (o.getClass() != this.getClass())
                return false;
            return equalsTo((P) o);
        }

        @Override
        public boolean equalsTo(P other) {
            if (this.name.equals(other.name) && this.age == other.age)
                return true;
            return false;
        }

        @Override
        public String toString() {
            return name;
        }
    }

    public static class Artist extends Person<Artist> {
        public final Hair hair;
        public Artist(String name, int age, Hair hair) {
            super(name, age);
            this.hair = hair;
        }
        @Override
        public boolean equalsTo(Artist other) {
            return super.equalsTo(other) && hair.equalsTo(other.hair);
        }
    }
    public class Hair implements Equatable<Hair> {
        public final int length;
        public final Set<Color> colors;
        public Hair(int length, Set<Color> colors) {
            this.colors = colors;
            this.length = length;
        }
        @Override
        public boolean equals(Object o) {
            if(this == o)
                return true;
            if(o == null)
                return false;
            if(o.getClass() != this.getClass())
                return false;
            return equalsTo((Hair) o);
        }
        @Override
        public boolean equalsTo(Hair x) {
            return this.length == x.length && this.colors.equals(x.colors);
        }
    }

    public enum Color {
        BROWN, DARK, BLONDE, RED, GRAY;
    }

    public void main(String[] args) {

        Person alice = new Person("Alice", 23),
                david = new Artist("Bowie", 69, new Hair(75, Set.of(Color.RED, Color.BROWN, Color.GRAY)));
        Artist morgan = new Artist("Morgan", 47, new Hair(20, Set.of(Color.GRAY, Color.DARK))),
                madonna = new Artist("Madonna", 60, new Hair(50, Set.of(Color.BLONDE)));
        List<Artist> artists = Arrays.asList((Artist) david, morgan, madonna);
        List<Person> persons = Arrays.asList(alice, david, morgan, madonna);

        Artist a = Collections.max(artists, new Comparator<Artist>(){
           @Override
           public int compare(Artist a1, Artist a2){
               return a1.hair.length * a1.hair.colors.size() - a2.hair.length * a2.hair.colors.size();
           }
        });

        Person p = Collections.max(persons, new Comparator<Person>(){
           @Override
           public int compare(Person p1, Person p2){
               return p1.name.compareTo(p2.name);
           }
        });


    }
}
