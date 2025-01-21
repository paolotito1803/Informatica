#include <iostream>

class List_int
{
public:
	List_int();
	List_int(const List_int& l);
	~List_int();
	
	void prepend(int elem);
	void append(int elem);
	void print() const;

private:
	struct Impl;
	Impl* pimpl; // utilizzo l'idioma pimpl
};