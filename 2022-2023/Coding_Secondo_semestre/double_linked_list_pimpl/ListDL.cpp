#include "ListDL.hpp"
#include <iostream>
#include <stdexcept>
#include <string>

struct cella{

	int info;
	cella* next;
	cella* prev;
};

typedef cella* pcella;

struct ListDL::impl{
	pcella head;
	pcella tail;
	int numel;
};

ListDL::ListDL(){

	pimpl = new impl;
	pimpl->head = nullptr;
	pimpl->tail = nullptr;
	pimpl->numel = 0;
}

ListDL::ListDL(const ListDL& s){

	pimpl = new impl;
	pimpl->head = nullptr;
	pimpl->tail = nullptr;
	pimpl->numel = 0;

	pcella h = s.pimpl->head;
	while(h != nullptr){
		append(h->info);
		h = h->next;
	}
}

ListDL::~ListDL(){

	pcella pc = pimpl->head;

	while(pc != nullptr){
		pc = pc->next;
		delete pimpl->head;
		pimpl->head = pc;
	}
	delete pimpl;
}

// return the number of elements in the list
int ListDL::size() const{
	return pimpl->numel;
}

// append a new element e
void ListDL::append(int e){

	pcella nuova = new cella;
	nuova->next = nullptr;
	nuova->prev = pimpl->tail;
	nuova->info = e;

	if(pimpl->tail != nullptr)
		pimpl->tail->next = nuova;
	else
		pimpl->head = nuova;

	pimpl->tail = nuova;
	pimpl->numel += 1;
}

// prepend a new element e
void ListDL::prepend(int e){

	pcella nuova = new cella;
	nuova->prev = nullptr;
	nuova->next = pimpl->head;
	nuova->info = e;

	if(pimpl->head != nullptr)
		pimpl->head->prev = nuova;
	else
		pimpl->tail = nuova;

	pimpl->head = nuova;
	pimpl->numel += 1;
}

// print the list
void ListDL::print() const {

	pcella p = pimpl->head;

	std::cout << "(";
	while(p != nullptr){
		std::cout << p->info << " ";
		p = p->next;
	}
	std::cout << ")" << std::endl;
}

// return element at position pos
int& ListDL::at(int pos){

	if (pos < 0)
		pos = size() + pos;

	// if pos is still negative, index is out of bounds
	if (pos < 0)
		throw std::invalid_argument("invalid position, list has " + std::to_string(size()) + " elements");

	pcella pc = pimpl->head;
	while(pc != nullptr && pos>0){
		pc = pc->next;
		pos--;
	}
	if(pc != nullptr)
		return pc->info;
	else
		throw std::invalid_argument("invalid position, list has " + std::to_string(size()) + " elements");
}

// remove element at index pos
void ListDL::remove(int pos){

	if (pos < 0)
		pos = size() + pos;

	// if pos is still negative, index is out of bounds
	if (pos < 0)
		throw std::invalid_argument("invalid position, list has " + std::to_string(size()) + " elements");

	pcella pc = pimpl->head;
	while(pc != nullptr && pos>0){
		pc = pc->next;
		pos--;
	}

	if(pc != nullptr) {// here we need to delete pc

		if(pc->prev == nullptr) // pc is the head
			pimpl->head = pc->next;

		else //we have a cell before pc
			pc->prev->next = pc->next;

		if(pc->next == nullptr) // pc is the tail
			pimpl->tail = pc->prev;

		else // we have a cell after pc
			pc->next->prev = pc->prev;

		delete pc;
		pimpl->numel -= 1;
	}
	else
		throw std::invalid_argument("invalid position, list has " + std::to_string(size()) + " elements");
}


bool ListDL::operator==(const ListDL& l) const {

	pcella pc1 = pimpl->head;
	pcella pc2 = l.pimpl->head;
	bool uguali = true;

	while(pc1 != nullptr && pc2 != nullptr && uguali){

		if(pc1->info != pc2->info)
			uguali = false;
		else{
			pc1 = pc1->next;
			pc2 = pc2->next;
		}
	}
	return (pc1 == pc2);
}

const ListDL& ListDL::operator=(const ListDL& l) {

	if( this != &l){

		// delete all cells in this
		pcella pc = pimpl->head;
		while (pc != nullptr){
			pc = pc->next;
			delete pimpl->head;
			pimpl->head = pc;
		}

		pimpl->head = nullptr;
		pimpl->tail = nullptr;
		pimpl->numel = l.pimpl->numel;

		pc = l.pimpl->head;
		while(pc != nullptr){
			append(pc->info);
			pc = pc->next;
		}
	}
	return *this;
}

// concatenate two lists and return a new list
ListDL ListDL::operator+(const ListDL& l) const {

	ListDL out = ListDL(*this);

	pcella pc = l.pimpl->head;
	while(pc != nullptr){
		out.append(pc->info);
		pc = pc->next;
	}
	return out;
}
