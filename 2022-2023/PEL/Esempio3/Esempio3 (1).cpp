#include <iostream>
#include <vector>


void leggi(std::vector<int>& tr){
	int numeroelementi;
	std::cin >> numeroelementi;
	tr.resize(numeroelementi); // creo effettivamente l'array di dimensione "numero elementi"
	for(int i = 0; i < numeroelementi; i++){
		std::cin >> tr.at(i); // non utlizzo il push_back() perchè anzichè aggiungere in coda, riscrivo all'indice i
	}

	/* posso riscrivere come
	for(auto& e : tr){ // in questo caso lavoro proprio sui valori di tr
		std::cin >> e;
	}

	// se invece faccio+
	for(outo e : tr){
		std::cin >> e; // lavoro sulla copia del valore in qui si trova "e"
	}*/
}

// lettura sullo "stile di C"
void leggi_1(std::vector<int>* tr){
	int numeroelementi;
	std::cin >> numeroelementi;
	for (int i = 0; i < numeroelementi; i++){
		std::cin >> tr->at(i);
	}
}

void leggi_2(std::vector<int>& tr){
	int numeroelementi;
	std::cin >> numeroelementi;
	tr.resize(numeroelementi);
	for (int i = 0; i < tr.size; i++)
	{
		std::cin >> tr.at(i);
	}
}


int main()
{
	/*Algoritmo di somma degli elementi dell'array --> detta Accumulo*/
	std::vector<int> v;
	int sum = 0;
	leggi(v);
	for (int i = 0; i < v.size(); i++) // l'invariante del ciclo (che è una proprietà del ciclo) è SOMMA
	{
		sum += v.at(i); // sum contiene ad ogni iterazione la somma degli elementi della porzione visitata
	}
	std::cout << sum << std::endl;

	// posso sostiuire con il foreach --> usato se devo in ogni caso scorrere il vettore e non devo mai modificarne la dimensione
	sum = 0;
	for(int e : v){
		sum += e; // ogni volta "e" viene istanziata e in essa viene copiato il valore della cella corrente
	}
	std::cout << sum << std::endl;

	/*Algoritmo del conteggio di elementi (contatore*/
	std::vector<int> vv;
	leggi_2(vv);
	int pari = 0; // invariante di ciclo
	for(auto e: v){
		if(e % 2 == 0){
			pari = pari + 1;
		}
	}
	std::cout << pari << std::endl;


	/*Creazione di matrici in C++ */
	std::vector<std::vector<int>> matrice; // equivale in una matrice
	int nr, nc;
	std::cin >> nr;
	std::cint >> nc;

	matrice.resize(mr); // vettore più esterno
	for(auto& e : matrice){
		e.resize(mc); // vettore più interno
	}

	// ciclo che scrive 0 in tutta la matrice
	for(auto& r : matrice){
		for(auto& c : r){
			c = 0;
		}
	}
    //copiare vettore
    vector <int> nuovo;
    nuovo = v;
	return 0;
}

