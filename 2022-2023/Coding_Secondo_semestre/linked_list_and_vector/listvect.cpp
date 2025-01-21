#include<iostream>
#include"listvect.hpp"


List_int::List_int() {
} 
    
List_int::List_int(int el) {     //Crea la lista con una cella che contiene el
   v.push_back(el);
}

List_int::List_int(const List_int& source){
  v = source.v;
}
    
void List_int::prepend(int el) {
  v.resize(v.size()+1);
  for (int i=v.size()-1; i>0; i--) 
    v.at(i)=v.at(i-1);
  v.at(0)=el;
}


void List_int::append(int el) {
   v.push_back(el);
}

std::string List_int::convert_to_string() const{
   std::string res{};

   for (int el: v) {
      res = res + std::to_string(el) + " ";
   }

   return res;
}


int& List_int::first() {   //da chiamare sulla lista non vuota!
  return v.at(0);
}

const int& List_int::first() const {
  return v.at(0);
}

void List_int::tail(List_int& res) {
  res.v = v;
  for (int i=0; i<v.size()-1; i++)
    v.at(i)=v.at(i+1);
  v.pop_back();
}

bool List_int::equal(const List_int& s) const{
  return (v==s.v);
}

void List_int::concat(const List_int& s) {
  for (auto e: s.v) {
    v.push_back(e);
  }
}

List_int::~List_int() {
}

