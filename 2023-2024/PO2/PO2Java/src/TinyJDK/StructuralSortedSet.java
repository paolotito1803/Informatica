package TinyJDK;

import java.util.Arrays;
import java.util.Comparator;

public class StructuralSortedSet<T extends Comparable<T>>
        extends StructuralSet<T>
        implements SortedSet<T> {

    @Override
    public void add(T x) {
        super.add(x);
        sort();
    }

    // static <T extends Comparable<T>> void sort(List<T> l);
    //static <T> void sort(T[] a, Comparator<? super T> c) {}
    private void sort() {
        T[] src = (T[]) a;
        Arrays.sort(src, 0, size(), new Comparator<T>() { //uso anonumus class in modo da fare i confronti
                    @Override
                    public int compare(T o1, T o2) {
                        return o1.compareTo(o2);
                    }
                });
    }

    //abbozzo un metodo di sort senza usare quello del vero jdk
    /*private void sort_mio(){
        T[] a = (T[]) this.a;
        while(){
            int i = 0;
            if(a[i].compareTo(a[i + 1]) > 0){
                T tmp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = tmp;
            }
        }
    }*/

    @Override
    public T first() {
        if(a[0] == null) throw new RuntimeException();
       return (T) a[0];
    }

    @Override
    public T last() {
        if(isEmpty()) throw new RuntimeException();
        return (T) a[size() - 1];
    }
}
