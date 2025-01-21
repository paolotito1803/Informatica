#include<iostream>
#include<vector>
#include<cstdlib>// libreria presa da C
#include<ctime>// liberia presa da C

void inizializza( std::vector<int>& v, int carte)
{
    v.resize(carte);

    for(int i=0; i < carte; i++)
        v.at(i) = i;
}

void stampa( std::vector<int>& v)// stampa elementi--> passaggio per const reference così da non creare ulteriori copie
{
    for(int i = 0; i < v.size(); i++)
         std::cout << v.at(i) << std::endl;
}

int estrai(std::vector<int>& v)// ci dice che carta è stata estratta dal mazzo --> utilizzando un generatore pseudo-casuale
{
    int daestrarre = rand()%v.size();
    int result = v.at(daestrarre);
    v.at(daestrarre) = v.at(v.size() - 1);
    v.pop_back();// rimuove l'ultimo elemento dell'array
    return result;
}

int main()
{
    std::vector<int> mazzo;
    int ncarte;

    srand(time(NULL));// da il timestamp di quando faccio partire il programma ed è progressivo (IMPORTANTE) quando devo generare 
					   // numeri casuali

    std::cin>>ncarte;

    inizializza(mazzo, ncarte);
    stampa(mazzo);

    std::cout<< "Carte estratte" <<std::endl;
    for(int i = 0; i < 1; i++)
        std::cout<< estrai(mazzo) << std::endl;
    
    std::cout<< "Mazzo rimanente" <<std::endl;
    stampa(mazzo);
    return 0;
}