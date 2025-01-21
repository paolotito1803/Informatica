#include <iostream>
#include <vector>
#include <istream>
#include <limits>

class Game{
public:
	Game(int righe, int colonne, int mine);

	void mostra() const;
	void mostra_soluzione() const;

	bool mossa(int r, int c);
	bool vittoria() const;

private:
	int fiori;
	std::vector<std::vector<char>> tab;
	int conta_vicini(int r, int c) const;
};

Game::Game(int righe, int colonne, int mine)
{
	fiori = mine;
	int r, c;
	tab.resize(righe);

	for (int i = 0; i < righe; ++i)
	{
		tab.at(i).resize(colonne);
	}

	srand(time(NULL));

	//piazza le mine
	for (int i = 0; i < mine; ++i)
	{
		do
		{
			r = rand() % righe;
			c = rand() % colonne;
		} while (tab.at(r).at(c) != 0);

		tab.at(r).at(c) = -1;
	}

	//metti i numeri
	for (int r = 0; r < righe; ++r)
	{
		for (int c = 0; c < colonne; ++c)
		{
			if (tab.at(r).at(c) != -1)
			{
				tab.at(r).at(c) = conta_vicini(r, c);
			}
		}
	}
}


void Game::mostra() const
{
	for (int r = 0; r < tab.size(); ++r)
	{
		for (int c = 0; c < tab.at(r).size(); ++c)
		{
			int e = tab.at(r).at(c);
			if (e == 10)
				std::cout<<" ";
			else if (e > 10)
				std::cout<<e - 10;
			else
				std::cout<<"I";
		}
		std::cout<<std::endl;
	}
}

void Game::mostra_soluzione() const
{
	for (int r = 0; r < tab.size(); ++r)
	{
		for (int c = 0; c < tab.at(r).size(); ++c)
		{
			int e = tab.at(r).at(c);
			if (e == 10 || e == 0)
				std::cout<<" ";
			else if (e > 10)
				std::cout<<e - 10;
			else if (e > 0)
				std::cout<<e;
			else
				std::cout<<"X";
		}
		std::cout<<std::endl;
	}
}

bool Game::mossa(int r, int c)
{
	if (r >= 0 && r<tab.size() && c>=0 && c<tab.at(r).size() && tab.at(r).at(c) < 10) //posizione valida
	{
		if (tab.at(r).at(c) == -1)
		{	
			return false;
		}
		else{
			if (tab.at(r).at(c) > 0)
			{
				tab.at(r).at(c) += 10;
				return true;
			}
			else
			{
				tab.at(r).at(c) = 10; //scopro lo zero
				for (int rc = r-1; rc <= r+1; ++rc)
					for (int cc = c-1; cc < c+1; ++cc)
						mossa(rc, cc);
				return true;
			}
		}
	}
	else
		return false;
}


bool Game::vittoria() const
{
	int conta = 0;
	for (int r = 0; r < tab.size(); ++r)
	{
		for (int c = 0; c < tab.at(r).size(); ++c)
		{
			if (tab.at(r).at(c) < 10)
			{
				conta++;
			}
		}
	}
	return (conta == fiori);
}

int Game::conta_vicini(int r, int c) const
{
	return -1;
}

int main()
{
	Game g(10, 10, 10);
	g.mostra_soluzione();

	return 0;
}