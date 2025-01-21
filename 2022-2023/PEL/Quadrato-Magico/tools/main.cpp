#include<iostream>
#include<vector>
#include"function.hpp"

int main()
{
    std::vector<std::vector<int>> vettore = vector_create();
    std::vector<std::vector<int>> vectore = inizializzazione(vettore);
    if(num_diff(vectore) && somma(vectore))
        std::cout<<"la matrice è un quadrato magico " << std::endl;
    else
        std::cout<<"la matrice non è un quadrato magico" <<std::endl;
   return 0;
}