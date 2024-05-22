package Tutorato.Lezione_2;

import java.util.Iterator;

/*
Si implementi il seguente sistema di iteratori e trasformazioni tra iteratori.
(a) i. Si definisca una interfaccia funzionale simile a quella definita in java.util.Function parametrica sia
sul tipo dell’argomento che sul tipo di ritorno.
ii. Si definisca un metodo statico mapIterator generico su due tipi A e B che, dato un iteratore su A ed
una funzione da A a B, produce un nuovo iteratore che si comporta come un wrapper di quello in input
applicando la funzione ad ogni elemento iterato. Si utilizzi il tipo funzione definito nel punto precedente.
(b) i. Si definisca un tipo per la coppia eterogenea, ovvero una classe Pair parametrica su due tipi distinti A e
B che rappresentano rispettivamente il tipo del primo e del secondo elemento della coppia.
ii. Si definisca un metodo statico pairIterator generico su un tipo A che, dato un iteratore su A, ritorna
un nuovo iteratore che itera su coppie di elementi, prendendone due a due dall’iteratore passato come
argomento. Quando non sono disponibili 2 elementi, si consideri la sequenza come terminata - in altre
parole, una sequenza di lunghezza dispari viene trattata come una sequenza di coppie fino al penultimo
elemento, scartando l’ultimo. Si utilizzi il tipo Pair definito nel punto precedente.
(c) Si scriva un blocco di codice Java che utilizza i metodi di cui sopra per trasformare un iteratore di cateti in
un iteratore di ipotenuse che applica il teorema di pitagora in tempo reale. In particolare, si scriva un blocco
di codice che:
1. crea una collection iterabile a vostra scelta e la popola con numeri interi casuali usando la classe Random
del JDK5
;
2. produce un iteratore su coppie di interi, avente tipo Iterator<Pair<Integer, Integer>>, passando
l’iteratore originale della collection come argomento al metodo pairIterator definito nell’esercizio precedente;
3. trasforma l’iteratore su coppie di interi appena prodotto in un altro iteratore che itera su Double chiamando mapIterator con una callback opportunamente definita. Tale callback calcola l’ipotenusa di un
triangolo rettangolo data una coppia di cateti. Si badi che i cateti sono interi e le ipotenuse sono double.

 */

public class Es5 {

    //ridefinito ointerrfaccia funcion
    public interface Function<A, B>{
        B applay(A a);
    }

    //<A, B> all'inizio servono per definire i tipi della funzione -> type paramiter
    //function ha due type parameter e devono comparire nella firma

    public static <A, B>Iterator<B> mapIterator(Iterator<A> it, Function<A, B> f){
        return new Iterator<B>() {
            @Override
            public boolean hasNext() {
                return it.hasNext();
            }

            @Override
            public B next() {
                return f.applay(it.next());
            }
        };
    }

    public static class pair<A, B> {
        public A first;
        public B second;

        public pair(A first, B second) {
            this.first = first;
            this.second = second;
        }
    }

    public static <A> Iterator<pair<A, A>> PairIterator(Iterator<A> it){
        return new Iterator<pair<A, A>>() {
            A last;
            @Override
            public boolean hasNext() {
                if(it.hasNext())
                    last = it.next();
                return it.hasNext();
            }

            @Override
            public pair<A, A> next() {
                return new pair<>(last, it.next());
            }
        };
    }
}
