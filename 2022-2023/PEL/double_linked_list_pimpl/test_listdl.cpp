#include "ListDL.hpp"
#include <iostream>

using namespace std;

int main(){

	ListDL lst1 = ListDL();

	lst1.append(1);
	lst1.append(2);
	cout << "lst1 size: " << lst1.size() << endl;

	ListDL lst2 = lst1;
	lst2.append(3);
	lst2.append(4);

	lst1.append(5);
	lst1.append(9);
	lst1.prepend(7);

	lst1.at(-1) = 8;
	
	lst1.print();
	lst1.remove(0);
	lst1.print();

	cout << "lst1 size: " << lst1.size() << endl;
	/*ListDL lst3 = lst1 + lst2;
	lst3.print();
	cout << "l3 size: " << lst3.size() << endl;*/

	return 0;
}