package Esercizi_Eserciziario.Es12;

/*
12. Si assumano le seguenti classi ed interfacce Java, innestate per brevit`a in una sola classe a top-level:

(a) Come sarebbe possibile rifattorizzare questo codice in modo da ridurre al minimo le ripetizioni e massimizzare
il riuso? Si scriva il codice rifattorizzato, facendo attenzione a non cambiare il comportamento del programma.
(b) Si prenda in considerazione il seguente metodo main() per la classe HannaBarbera, supponendo che le restanti
classi ed interfacce innestate siano quelle rifattorizzate secondo quanto richiesto dall’esercizio 1.

i. Qualora una o più parti del metodo main() non siano compatibili a causa della rifattorizzazione eseguita
precedentemente, si scriva in maniera chiara quali modifiche sono necessarie per renderlo compilabile
mantenendo la semantica dell’originale; se preferibile, si riscriva per chiarezza l’intero codice main()
opportunamente modificato.
ii. Qual’`e il peso del gatto Tom che viene scritto in output alla fine?
 */

public class HannaBarbera {
    public interface Food {
        int getWeight();
    }
    public interface Animal extends Food {
        void eat(Food f);
    }

    public static abstract class Animali implements Animal{
        private int weight;
        private int div;
        public Animali(int weight, int div){
            this.weight = weight;
            this.div = div;
        }
        /*
        * public Animali(int div){
            this.div = div;
        }
        * */


        @Override
        public int getWeight() {
            return this.weight;
        }

        @Override
        public void eat(Food f) {
            this.weight += f.getWeight() / div;
        }
    }

    public static class Mouse extends Animali {

        public Mouse(int weight, int div) { super(weight, div); }
        /*
         altra soluzione public Mouse(int div) { super(div); }
        */
    }
    public static class Cat extends Animali {
        public Cat(int weight, int div) { super(weight, div); }
    }
    public static class Cheese implements Food {
        @Override
        public int getWeight() { return 50; }
    }
    public static void main(String[] args) {
        Animal tom = new Cat(200, 5);
        Animal jerry = new Mouse(10, 2);
        jerry.eat(new Cheese());
        jerry.eat(new Food() {
            @Override
            public int getWeight() { return 10; }
        });
        tom.eat(jerry);
        //System.out.println(new Cheese());
        System.out.println(String.format("Tom now weights %d", tom.getWeight()));
    }
}


