#include <iostream>
#include "list.hpp"
#include "list.cpp"

template<typename Val>
std::ostream& operator<<(std::ostream& os, List<Val> const& l){
	auto ptr = l.front();
	while(ptr){
		os << ptr->val;
		if(ptr->next != nullptr){
	    	os << " -> ";
	    }
		ptr = ptr->next;
	}
	return os;
}

template<typename Val>
std::istream& operator>>(std::istream& is, List<Val> const& l){
	Val v;
	while(is >> v){
		l.push_back(v);
	}
	return is;
}

int main(){
	List<int> l;

	l += 29000;
	l += 89;
	l += 4;

	std::cout << l <<std::endl;

	// concatenazione di due liste
	List<int> g;
	g.push_back(29000);
	g.push_back(89);
	g.push_back(4);

	l += g;

	std::cout << l << std::endl;

	l[2] = 13;
	std::cout << "After the changes "<< l << std::endl;


	List<int> x = g; // chiamo il copy constructor
	std::cout << x << std::endl;

	List<int> z; // copy assignement operator
	z = x;

	std::cout << "z is: " << z << std::endl;

	List<int> my_list_int = get_some_list_int();
	std::cout << my_list_int << std::endl;


	for(auto it = my_list_int.begin(); it != my_list_int.end(); it++){
		std::cout << *it << std::endl;
	}

	auto it = my_list_int.begin();
	it++;
	*it = 254367;
	
	for(auto it = my_list_int.begin(); it != my_list_int.end(); it++){
		std::cout << *it << std::endl;
	}
	return 0;
}