#include <iostream>
#include <limits> // libreria che contiene il massimo numero double rappresentabile
#include <istream>
#include <vector>
#include <cassert>
#include <iomanip>


// LETTURA DEI TOKEN
struct token {
	static constexpr double inf = std::numeric_limits<double>::max(); // imposta i parentesi e operatori al valore di +infinito
																	  // poichè non hanno un valore numero

	token() : m_type(0), m_value(inf){} // default constructor
	double get_value() const {return m_value;};
	char get_type() const {return m_type;};

	friend std::ostream& operator<<(std::ostream& os, token const& t){ // stampa del token
		os << "[m_type: " << t.m_type << "m_value" << t.m_value << "]";
		return os;
	}

	friend std::istream& operator>>(std::istream& is, token& t){ // acquisizione del token
		char c = 0;
		is >> c;
		if(c >= '0' && c <= '9'){
			is.putback(c); // riporta lo stream al carattere precedente a quello che sto leggendo per evitare letture "corrotte"
			is >> t.m_value;
		} else {
			t.m_type = c;
		}
		return is;	
	}  

	bool is_double() const {return m_type == 0 && m_value != inf;};
	bool is_open() const {return m_type == '(';};
	bool is_close() const {return m_type == ')';};
	bool is_add() const {return m_type == '+';};
	bool is_sub() const {return m_type == '-';};
	bool is_mult() const {return m_type == '*';};
	bool is_div() const {return m_type == '/';};
	bool is_eq() const {return m_type == '=';};

private:
	char m_type;
	double m_value;
};


/* CFG per il calcolatore */

// E -> P | E + P | E - P |
double E(std::vector<token>const& tokens, int& i)
{
	double res = P(tokens,i);
	token t = tokens[i];
	while(t.is_add() || t.is_sub())
	{
		++i;
		if(t.is_add()) res += P(tokens,i);
		if(t.is_sub()) res -= P(tokens,i);
		t = tokens[i];
	}
	return res;
}

// P -> T | P * T | P / T |
double P(std::vector<token>const& tokens, int& i)
{
	double res = T(tokens,i);
	token t = tokens[i];
	while(t.is_mult() || t.is_div())
	{
		++i;
		if(t.is_mult()) res *= T(tokens,i);
		if(t.is_div()) res /= T(tokens,i);
		t = tokens[i];
	}
	return res;
}

// T -> (double) | (E)
double T(std::vector<token>const& tokens, int& i)
{
	double res = 0;
	if(tokens[i].is_double())
	{
		res = tokens[i].get_value();
		i++;
	}
	else
	{
		assert(tokens[i].is_open());
		++i;
		res = E(tokens,i);
		assert(tokens[i].is_close());
		++i;
	}
	return res;
}


int main()
{
	std::vector<token> tokens;

	do{
		try{
			token t; // viene chiamato il default constructor
			std::cin >> t;
			/*if(t.is_double()){
				std::cout << t.get_value() << std::endl;
			}
			else{
				std::cout << t.get_type() << std::endl;
			}*/
			tokens.push_back(t);
		}catch(std::runtime_error const& e){
			std::cerr << e.what() << std::endl; // e.what() ritorna la stringa con il messaggio di errore
			break;
		}
	} while(!tokens.back().is_eq()); // legge l'ultimo dato e verifica che sia il segno "="

	int i = 0;
	std::cout << "the result is: " << E(tokens,i) << std::endl;
	tokens.clear();
	return 0;
}