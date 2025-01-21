#include<iostream>

struct Cella{
  int info;
  Cella* next;
};

typedef Cella* Lista;


void append(Lista& l, int elem) {
  if (l==nullptr) {
    l = new Cella{elem, nullptr};
  }
  else 
    append(l->next, elem);
}


void readlist(Lista& l) {
  int q, e;

  std::cin>>q;

  while (q>0) {
    std::cin>>e;
    append(l, e);
    q--;
  }
}


bool findsum(Lista l, int sum, int add) {
    
    if(add == 0 && sum==0) //caso base particolare
        return true;
    if(add == 0 || l==nullptr) //caso base
        return false;
    
    bool verifica1 = findsum( l->next, sum,  add); //non prendo elemento successivo
    bool verifica2 = findsum(l->next, sum-(l->info),  add-1); //prendp elemento successivo   
    
    return (verifica1 || verifica2);
    

}

int main() {
  Lista l{nullptr};

  readlist(l);

  int sum;
  int add;

  std::cin>>sum;
  std::cin>>add;

  if (findsum(l, sum, add))
    std::cout<<"Somma trovata"<<std::endl;
  else
    std::cout<<"Somma non trovata"<<std::endl;

}

