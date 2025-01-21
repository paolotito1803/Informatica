#include<iostream>
#include<string>

using namespace std;

class Dict{
  public:
    Dict();
    ~Dict();

    int& at(string pos);
    void print() const;
    bool operator<=(const Dict& d) const;
    bool operator==(const Dict& d) const;
    Dict& operator+=(const Dict& d);

  private:
    struct Cella{
      string key;
      int val;
      Cella* next;
    };

    typedef Cella* pCella;

    pCella head;



};

//Costruttore di default. Non cambiare
Dict::Dict() {
  head = nullptr;
}

//Distruttore: Non cambiare
Dict::~Dict() {
  pCella pc;
  while (head) {
    pc = head;
    head = head->next;
    delete pc;
  }
}

//Stampa gli elementi. Non cambare
void Dict:: print() const {
  cout<<"OUTPUT"<<endl;
  pCella pc = head;

  while (pc) {
    cout<<pc->key<<":"<<pc->val<<endl;
    pc = pc->next;
  }
  cout<<"---"<<endl;
}

//Esercizio 1
//Implementare: il metodo at ritorna una reference al
//campo value del nodo con la key uguale a pos se questa esiste
//altrimenti crea un nuovo nodo in coda alla lista che contiene
//come key pos e come valore 0, e ritorna la reference al campo
//value di questo nuovo nodo
int& Dict::at(string pos) {
     pCella l = head;
    while(l != nullptr){
        if(l->key == pos){
            return l->val;
        }
        l = l->next;
    }
    
        pCella tmp = new Cella;
        tmp->key = pos;
        tmp->val = 0;
        tmp->next = nullptr;
        if(head == nullptr){
            head = tmp;
        }
        else{
            pCella pc = head;
            while(pc->next != nullptr){
                pc = pc->next;
            }
            pc->next = tmp;
        }
        return tmp->val;
    
}



//Esercizio 2
//Ritorna true se *this ha un sottoinsieme degli elementi
//di d, cioe' tutte le coppie key,value di *this sono anche
//in Dict (anche in ordine diverso) 
bool Dict::operator<=(const Dict& d) const {
    pCella tmp = d.head;
    pCella pc = this->head;
    if(tmp == nullptr)
        return true;
    while(tmp != nullptr && pc != nullptr){
        if(pc->key != tmp->key && pc->val != tmp->val){
            return false;
        }
        else{
            tmp = tmp->next;
            pc = pc->next;
        }
    }
    
  return true;
}

//Esercizio 2
//Ritorna true se *this ha gli stessi elementi
//di d anche in ordine diverso
bool Dict::operator==(const Dict& d) const {
    pCella tmp = head;
    pCella pc = d.head;
    bool trovato = true;
    while(tmp != nullptr && pc != nullptr){
        if(tmp->val != pc->val && tmp->key != pc->key){
            return false;
        }
        else{
            tmp = tmp->next;
            pc = pc->next;
        }
    }
       
  return true;
}

//Esercizio 3
//Aggiunge tutti gli elementi del parametro formale la cui chiave
//non e' gia' presente in *this. 
//In altre parole, per ogni elemento di d, se la sua key e' gia'
//presente in *this, allora viene ignorato, se invece non e'
//presente, va aggiunto in coda. Al termine si ritorna *this

Dict& Dict::operator+=(const Dict& d) {
  pCella pc = d.head;
  pCella pc1 = this->head;
  bool found=true;
  while(pc != nullptr && pc1 != nullptr){
      if(pc->key != pc1->key){
          found = true;
      }
      pc1 = pc1->next;
      pc = pc->next;
  }
  if(found == false){
      pCella tmp = new Cella;
        tmp->key = pc1->key;
        tmp->val = pc1->val;
        tmp->next = nullptr;
        if(head == nullptr){
            head = tmp;
        }
        else{
            pCella pc2 = head;
            while(pc2->next != nullptr){
                pc2 = pc2->next;
            }
            pc2->next = tmp;
        }
  }
  return *this;
}
void leggi(Dict& s) {
  int nelem;
  string k;
  int v;
  cin>>nelem;
  for (int i=0; i<nelem; i++) {
    cin>>k;
    cin>>v;
    s.at(k)=v;
  }
}


int main() {
  Dict d1, d2;
  leggi(d1);
  leggi(d2);

  d1+=d2;

  d1.print();
  d2.print();
  

  return 0;
}

