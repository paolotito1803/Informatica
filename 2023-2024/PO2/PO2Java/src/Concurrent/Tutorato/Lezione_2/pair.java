package Tutorato.Lezione_2;

public class pair<A, B> {
    public A first;
    public B second;

    public pair(A first, B second){
        this.first = first;
        this.second = second;
    }


    //definizione funzione
    int next(int x){
        return x + 1; //paramentri formali sono x
    }

    //chiamata
    int n = next(6); //6 è il paramentro attuale, quello che passo
}

