#include<iostream>

struct Cell{
  int info;
  Cell* next;
};

typedef Cell* List;

void append(List& l, int elem) {
  if (l==nullptr) {
    l = new Cell{elem, nullptr};
  }
  else 
    append(l->next, elem);
}


void readlist(List& l) {
  int q, e;

  std::cin>>q;

  while (q>0) {
    std::cin>>e;
    append(l, e);
    q--;
  }
}

void destroy(List& l) {
  if (l) {
    destroy(l->next);
    delete l;
    l=nullptr;
  }
}


void printlist(List l) {
  if (l) {
    std::cout<<l->info<<std::endl;
    printlist(l->next);
  }
}


List merge(List l1, List l2) {
    List l3 = nullptr;
    if(l1==nullptr && l2==nullptr)
        return nullptr;
    while(l1!=nullptr || l2!=nullptr){
        if(l1==nullptr){
            append(l3,l2->info);
            l2 = l2->next;
        }
        else if(l2==nullptr){
            append(l3, l1->info);
            l1=l1->next;
        }
        else{
            if(l1->info < l2->info){
                append(l3, l1->info);
                l1 = l1->next;
            }
            else{
                append(l3, l2->info);
                l2 = l2->next;
            }
        }
        
    }
    return l3;
}
int main() {
  List l1{nullptr}, l2{nullptr}, l3;

  readlist(l1);
  readlist(l2);

  l3 = merge(l1, l2);
  std::cout<<"L1:"<<std::endl;
  printlist(l1);
  std::cout<<"L2:"<<std::endl;
  printlist(l2);
  std::cout<<"L3:"<<std::endl;
  printlist(l3);

  destroy(l1);
  destroy(l2);
  destroy(l3);
  
  return 0;

}
