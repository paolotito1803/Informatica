package Esercizi_Eserciziario.Es8;

import java.util.Collection;
import java.util.Iterator;

public class Es8 {
    public interface Comparable<T>{
        public int compareTo(T o);
    }

    public static <A extends Comparable<B>, B> int compareMany(Collection<A> a, Collection<B> b){
        //devo scorrere a quindi devo avere l'iteratore di a
        Iterator<A> ia = a.iterator();
        //devo scorrere b quindi mi serve l'iteratore di b
        Iterator<B> ib = b.iterator();

        //scorro le due collection
        while(ia.hasNext() && ib.hasNext()){
            A x = ia.next();
            B y = ib.next();
            if(x.compareTo(y) != 0) break;
            else if(ia.hasNext() == true && ib.hasNext() == false)
                return 1;
            else if(ia.hasNext() == false && ib.hasNext() == true)
                return -1;
        }
        return 0;
    }
}
