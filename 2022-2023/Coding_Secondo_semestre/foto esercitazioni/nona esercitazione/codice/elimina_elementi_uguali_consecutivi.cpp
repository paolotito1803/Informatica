#include <iostream>

struct Cella{
  int info;
  struct Cella* next;
};


typedef struct Cella* Lista;


//aggiunta in testa alla lista
void prepend(Lista& lista, int x) {
  Lista nuovo = new Cella;
  nuovo->info = x;
  nuovo->next = lista;
  lista = nuovo;
}

//aggiunta in coda alla lista
void append(Lista& l, int data) {
  if (!l)            
    l = new Cella{data, nullptr};
  else append(l->next, data);
}

//stampa lista
void stampa_lista(Lista l) {
  if (l) {
    std::cout<<l->info<<std::endl;
    stampa_lista(l->next);
  }
}

//distruggi lista
void distruggi(Lista& l) {
  Lista supp;
  while(l) {
    supp = l;
    l = l->next;
    delete supp;
  }
}

void leggi(Lista& l) {
    distruggi(l);
    int elem;
    std::cin>>elem;
    
    while (elem > 0) {
        int e;
        std::cin >> e;
        append(l, e);
        elem--;
    }
}

void elimina_dup(Lista& l)
{
    Lista head = l;
    if(l == nullptr)
        return ;
    if(l->next==nullptr)
        return ;
    while(head->next!=nullptr){
    if(head->info == head->next->info){
        Lista nodo_salvato = head->next;
        head->next = nodo_salvato->next;
        delete  nodo_salvato;  
     }
    else head=head->next;
    }
   
}

int main() {
    Lista l = nullptr;
    leggi(l);
    elimina_dup(l);
    stampa_lista(l);
    distruggi(l);
    return 0;
}