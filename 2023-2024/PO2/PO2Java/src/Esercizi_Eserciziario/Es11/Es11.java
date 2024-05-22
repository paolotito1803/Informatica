package Esercizi_Eserciziario.Es11;

/*
Si realizzi in Java un algoritmo che trova il minimo ed il massimo in una lista generica e restituisca i risultati,
rispettivamente, come primo e secondo elemento di una coppia omogenea.
(a) Si definisca un tipo per la coppia eterogenea, ovvero una classe Pair parametrica su due tipi distinti A e B
che rappresentano rispettivamente il tipo del primo e del secondo elemento della coppia.
(b) Si implementi un metodo statico e generico avente la seguente firma9
:
static <E> Pair<E, E> findMinAndMax(List<E> l, Comparator<E> c)
L’algoritmo di ricerca del minimo e del massimo deve eseguire una sola traversata della lista; si assuma che
gli argomenti siano non-nulli e che la lista abbia sempre almeno un elemento.
(c) Si definisca un metodo in overload con il precedente che non usi un Comparator ma aggiunga il constraint
Comparable al generic E, secondo la seguente firma:
static <E extends Comparable<E>> Pair<E, E> findMinAndMax(List<E> l)
Si implementi questo metodo in funzione del precedente, senza replicare l’algoritmo di ricerca.
 */

import java.util.Comparator;
import java.util.List;

public class Es11 {
    public static class Pair<A, B>{
        public A first;
        public B second;
        public Pair(A first, B second){
            this.first = first;
            this.second = second;
        }

        public static <E> Pair<E, E> findMinAndMax(List<E> l, Comparator<E> c){
            E min = l.get(0);
            E max = l.get(0);
            for(E el : l){
                if(c.compare(el, min) < 0)
                    min = el;
                else if(c.compare(el, max) > 0)
                    max = el;
            }
            return new Pair(min, max);
        }

        public static <E extends Comparable<E>> Pair<E, E> findMinAndMax(List<E> l){
            return findMinAndMax(l, new Comparator<E>() {
                @Override
                public int compare(E o1, E o2) {
                    return o1.compareTo(o2);
                }
            });
        }
    }
}
