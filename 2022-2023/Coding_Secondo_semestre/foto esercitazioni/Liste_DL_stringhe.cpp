#include<iostream>
#include<string>

using namespace std;

/*Classe lista di stringhe ordinate alfabeticamente in modo
 * crescente. La lista e' doppiamente concatenata*/

class ListStrings{
public:
  ListStrings();
  ListStrings(ListStrings&& ls);
  ~ListStrings();
  void print_forward() const;
  void print_reversed() const;
  void add(const string& s);
  ListStrings& operator=(const ListStrings& ls);
  ListStrings operator+(const ListStrings& ls) const;
private:
  struct Cell{
    string info;
    Cell* next;
    Cell* prev;
  };
  Cell* head; //puntatore alla prima cella
  Cell* tail; //puntatore all'ultima cella
};


//Default constructor
ListStrings::ListStrings() {
  head = nullptr;
  tail = nullptr;
}


//Move constructor
ListStrings::ListStrings(ListStrings&& ls) {
  std::cout<<"Move costructor"<<endl;
  head = ls.head;
  tail = ls.tail;
  ls.head = nullptr;
  ls.tail = nullptr;
}

//stampa da head a tail
void ListStrings::print_forward() const{
  Cell* ptr=head;
  while (ptr) {
    cout<<ptr->info<<endl;
    ptr = ptr->next;
  }
}

//stampa da tail a head
void ListStrings::print_reversed() const{
  Cell* ptr=tail;
  while(ptr) {
    cout<<ptr->info<<endl;
    ptr=ptr->prev;
  }
}



//Destructor: 
ListStrings::~ListStrings() {
    //scrivi qui il tuo codice Esercizio 1
    if(head!= nullptr){
        Cell* pc = head;
        while(pc!=nullptr){
        head=head->next;
        delete pc;
        pc=head;
        }
    }
}


void ListStrings::add(const string& s) {
   //Scrivi qui il tuo codice Esercizio 1
   
   Cell* nuova=new Cell;
   nuova->info = s;
   nuova->next=nullptr;
   nuova->prev=nullptr;
   bool controllo = false;
   if(head == nullptr && tail== nullptr){
       head=nuova;
       tail = nuova;
   }
   else if(s<head->info){
       head->prev=nuova;
       nuova->next=head;
       head=nuova;
   }
   else{
       Cell* pc=head;
       while(pc!=nullptr && !controllo){
           if(s<pc->info){
               pc->prev->next=nuova; // no pc->prev=nuova; perchè prima ho cambiato il puntatore a pc->prev quindi ho invertito la riga 100 con 103
               nuova->next=pc;
               nuova->prev=pc->prev;
               pc->prev=nuova;
               controllo = true;
           }
           else if(pc->next==nullptr){
               nuova->prev=pc;
               nuova->next=nullptr;
               pc->next=nuova;
               tail=nuova;
               controllo = true;
           }
           pc=pc->next;
       }
   }
}  
       
ListStrings& ListStrings::operator=(const ListStrings& ls) {
   //Scrivi qui il tuo codice Esercizio 2
   if(this!=&ls){
       Cell* pc=head;
       while(pc!=nullptr){
           pc=pc->next;
           delete head;
           head=pc;
       }
       head=nullptr;
       tail= nullptr;
       pc=ls.head;
       while(pc!=nullptr){
           add(pc->info);
           pc=pc->next;
       }
   }
  return *this;
}


ListStrings ListStrings::operator+(const ListStrings& ls) const {
   //Scrivi qui il tuo codice Esercizio 3
  ListStrings res;
  Cell* pc=head;
  while(pc!=nullptr){
      res.add(pc->info);
        pc=pc->next;
  }
  
  pc=ls.head;
  while(pc!=nullptr){
      res.add(pc->info);
      pc=pc->next;
  }
  return res;
}
int main() {
  int n;
  string s;
  ListStrings ls;

  cin >> n;
  for (; n>0; n--) {
    cin>>s;
    ls.add(s);
  }
  cout<<endl;
  ls.print_forward();
  cout<<endl;
  ls.print_reversed();
  return 0;


  int n;
  string s;
  ListStrings ls;
  ListStrings res;

  res.add("Prova");
  res.add("Trash");

  cin >> n;
  for (; n>0; n--) {
    cin>>s;
    ls.add(s);
  }

  res = ls;

  cout<<"Stampo la lista originale"<<endl;
  ls.print_forward();
  cout<<endl;
  ls.print_reversed();
  cout<<"Stampo la lista copiata"<<endl;
  res.print_forward();
  cout<<endl;
  res.print_reversed();

  return 0;


  int n1,n2;
  string s;
  ListStrings ls1;
  ListStrings ls2;
  ListStrings res;

  cin >> n1;
  cin >> n2;

  for (; n1>0; n1--) {
    cin>>s;
    ls1.add(s);
  }

  for (; n2>0; n2--) {
    cin>>s;
    ls2.add(s);
  }

  res = ls1+ls2;

  cout<<"Stampo la prima lista"<<endl;
  ls1.print_forward();
  cout<<endl;
  ls1.print_reversed();
  cout<<"Stampo la seconda lista"<<endl;
  ls2.print_forward();
  cout<<endl;
  ls2.print_reversed();
  cout<<"Stampo la lista somma"<<endl;
  res.print_forward();
  cout<<endl;
  res.print_reversed();


  return 0;
}
