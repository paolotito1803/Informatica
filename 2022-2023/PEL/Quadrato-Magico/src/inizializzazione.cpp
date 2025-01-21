#include<iostream>
#include<vector>
#include"function.hpp"

std::vector<std::vector<int>> inizializzazione(std::vector<std::vector<int>>& v)
{
    int n = v.size();
    for(int r=0; r<n; r++)
    {
        for(int c=0; c<n; c++)
            std::cin>>v.at(r).at(c);
    }
   return v;
}