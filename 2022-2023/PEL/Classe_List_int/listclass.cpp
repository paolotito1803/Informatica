#include"listclass.hpp"
#include<string>


List_int::List_int() {
  l=nullptr;
  last=nullptr;
} //Crea la lista vuota
    
List_int::List_int(int el) {     //Crea la lista con una cella che contiene el
  l = new Cella;
  l->info=el;
  l->next=nullptr;
  last=l;
}


List_int::List_int(const List_int& source) {

  l = nullptr;
  last = nullptr;
  Cella* pc = source.l;
 
  while (pc) {
    append(pc->info);
    pc = pc->next;
  }
}
    
void List_int::prepend(int el) {
  Cella* nuova = new Cella;
  nuova->info = el;
  nuova->next = l;
  l = nuova;
  if (last==nullptr)
    last=nuova;
}

void List_int::append(int el) {
  Cella* nuova = new Cella;
  nuova->info = el;
  nuova->next=nullptr;

  if (l==nullptr) {
    l=nuova;
    last=nuova;
  }
  else {
    last->next = nuova;
    last = nuova;
  }
}

std::string List_int::convert_to_string() const{
  std::string res;
  Cella* pc=l;

  while (pc) {
    res = res + std::to_string(pc->info) + " ";
    pc = pc->next;
  }
    return res;
}


List_int::~List_int() {
  Cella* pc;
  while(l) {
    pc = l;
    l=l->next;
    delete pc;
  }
}

void List_int::flush() {
  Cella* pc=l;
  while (pc!=nullptr) {
    l = l->next;
    delete pc;
    pc = l;
  }
  l=nullptr;
  last = nullptr;
}

void List_int::tail(List_int& res) {   
  Cella* pc=l->next;

  res.flush();

  while (pc) {
    res.append(pc->info);
    pc = pc->next;
  }
} 


int& List_int::first() { 
  return l->info;
}


const int& List_int::first() const {
  return l->info;
}


bool List_int::equal(const List_int& comp) const {
  Cella* pc1=l;
  Cella* pc2=comp.l;

  while (pc1!=nullptr && pc2!=nullptr && pc1->info == pc2->info) {
    pc1=pc1->next;
    pc2=pc2->next;
  }

  return (pc1==pc2);
}

//Semnatica per copia
void List_int::concat(const List_int& sec) {
  Cella* pc = sec.l;

  while (pc!=nullptr) {
    append(pc->info);
    pc = pc->next;
  }

}


