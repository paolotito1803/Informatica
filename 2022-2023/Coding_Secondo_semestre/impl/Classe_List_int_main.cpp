#include "Classe_List_int.hpp"
#include<iostream>

int main()
{
	List_int a;

	a.append(10);
	a.append(20);
	a.append(40);

	a.print();
	return 0;
}