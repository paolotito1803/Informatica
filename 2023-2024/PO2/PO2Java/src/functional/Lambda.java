package functional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;

public class Lambda {
    int f(int x) {
        return x + 1;
    }
    //public static <A, B> Collection<B> map(Collection<A> c, ...){}
    /*
    Esempio in c:
    void for_each(int* a, size_t len, void(* f)(int)){
        for(int i = 0; i < len; ++i)
            f(a[i])
      void print_int(int n){
        printf("%d\n", n);
      }
      int main(){
        int a[10] = ...;
        for_each(a, 10, print_int);
      }
     */


    //lambda che non hanno un tipo di ritorno
    interface MyFunctions<T> {
        void applpay(T a);
    }

    public static <T> void for_each(Collection<T> c, MyFunctions<T> f1) {
        for (T x : c) {
            f1.applpay(x);
        }
    }

    public static void main(String[] args) {
        List<Integer> l = List.of(1, 2, 3, 4);
        for_each(l, new MyFunctions<Integer>() { //anonimus class è un singolo argomento
            @Override
            public void applpay(Integer a/*nome del parametro della lambda*/) {
                System.out.println(a); //corpo lamda
            }
        });

        for_each(l, new MyFunctions<Integer>() {
            @Override
            public void applpay(Integer a) {
                if (a > 5)
                    a = a + 1;
            }
        });
    }

    public static void Main(String[] args) {
        List<Integer> l = List.of(1, 2, 3, 4);
        //anonimus class è un singolo argomento
        for_each(l, a -> System.out.println(a)); //sostituito con lambda
        for_each(l, a -> {
            if (a > 5) a = a + 1;
        });
    }


    //lambda che hanno un tipo di ritorno
    interface Functions<A, B> {
        B apply(A a);
    }

}

/*
void for_each(int* a, size_t len, void(*f)(int)) {
    for (int i = 0; i < len; ++i)
        f(a[i]);
}

void print_int(int n) {
    printf("%d\n", n);
}

void main(){
    int A[10] = ...;
    for_each(A, 10, print_int);
}
*/

