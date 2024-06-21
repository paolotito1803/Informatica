#include<iostream>

using namespace std;

template<class C>
C sommatoria(C v) {
	
}

/*
	C deve avere sicuramente il costruttore di defualt, per copia ed eveutuali con altri parametri aggiuntivi. Inoltre deve avere
	l'operatore di assegnamento e gli iteratri begin e end. Come member type ha value_type e iterator e cons_iterator. 
	Deve avere l'operatore * per accedere agli elemento e quello di incrememtno. Inoltre sono utili anche gli operatori [] per 
	l'accesso by index
	*/