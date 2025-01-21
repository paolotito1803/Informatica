#include "Classe_list_int.hpp"
#include <iostream>
#include <vector>
using namespace std;

struct List_int::Impl
{
	std::vector<int>v;
	void stampa_ric(const vector<int>& s, int pos)
	{
		if(pos < s.size())
		{
			std::cout << s.at(pos) << std::endl;
			stampa_ric(s,pos+1);
		}
	}
};

List_int::List_int()
{
	pimpl = new Impl;
}

List_int::List_int(const List_int& l)
{
	pimpl = new Impl;
	pimpl->v = l.pimpl->v; // deep copy
}

List_int::~List_int(){
	delete pimpl;
}

void List_int::prepend(int elem)
{
	pimpl->v.resize(pimpl->v.size()+1);
	for(int i = pimpl->v.size()-1; i> 0; i--)
	{
		pimpl->v.at(i) = pimpl->v.at(i-1);
	}
	pimpl->v.at(0) = elem;
}

void List_int::append(int elem)
{
	pimpl->v.push_back(elem);
}

void List_int::print() const
{
	pimpl->stampa_ric(pimpl->v,0);
}

