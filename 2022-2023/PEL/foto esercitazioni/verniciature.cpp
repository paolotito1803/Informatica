#include <iostream>
#include <vector>

enum colore{Bianco, Nero};

typedef enum colore tcolore;

void leggi_vettore(std::vector<int>& v) 
{
    for (auto& el:v)
        std::cin >> el;
}

int grattacielo(const std::vector<int>& v, int piano, colore c) {
 
if (piano == v.size() - 1){ 
    if(c == Bianco){
        return v.at(piano);
    }
    else{
       return 0;
    }
}
if (v.size() == 0) return 0;//caso base
    
   if (c == Bianco){
    int B = grattacielo(v, piano + 1, Bianco);
    int N = grattacielo(v, piano + 1, Nero);
    if(B >= (N+v.at(piano)))//funzione massimo
       return B;
    else
       return (N+v.at(piano));
     }
    return grattacielo(v, piano + 1, Bianco);
}