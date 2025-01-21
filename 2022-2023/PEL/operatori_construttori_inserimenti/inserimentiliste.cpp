void prepend( List& l, int e){
    List* nuovo = new List;
    nuovo->next = l;
    nuovo->info = e;
    l = nuovo;
}

void inserteverywhere(List& l, int e, int pos){
    List* nuovo = new List;
    List pc = l;
    if(pos > )
    while(pc != nullptr){
        nuovo->info = e;
        nuovo->next = pc->next;
        pc->next = nuovo;
    }

}

void append( int e){
    List* nuovo = new List;
    nuovo->info = e;
    nuovo->next = nullptr;
    if(l == nullptr){
        l = nuovo;
        return;
    }
    List tmp = l;
    while(tmp->next != nullptr){
        tmp = tmp->next;
    }
    tmp->next = nuovo;
}
