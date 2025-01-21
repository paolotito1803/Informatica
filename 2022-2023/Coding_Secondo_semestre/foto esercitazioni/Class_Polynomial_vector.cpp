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
      std::vector<dati> v; 
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
  v=p.v;
}

//Returns the coefficient of the terms  x^exponent
//If it has not been added it returns 0
//Notice that we have only one version of at
//It does not return a reference, just an int. So we can only read with at!
int Polynomial::at(int exponent) const {
    for(auto e:v){
        if(e.exponent==exponent)
            return e.coeff;
    }
    return 0;
}



//Set to coeff the coefficient of x^exponent. If this is present, 
//it will be overwritten. Setting the coefficient to 0 means 
//the removal from the polynomial representation
void Polynomial::set(int exponent, int coeff) {
    for(auto &e:v){
        if(e.exponent==exponent){
            e.coeff=coeff;
            return ;
            }
            dati d={exponent, coeff};
            v.push_back(d);
            for(int i=0; i<v.size();i++){
              if(v.at(i).exponent==exponent){
                if(coeff==0){
                  v.erase(v.begin()+i);
                  return ;
                }
                else{
                  v.at(i).coeff=coeff;
                  return ;
                }
              }
            }
            
        }
    }




//Evaluate a polynomial for a certain x
int Polynomial::evaluate(int x) const{
  int eval=0;
  //for(int i=0;i<v.size();i++){
    for(auto e:v){
    eval += intpow(x, e.exponent) * e.coeff;
  }
  return eval;
}


//Methods for exercise 2


//Returns the degree of a polynomial. The polynomial 0 has degree 0
int Polynomial::degree() const{
  int degree=0;
  //for(int i=0; i<v.size(); i++){
    for(auto e:v){
    if(e.exponent > degree && e.coeff!=0)
      degree = e.exponent;
  }
  return degree;
}



//Methods for exercise 3

//This *recursive* function computes the n-th derivative of the polynomial
Polynomial Polynomial::differentiate(int order) const {
  if(order == 0) return *this;
    Polynomial derivate;
    for(auto e:v){
      if(e.exponent!=0){
        int new_exponent=e.exponent-1;
        int new_coeff=e.coeff*e.exponent;
        derivate.set(new_exponent, new_coeff);
      }  
  }
  return derivate.differentiate(order-1); 
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
