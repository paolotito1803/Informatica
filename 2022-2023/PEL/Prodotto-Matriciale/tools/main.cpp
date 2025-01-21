#include<iostream>
#include"functions.hpp"
#include<vector>

int main()
{
    std::vector<std::vector<int>> matrix1;
     std::vector<std::vector<int>> matrix2;
    int righe1;
    std::cout<< "inserisci righe prima matrice" ;
    std::cin>> righe1;
    int righe2;
     std::cout<< "inserisci righe seconda matrice" ;
     std::cin>> righe2;
    int colonne1;
     std::cout<< "inserisci colonne prima matrice" ;
    std::cin>> colonne1;
    int colonne2;
     std::cout<< "inserisci colonne seconda matrice" ;
    std::cin>> colonne2;
    leggi( matrix1,   matrix2,  righe1,  colonne1,  righe2,  colonne2);
    for(int i=0; i<matrix1.size(); i++){
        for(int j=0; j<matrix1.at(i).size();j++){
            std::cout<<" "<<matrix1.at(i).at(j);
        }
    }
    std::cout<<std::endl;
   for(int k=0; k<matrix2.size(); k++){
        for(int l=0; l<matrix2.at(k).size();l++){
            std::cout<<" "<<matrix2.at(k).at(l);
        }
    }  
    check(matrix1, matrix2, righe1, colonne1, righe2, colonne2);
}