#include<iostream>

class ListInt{
	public:
		ListInt();  //Deafult Constructor
		~ListInt();  //Destructor
		ListInt(const ListInt& s); //Copy constructor

		void prepend(int el);
		void append(int el);
		void print() const;
		void read();

		bool set_zero_neg();

		int& at(unsigned int pos);
		const int& at(unsigned int pos) const;
	private:
		struct Cell {
			int info;
			Cell* next;
		};

		typedef Cell* Pcell;

		Pcell head;
		int dummy;

		void destroy(Pcell pc);
		Pcell copy(Pcell source);

		bool set_zero_neg_rec(Pcell l);

};

ListInt::ListInt() {
	head = nullptr;
}

ListInt::~ListInt() {
	destroy(head);
}
			
void ListInt::destroy(Pcell pc) {

	if (pc!=nullptr) {
		destroy(pc->next);
		delete pc;
	}
}

void ListInt::read() {
	destroy(head);
	head=nullptr;
	int elem;
	std::cin>>elem;

	for (int i=0; i<elem; i++) {
		int e;
		std::cin>>e;
		append(e);
	}
}


void ListInt::append(int el) {
	if (head==nullptr) 
		prepend(el);
	else {
		Pcell pc = head;
		while (pc->next!=nullptr)
			pc = pc->next;
		pc->next = new Cell;
		pc->next->info = el;
		pc->next->next = nullptr;
	}
}

void ListInt::prepend(int el) {
	Pcell newone = new Cell;
	newone->info = el;
	newone->next = head;
	head = newone;
}

void ListInt::print() const {
	Pcell pc = head;
	while (pc) {
		std::cout<<pc->info<<std::endl;
		pc = pc->next;
	}
}


ListInt::ListInt(const ListInt& s) {
	head = copy(s.head);
}

ListInt::Pcell ListInt::copy(Cell* source) {
	if (source == nullptr)
		return nullptr;
	else {
		Pcell dest = new Cell;
		dest->info = source->info;
		dest->next = copy(source->next);
		return dest;
	}
}


int& ListInt::at(unsigned int pos) {
	Pcell pc = head;
	while (pc!=nullptr && pos>0) {
		pc = pc->next;
		pos--;
	}

	if (pc) 
		return pc->info;
	else
		return dummy;
}

const int& ListInt::at(unsigned int pos) const {
	Pcell pc = head;
	while (pc!=nullptr && pos>0) {
		pc = pc->next;
		pos--;
	}

	if (pc) 
		return pc->info;
	else
		return dummy;
}


bool ListInt::set_zero_neg(){
    return set_zero_neg_rec(head);
}

bool ListInt::set_zero_neg_rec(Pcell l) {
   if(l == nullptr) return false;
   else{
       if(l->info <0){
           bool check = set_zero_neg_rec(l->next);
           if(check == true){
                l->info = 0;
           }
           return true;
       }
       else{
        return set_zero_neg_rec(l->next); 
       }
   }
   
}
int main() {
	ListInt l;
	
	l.read();

	l.set_zero_neg();
	
	l.print();

	return 0;
}