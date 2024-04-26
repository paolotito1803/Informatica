package TinyJDK;

public interface SortedSet<T extends Comparable<T>> extends Set<T>{
    T first(); //ritorna il primo elemneto -> il primo

    T last(); //ritorna l'elemento più grande -> l'ultimo
}
