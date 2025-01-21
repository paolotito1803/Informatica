#include<iostream>
using namespace std;

void matrix_create (int& matrix1, int& matrix2, int& righe1, int& colonne1, int& righe2, int& colonne2)
{
    matrix1.resize(righe1);
    for(int r=0; r<righe1; r++)
        matrix1.at(r).resize(colonne1);
    
    matrix2.resize(righe2);
        for(int r=0; r<righe2; r++)
            matrix2.at(r).resize(colonne2);
}

int prodotto(int& matrix1, int& matrix2, int& righe1, int& colonne1, int& righe2, int& colonne2)
{
    int prodotto_matriciale;
    for(int r1 = 0; r1 < matrix1.size(); r1++)
    {
        for(int r2 = 0; r2 < matrix2.at(0).size(); r2++)
        {
            for(int c1 = 0; c1 < matrix1.at(0).size(); c1++)
            {
               prodotto_matriciale += matrix.at(righe1).at(colonne1) * matrix2.at(colonne2).at(righe2);
               cout<< "Il risultato e'" << prodotto_matriciale <<endl;
           }
        }
    }
    return prodotto_matriciale;
}

void check(int& matrix1, int& matrix2, int& righe1, int& colonne1, int& righe2, int& colonne2)
{
    if(righe1 == colonne1)
    {
        matrix_create(matrix1, matrix2, righe1, colonne1, righe2, colonne2);
        prodotto(matrix1, matrix2, righe1, colonne1, righe2, colonne2);
    }
}

int main()
{
    int matrix1;
    int matrix2;
    int righe1;
    int righe2;
    int colonne1;
    int colonne2;
    check(matrix1, matrix2, righe1, colonne1, righe2, colonne2);
}