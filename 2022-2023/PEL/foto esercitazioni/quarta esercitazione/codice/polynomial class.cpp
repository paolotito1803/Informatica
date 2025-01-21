#include<iostream>
#include<vector>
#include<list>




class Polynomial{
  public:
    Polynomial();
    Polynomial(const Polynomial& p);
    void set(int exponent, int coeff);
    int at(int exponent) const;
    void read();
    int evaluate(int x) const;
    Polynomial differentiate(int order) const;
    int degree() const;
    void print() const;
    
  private:
    int intpow(int base, int exponent) const;
    struct dati{
    int coeff;
    int exponent;
    };
    std::list<dati> l;
};


//////// Pre-implemented part/////////////

//Do not change this method! It reads a Polynomial 
void Polynomial::read() {
  int coeff, exponent;
  do {
    std::cin>>exponent;
    if (exponent>=0)  {
      std::cin>>coeff;
      set(exponent, coeff);
    }
  } while (exponent>=0);
}


//Do not change this method! It prints a Polynomial
void Polynomial::print() const {
  int n = degree();

  for (int i=0; i<=n; i++) {
    if (at(i)!=0) 
      std::cout<<"+("<<at(i)<<")x^"<<i;
  }
  std::cout<<std::endl;
}



//Do not change this method! It simply computes the integer power
//It could be useful!
int Polynomial::intpow(int base, int exponent) const {
  int res=1;

  while (exponent>0) {
    res = res*base;
    exponent--;
  }
  return res;
}


//Methods for exercise 1


//Default constructor: builds the polynomial 0
Polynomial::Polynomial() {
}

//Copy constructor
Polynomial::Polynomial(const Polynomial& p) {
    l = p.l;
}

//Returns the coefficient of the terms  x^exponent
//If it has not been added it returns 0
//Notice that we have only one version of at
//It does not return a reference, just an int. So we can only read with at!
int Polynomial::at(int exponent) const {
  int verifica=0;
    auto new_l=l.begin();
    while(new_l!=l.end() && !verifica){
        if(new_l->exponent==exponent)
            verifica=1;
        else
            new_l++;
    }
    if(verifica)
        return new_l->coeff;
    else 
        return 0;
}



//Set to coeff the coefficient of x^exponent. If this is present, 
//it will be overwritten. Setting the coefficient to 0 means 
//the removal from the polynomial representation
void Polynomial::set(int exponent, int coeff) {
    int check=0;
    auto new_l=l.begin();
    while(new_l!=l.end() && !check){
        if(new_l->exponent==exponent)
            check=true;
        else
            new_l++;
    }
    if(check){
        if(coeff!=0)
            new_l->coeff=coeff;
        else
            l.erase(new_l);
    }else
        l.push_back(dati{coeff, exponent});
}



//Evaluate a polynomial for a certain x
int Polynomial::evaluate(int x) const{
   int eval=0;
   for(auto new_l=l.begin(); new_l!=l.end(); new_l++){
           eval+=intpow(x, new_l->exponent)*new_l->coeff;
   }
   return eval;
  
}


//Methods for exercise 2


//Returns the degree of a polynomial. The polynomial 0 has degree 0
int Polynomial::degree() const{
    int degree=0;
    for(auto new_l=l.begin(); new_l!=l.end(); new_l++){
        if(new_l->exponent>degree)
            degree=new_l->exponent;
    }
    return degree;
}



//Methods for exercise 3

//This *recursive* function computes the n-th derivative of the polynomial
Polynomial Polynomial::differentiate(int order) const {
  if(order==0) return *this;
  else{
        Polynomial derivata;
        for(auto new_l=l.begin(); new_l!=l.end(); new_l++){
            if(new_l->exponent>0)
                derivata.set(new_l->exponent-1, new_l->coeff*new_l->exponent);
        }
        return derivata.differentiate(order-1);
    }
}

void fun(Polynomial p, int a) {
  std::cout<<p.evaluate(a)<<std::endl;
}


int main() {
  Polynomial x;
  x.read();
  int a;
  std::cin>>a;
  fun(x,a);
  return 0;
}
