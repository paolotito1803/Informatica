#include<iostream>

using namespace std;

template<class C>
typename C::value_type  sommatoria(C v) {
	typename C::value_type sum;
	for (typename C::iterator i = v.begin(); i != v.end(); ++i)
		sum = sum + *i;
	return sum;
}

/*
	C deve avere sicuramente il costruttore di defualt, per copia ed eveutuali con altri parametri aggiuntivi. Inoltre deve avere
	l'operatore di assegnamento e gli iteratri begin e end. Come member type ha value_type e iterator e cons_iterator. 
	Deve avere l'operatore * per accedere agli elemento e quello di incrememtno. Inoltre sono utili anche gli operatori [] per 
	l'accesso by index
*/

/*
SOLUZIONE SPANO'
emplate <class Container>
ostream& operator<<(ostream& os, const Container& c)
{
	os << "[";
	for (typename Container::const_iterator it = c.begin(); it != c.end(); ++it)
		os << " " << *it;
	os << "]";
	return os;
}

template <class Container>
typename Container::value_type sum(const Container& c)
{
	typename Container::value_type r;
	for (typename Container::const_iterator it = c.begin(); it != c.end(); ++it)
	{
		r += *it;
	}
	return r;
}


int main()
{
}
*/