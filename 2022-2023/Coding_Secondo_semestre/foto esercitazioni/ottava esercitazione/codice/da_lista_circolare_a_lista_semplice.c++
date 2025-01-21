#include<iostream>

struct Cell{
  int info;
  Cell* next;
};

typedef Cell* List;

void addcircular(List& l, int elem) {
  if (l==nullptr) {
    l = new Cell;
    l->info = elem;
    l->next = l;
  }
  else {
    List nuova = new Cell{elem, l->next};
    l->next = nuova;
  }
}



List read_input() {
  int q;
  int el;

  List res = nullptr;

  std::cin >> q;

  while (q>0) {
    std::cin >> el;
    addcircular(res, el);
    q--;
  }

  return res;
}



void print(List l) {
  if (l) {
    std::cout<<l->info << " ";
    print(l->next);
  }
  else 
    std::cout<<std::endl;
}


void destroy(List& l) {
  if (l) {
    destroy(l->next);
    delete l;
    l=nullptr;
  }
}


void linearize(List& l) {
    List head = l;
    if(head == nullptr) return;
    while(head->next != l){
        head=head->next;
    }
    head->next = nullptr;
}
int main() {

  List l = read_input();

  linearize(l);

  print(l);

  destroy(l);

  return 0;

}