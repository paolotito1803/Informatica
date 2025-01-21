#include <iostream>
#include <vector>
#include "function.hpp"


bool somma(std::vector<std::vector<int>>& v)
{
    int n = v.size();
    int sum=0;
    for(int c=0; c<n; c++)
        sum += v.at(0).at(c);
    //controllo righe
    int sum_righe;
    for(int r=0; r<n; r++)
    {
        sum_righe=0;
        for(int c=0; c<n; c++)
         {
            sum_righe += v.at(r).at(c);
         } 
        if(sum != sum_righe)
           return false;
    }

//controllo colonne
    int sum_colonne;
    for(int c=0; c<n; c++)
    {
        sum_colonne = 0;
        for(int r=0; r<n; r++)
         {
            sum_colonne += v.at(r).at(c);
         }   
         if(sum != sum_colonne)
            return  false;
    }
//controllo diagonale principale
    int sum_diag_1 = 0;
    for(int r=0; r<n; r++)
    {
         sum_diag_1 += v.at(r).at(r); 
    }
    if(sum != sum_diag_1)
        return false;
//controllo diagonale secondaria
    int sum_diag_2 = 0;
    for(int r=0; r<n; r++)
    {
       sum_diag_2 += v.at(r).at(n-1-r); 
    }
    if(sum != sum_diag_2)
        return false;
    

}

