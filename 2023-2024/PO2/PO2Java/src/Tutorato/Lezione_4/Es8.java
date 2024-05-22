package Tutorato.Lezione_4;

import TinyJDK.Collection;
import TinyJDK.Iterator;

public class Es8 {
    //interfaccia per poter comparaare i vari oggetti tra di loro tramite il metodo CompareTo
    /*
    fa il confronto a 3 VIE:
    - = 0 se gli elementi sono uguali
    - > 0 se il primo è maggiore del secondo
    - < 0 se il secondo è maggiore del primo
     */
    public interface Comparable<T>{
        public int compareTo(T o);
    }

    public static <A extends Comparable<B>, B> int compareMany(Collection<A> col1, Collection<B> col2){
        //creo i due iteratori delle collection per scorrerle
        Iterator<A> it = col1.iterator();
        Iterator<B> it2  = col2.iterator();
        int res = 0;
        //scorro finchè non finisco le liste
        while(it.hasNext() && it2.hasNext()){
            A x = it.next();
            B y = it2.next();
            res = x.compareTo(y);
            if(res != 0)
                break; //esco perchè i due elementi non sono uguali oppure posso fare returnn res
            else{
                if(it.hasNext() == true && it2.hasNext() == false)
                    return 1;
                else if(it.hasNext() == false && it2.hasNext() == true)
                    return -1;
                else
                    return 0;
            }
        }
        return res;
    }
}
