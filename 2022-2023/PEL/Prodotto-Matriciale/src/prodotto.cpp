#include<iostream>
#include<vector>
#include"functions.hpp"



void prodotto( std::vector<std::vector<int>>& matrix1,  std::vector<std::vector<int>>& matrix2)
{
    int prodotto_matriciale;
    for(int r1 = 0; r1 < matrix1.size(); r1++)
    {
        prodotto_matriciale=0;
        for(int r2 = 0; r2 < matrix2.at(0).size(); r2++)
        {
            for(int c1 = 0; c1 < matrix1.at(0).size(); c1++)
            {
               prodotto_matriciale += matrix1.at(r1).at(c1) * matrix2.at(c1).at(r2);
               
           }
           std::cout<< "Il risultato e'" << prodotto_matriciale << std::endl;
           prodotto_matriciale=0;
        }
    }
}