public class Misc1 {
    public interface I{
        void a();
        void b();

        default void C(){
            a();
            b();
        }
    }

    public abstract class J{
        public abstract void a();
        public abstract void b();

        public void c(){
            a();
            b();
        }
    }

    public class C implements I{
        @Override
        public void a() {

        }

        @Override
        public void b() {

        }
    }

    public void main(String[] args) {
        I o = new C();
    }
}
