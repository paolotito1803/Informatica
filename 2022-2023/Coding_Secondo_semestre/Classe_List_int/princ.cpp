#include"listvect.hpp"
#include<iostream>
#include<string>

void foo(List_int x) {

  x.first()=0;

}


void read_list(List_int& l) {
  int elem, member;
  std::cin>>elem;

  while (elem>0) {
    std::cin >> member;
    l.append(member);
    elem--;
  }
}


int main() {
  List_int l1, l2;    //Crea una lista vuoti

  std::cout<<"Inserisci l1"<<std::endl;
  read_list(l1);
  std::cout<<"Inserisci l2"<<std::endl;
  read_list(l2);

  if (l1.equal(l2)) 
    std::cout << "Liste uguali" << std::endl;
  else
    std::cout << "Liste diverse" << std::endl;

  l1.concat(l2);

 

  std::cout<<l1.convert_to_string()<< std::endl;
  std::cout<<l2.convert_to_string()<< std::endl;

  return 0;
}
