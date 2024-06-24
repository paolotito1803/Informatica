package TinyJDK;

public interface Iterable<T> { // T in questo caso è un type_parameter-> perchè lo introduco per la prima volta nella classe
    Iterator<T> iterator(); //  T qui invece è un type argument perchè l'ho già introdotto a riga 3
}
