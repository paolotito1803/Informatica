operator==(const list& l)const {
    bool uguali = true;
    pCella pc = head;
    pCella tmp = s.head;
    while( pc != nullptr && tmp != nullptr && uguali){
        if(pc->info != tmp->info){
            uguali = false;
        
        }
        else{
            pc = pc->next;
            tmp = tmp->next;
        }
    }
    return pc == tmp;
}

operator=(const list& s) const {
    if(this != &s){
        pCella pc = hrad;
        while(pc != nullptr){
            pc = pc->next;
            delete head;
            head = pc;
        }
        head = nullptr;
        tail = nullptr;
        pc = s.head;
        while(pc != nullptr){
            append(pc->info); //aggiugnere qualcosa
            pc = pc->next;
        }
    }
    return *this;
}

operator+ (const list& s) const{
    list resta;
    pCella pc = head;
    while(pc != nullptr){
        resta.append(pc->info);
        pc = pc->next;
    }
    pCella pc = s.head;
    while(pc != nullptr){
        resta.append(pc->info);
        pc = pc->next;
    }
    return resta;

    //oppure
    List_Uguali res(*this);
    pCella tmp = l.list;
	while(tmp != nullptr){
		res.aggiungi(tmp->info);
		tmp = tmp->next;
	}
    return res;
}

operator*(unsiged n){
    list ris;
    for(int i=0; i<n; i++){
        pCella pc = head;
        while(pc != nullptr){
        ris.append(pc->info)
        pc = pc->next;
        }
    }
    return ris;
}

list(const lint& l){
   list = nullptr;
	pCella tmp = l.list;
	while(tmp != nullptr){
		append(tmp->info);
		tmp = tmp->next;
	}
}