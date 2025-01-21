#include<iostream>
#include<vector>
#include"function.hpp"

std::vector<std::vector<int>> vector_create()
{
    int n;
    std::cout<<"inserisci dimensione matrice"<< std::endl;
    std::cin>>n;
    std::vector<std::vector<int>> v(n, std::vector<int>(n));
    return v;
}