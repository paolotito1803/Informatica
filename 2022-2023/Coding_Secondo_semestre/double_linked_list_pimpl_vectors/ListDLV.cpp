#include "ListDL.hpp"
#include <vector>
#include <iostream>

#define MAXE 10

struct ListDL::impl{
  std::vector<int> v;
  int head;
  int tail;
  int free;
};

ListDL::ListDL() {
  pimpl = new impl;
  pimpl->v.resize(MAXE*3);
  pimpl->head = -1;
  pimpl->tail = -1;
  pimpl->free = 0;

  for (int i=0; i<MAXE-1; i++) {
    pimpl->v.at(i*3+2)=(i+1)*3;
  }

  pimpl->v.at((MAXE-1)*3+2)=-1;
}

ListDL::ListDL(const ListDL& s) {
  pimpl = new impl;
  pimpl->v = s.pimpl->v;
  pimpl->head = s.pimpl->head;
  pimpl->tail = s.pimpl->tail;
  pimpl->free = s.pimpl->free;
}

//copy constructor errato
/*
ListDL::ListDL(const ListDL& s) {
  pimpl=s.pimpl;
}
*/

ListDL::~ListDL() {
  delete pimpl;
}

void ListDL::prepend(int e) {
  if (pimpl->free != -1) { //abbiamo blocchetti liberi
    int nuovo = pimpl->free;
    pimpl->free = pimpl->v.at(pimpl->free+2);
    pimpl->v.at(nuovo) = -1;
    pimpl->v.at(nuovo+1) = e;
    pimpl->v.at(nuovo+2) = pimpl->head;
    if (pimpl->head!=-1) //ho almeno un elemento
      pimpl->v.at(pimpl->head) = nuovo;
    pimpl->head = nuovo;
    if (pimpl->tail == -1) //caso di inserimento in lista vuota
      pimpl->tail = nuovo;
  }
}

void ListDL::append(int e) {
  if (pimpl->free != -1) { //abbiamo blocchetti liberi
    int nuovo = pimpl->free;
    pimpl->free = pimpl->v.at(pimpl->free+2);
    pimpl->v.at(nuovo+2) = -1;
    pimpl->v.at(nuovo+1) = e;
    pimpl->v.at(nuovo) = pimpl->tail;
    if (pimpl->head!=-1) //ho almeno un elemento
      pimpl->v.at(pimpl->tail+2) = nuovo;
    pimpl->tail = nuovo;
    if (pimpl->head == -1) //caso di inserimento in lista vuota
      pimpl->head = nuovo;
  }
}


/*
void ListDL::print() const {
  std::cout<<"Head: "<<pimpl->head <<", ";
  std::cout<<"Tail: "<<pimpl->tail <<", ";
  std::cout<<"Free: "<<pimpl->free << std::endl;

  for (int i=0; i<MAXE; i++) {
    std::cout<<i*3<<": ";
    std::cout<<"["<<pimpl->v.at(i*3)<<", "<<pimpl->v.at(i*3+1)<<", "<<pimpl->v.at(i*3+2)<<"]"<<std::endl;
  }
  std::cout<<std::endl;
}
*/

void ListDL::print() const {
  int pc = pimpl->head;

  while (pc!=-1) {
    std::cout<<pimpl->v.at(pc+1)<<" ";
    pc = pimpl->v.at(pc+2);
  }
  std::cout<<std::endl;
}



int& ListDL::at(int pos){
  int pc;
  if (pos>=0) {
    pc = pimpl->head;

    while (pc!=-1 && pos>0) {
      pc = pimpl->v.at(pc+2);
      pos--;
    }
  }
  else {
    pc = pimpl->tail;
    pos = -pos - 1;

    while (pc!=-1 && pos>0) {
      pc = pimpl->v.at(pc);
      pos--;
    }
  }

  if (pc!=-1)
    return pimpl->v.at(pc+1);
  else
    //gestire eccezione correttamente, usiamo le eccezioni dei vector per 
    //semplicita
    return pimpl->v.at(MAXE*3);
}


const ListDL& ListDL::operator=(const ListDL& l){
  if (this != &l) {
    pimpl->v = l.pimpl->v;
    pimpl->head = l.pimpl->head;
    pimpl->tail = l.pimpl->tail;
    pimpl->free = l.pimpl->free;
  }
  return *this;
}


bool ListDL::operator==(const ListDL& l) const {
  bool res = true;

  int pc1 = pimpl->head;
  int pc2 = l.pimpl->head;

  while (pc1!=-1 && pc2!=-1 && res) {
    if (pimpl->v.at(pc1+1) != l.pimpl->v.at(pc2+1))
      res = false;
    else {
      pc1 = pimpl->v.at(pc1+2);
      pc2 = l.pimpl->v.at(pc2+2);
    }
  }
  return (pc1==-1 && pc2==-1); 
}

ListDL ListDL::operator+(const ListDL& l) const {
  ListDL res=*this;

  int pc2 = l.pimpl->head;

  while (pc2!=-1) {
    res.append(l.pimpl->v.at(pc2+1));
    pc2 = l.pimpl->v.at(pc2+2);
  }

  return res;

}

int ListDL::size() const {
  int res = 0;
  int pc=pimpl->head;

  while(pc!=-1) {
    res++;
    pc = pimpl->v.at(pc+2);
  }
  return res;
}

/*
int main() {
  ListDL l;

  l.print();

  l.prepend(15);
  l.prepend(20);
  l.prepend(30);

  l.at(1)=200;

  l.print();

  return 0;
}
*/
