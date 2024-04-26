package Tutorato.Lezione_2;

//genercis per aver controllo a tempo di compilazione
public class MyArrayList<T> { //T è il parametro formale
    private Object[] a;
    int size;
    public MyArrayList(){
        this.a = new Object[10];
        this.size = 0;
    }

    public void add(T elem){
        a[size++] = elem;
    }


    public static void main(String[] args) {
        MyArrayList<Integer> l = new MyArrayList();
        l.add(6);
        l.add(47);

    }
}
