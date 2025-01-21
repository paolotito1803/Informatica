#include<iostream>


struct Cella_circ {
    int info;
    struct Cella_circ* next;
};


typedef Cella_circ* Lista_circ;


void add(Lista_circ& lista, int x) {
    Lista_circ nuovo = new Cella_circ;
    nuovo->info = x;
    if (lista == nullptr) {
        nuovo->next = nuovo;
        lista = nuovo;
    }
    else {
        nuovo->next = lista->next;
        lista->next = nuovo;
    }
}

//stampa lista
void stampa_lista(Lista_circ l) {
    if (l) {
        Lista_circ pc{ l };
        do {
            std::cout << l->info << " ";
            l = l->next;
        } while (l != pc);
    }
    std::cout << std::endl;
}

//distruggi lista
void distruggi(Lista_circ& l) {
    if (l) {
        Lista_circ supp, sentinella{ l };
        do {
            supp = l;
            l = l->next;
            delete supp;
        } while (l != sentinella);
        l = nullptr;
    }
}


//leggi lista
void leggi_lista(Lista_circ& l) {
    int elem, n;
    std::cin >> n;
    while (n > 0) {
        std::cin >> elem;
        add(l, elem);
        n--;
    }
}





void rimuovi_occ(Lista_circ& l, int elem) {
    Lista_circ head = l;
    if (l == nullptr) return;
    /*else if(l->info == head->info){
        Lista_circ nodo_salvato = head->next;
        head->next = nodo_salvato->next;
        delete  nodo_salvato;

    }*/

    //head = head->next;
    while (head->next != l) {
        if (head->next->info == elem) {
            Lista_circ nodo_salvato = head->next;
            head->next = nodo_salvato->next;
            delete  nodo_salvato;
        }
        else {
            head = head->next;
        }
    }
    //lista solo 1 elemento
    if (l == l->next && l->info == elem) {
        Lista_circ nodo_salvato = l;
        delete nodo_salvato;
        l = nullptr;
        return;
    }
    //elemento da cancellare in testa
    if (head->next->info == elem && l->next != l) {
        Lista_circ nodo_salvato = head->next;
        head->next = head->next->next;
        delete  nodo_salvato;
        l=head->next;
    }
}

int main() {

    int elimina;
    Lista_circ l = nullptr;

    leggi_lista(l);
    std::cin >> elimina;

    std::cout << "Prima: ";
    stampa_lista(l);

    rimuovi_occ(l, elimina);

    std::cout << "Dopo: ";
    stampa_lista(l);


    distruggi(l);
    return 0;
}