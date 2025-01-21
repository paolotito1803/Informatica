void prepend(int e){
    List* nuovo = new List;
    nuovo->prev = nullptr;
    nuovo->next = l;
    nuovo->info = e;
    l->prev = nuovo;
    testa = nuovo;
}

void inserteverywhere(int e){
    List* nuovo = new List;
    List* pc = l;
    nuovo->info = e;
     pc->prev->next = nuovo;
    nuovo->next = pc;
    nuovo->prev = pc->prev;
    pc->prev = nuovo;
}

void append(int e){
    List* nuovo = new List;
    nuovo->info = e;
    while(l->next != nullptr){
        l = l->next;
    }
    nuovo->prev = l;
    nuovo->next = nullptr;
    l->next = nuovo;
    ultimo = nuovo;
}