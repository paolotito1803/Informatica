#include<iostream>
#include"functions.hpp"
#include<vector>

void check( std::vector<std::vector<int>>& matrix1,  std::vector<std::vector<int>>& matrix2, int& righe1, int& colonne1, int& righe2, int& colonne2)
{
    if(righe1 == colonne2)
    {
        std::cout<<"ok";
        prodotto(matrix1, matrix2);
    }
}