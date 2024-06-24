package TinyJDK;

public interface Comparable<T> {
    int compareTo(T x);  //this si confronto con uno come lui, ritorna in perchè se sono uguli ritorno 0
                          // se primo minore di secondo ritorno  >0
                          // se primo maggiore di secondo ritorno <0
}
