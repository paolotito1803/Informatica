list( cont list& e){
    list tmp = l;
    while(tmp != nullptr){
        append(tmp->info);
        tmp = tmp->next;
    }
}

append(int c){
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

~list(){
    list tmp ;
    while(l != nullptr){
        tmp = l;
        l = l->next;
        delete tmp;
    }
}