#include <iostream>
#include <string>

using namespace std;

class StringPascal
{
public:
	StringPascal();
	StringPascal(const string& s);
	StringPascal(const StringPascal& copy);
	~StringPascal(); // Distruttore
	void stampaStringa() const; // faccio in modo che la funzione non possa modificarne lo stato
	void set(const string& s);
	void setsize(int dim);
	void setcar(int pos, char c);
	void getchar(int pos);

private:
	unsigned char buffer[256];
};

// costruttori possibili

StringPascal::StringPascal() // COSTRUTTORE DI CLASSE
{
	buffer[0] = 0; // in questo caso creo la stringa vuota
	cout << "Chiamato il default constructor" << endl;
}

StringPascal::StringPascal(const string& s)
{
	set(s);
	cout << "Chiamato construttore con string s come parametro" << 	endl;
}


StringPascal::StringPascal(const StringPascal& copy) // COPY CONSTRUCTOR
{
	buffer[0] = copy.buffer[0];
	for(int i = 1; i <= copy.buffer[0]; i++)
	{
		buffer[i] = copy.buffer[i];
	}
	cout << "Chiamato il copy constructor" << endl;
}

StringPascal::~StringPascal()
{
	cout << "Chiamato il Distruttore" <<endl;
}

// implementazioni funzioni
void StringPascal::set(const string& s)
{
	if(s.length() <= 255)
	{
		buffer[0] = s.length();
	}
	else
	{
		buffer[0] = 255;
	}

	for(int i = 1; i <= buffer[0]; i++)
	{
		buffer[i] = s.at(i-1);
	}
}

void stampax2(const StringPascal input) // richiama il copy constructor --> poichè esso lavora sulla copia di parametro effettivo. 
								   // In caso di reference il copy constructor non viene chiamato
{
	input.stampaStringa();
	input.stampaStringa();
}

void StringPascal::stampaStringa() const
{
	for(int i = 1; i <= buffer[0]; i++)
	{
		cout << buffer[i];
	}
	cout << endl;
}

int main(int argc, char const *argv[])
{
	//StringPascal* p = new StringPascal  --> crea sia il puntatore che l'oggetto puntato
	string str = "Hello";
	StringPascal s(str);
	StringPascal p = s; // inizializzazione e invocazione del copy constructor SE INVECE FACESSI   StringPascal p;
	                    // p = s è un assegnamento

	stampax2(s);
	stampax2(s);

	/*StringPascal* t = new StringPascal[10];  // ogni oggetto viene chiamato il costruttore
	delete[] t; // viene chiamato il distruttore n volte a seconda di quanti oggetti ho allocato in memoria */
	return 0;
}