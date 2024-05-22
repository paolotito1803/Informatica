public class Zoo {

    public static class Animal {
        protected int weight;

        public int getWeight() { return weight; }

        public Animal(int w) {
            this.weight = w;
        }

        public void eat(Animal a) {
            this.weight += a.weight;
        }

        //overload
        public void eat(int a){}
    }

    public static class Dog extends Animal {
        private boolean pedgree;

        public Dog(int w, boolean ped) {
            super(w);
            this.pedgree = ped;
        }

        public void bark() {
            System.out.println("bau!");
        }
        @Override
        public void eat(Animal a) {
            this.weight += a.weight * 2;
        }
    }

    public static class Cat extends Animal {

        public Cat(int w) {
            super(w);
        }

        @Override
        public void eat(Animal a) {
            this.weight += a.weight / 2;
        }

        public void eat(Dog a){}
    }


    //SUBSUMPTION
    public static void main(String[] args) {
        Dog fido = new Dog(30, false );
        Dog gigio = fido;
        Animal pluto = new Dog(40, true);
        pluto.eat(fido);
        pluto = gigio;
        pluto.eat(gigio);
    }

}