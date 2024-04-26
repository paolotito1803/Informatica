package WildeCards;

public class Overloading {
    public static class A{
        public A l(){
            return this;
        }

        public void m(){}

        public Number k(){return 1.3;}

    }

    public static class B extends A{
        //è un overload in quanto ho modificato la firma
        public void c(int l){}

        public int m(int l){return 0;}

        //non è un overload perchè non cambio il il numero e/o il tipo dei perametri
        //c'è covarianza tra il tipo di ritorno e this, infatti this ha tipo B e il tipo ritorno è B ma non necessariamente scendono assieme
        public B l(){return this;}

        @Override
        public Integer k(){return 2;}
    }

    public static void main(String[] args) {
        A a = new A();
        Number c = a.k();

        A b = new B();
        Number d = b.k();
    }


}
