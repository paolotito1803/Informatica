#include<iostream>
#include<vector>


using std::vector;
using std:string;

string seme_carte(int n, string seme, string valore, int modulo){
    if(n>=0 && n<=9)
    seme = "denari";
if(n>=10 && n<=19)
    seme = "coppe";
if(n>=20 && n<=29)
    seme = "bastoni";
if(n>=30 && n<=39)
    seme = "spade";
return seme;
}

string seme_valore(int n, string seme, string valore, int modulo){
/*if(n>=0 && n<=9)
    seme = "denari";
if(n>=10 && n<=19)
    seme = "coppe";
if(n>=20 && n<=29)
    seme = "bastoni";
if(n>=30 && n<=39)
    seme = "spade";*/ 

seme_carte( n, seme, valore, modulo);
modulo = n%10;
if(modulo ==0){
    valore= "Asso";
    return valore+ " di "+seme;
}
if(modulo ==7){
    valore="Donna";
    return valore+ " di "+seme;
}
if(modulo==8){
    valore="Fante";
    return valore+ " di "+seme;
}
if(modulo==9){
    valore="Re";
    return valore+ " di "+seme;
}
else{
    valore = modulo+1+48;
    return valore + " di " +seme;
}
//return valore+ " di " +seme;
}

string carta(int n) {
string errore;
string seme;
string valore;
int modulo;
if(n<0 || n>39){
    errore= "Errore di conversione";
    return errore;
  }
else
    return (seme_valore( n,  seme,  valore, modulo) + seme_carte( n, seme, valore, modulo));
    
    
}

int main()
{
    int n;
    std::cout<< "inserisci valore" <<std::endl;
    std::cin>> n;
    std::cout<<carte(n);
}