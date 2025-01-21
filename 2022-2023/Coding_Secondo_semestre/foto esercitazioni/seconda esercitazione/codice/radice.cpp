#include<iostream>
#include<iomanip>
double radice(double n, unsigned int k, double min, double max) {
     double medio = (max+min)/2;
     double potenza;
     for(int i=0; i<k; i++){
         potenza =medio *medio;
     }

     if((max-min)>=0 && (max-min)<=0.00001)
        return medio;
     if( potenza< n){
         return radice(n, k, medio, max);
     }
return radice(n, k, min, medio);
}

int main(){
    double n =5;
    double k=3;
    double min=1;
    double max = n;
    std::cout<<std::setprecision(5)<<radice(n, k, min, max);
}