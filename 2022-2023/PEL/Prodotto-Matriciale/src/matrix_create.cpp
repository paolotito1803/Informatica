#include<iostream>
#include"functions.hpp"
#include<vector>

void matrix_create ( std::vector<std::vector<int>>& matrix1,  std::vector<std::vector<int>>& matrix2, int& righe1, int& colonne1, int& righe2, int& colonne2)
{
    matrix1.resize(righe1);
    for(int r=0; r<righe1; r++)
        matrix1.at(r).resize(colonne1);
    
    matrix2.resize(righe2);
        for(int r=0; r<righe2; r++)
            matrix2.at(r).resize(colonne2);
}

void leggi(std::vector<std::vector<int>>& matrix1,  std::vector<std::vector<int>>& matrix2, int& righe1, int& colonne1, int& righe2, int& colonne2)
{
    std::vector<std::vector<int>> m1(righe1);
    for(int i=0; i<righe1; i++){
        m1.at(i).resize(colonne1);
    }
   std::vector<std::vector<int>> m2(righe2);
    for(int j=0; j<righe2; j++){
        m2.at(j).resize(colonne2);
    }
    for(int r1 = 0; r1 < m1.size(); r1++)
    {
        for(int c1 = 0; c1 < m1.at(r1).size(); c1++)
        {
          std::cin>> m1.at(r1).at(c1);
        }
    }

    for(int r2 = 0; r2 < m2.size(); r2++)
    {
        for(int c2=0; c2 < m2.at(r2).size(); c2++)
        {
            std::cin>>m2.at(r2).at(c2);
        }
    }
    matrix1 = m1;
    matrix2 = m2;
}