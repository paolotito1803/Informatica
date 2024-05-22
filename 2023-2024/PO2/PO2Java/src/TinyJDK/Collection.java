package TinyJDK;


public interface Collection<T> extends Iterable<T> {
    void add(T x);

    default void addAll(Collection<T> c){
        Iterator<T> it = c.iterator();
        while(it.hasNext()){
            c.add(it.next());
        }
    }

    void clear();

    default boolean contains(T x){
        Iterator<T> it = iterator();
        while(it.hasNext()){
        T o = it.next();
        if(o.equals(x))
            return true;
        }
        return false;
    }

    boolean isEmpty();

    void remove(T x);

    int size();
}
