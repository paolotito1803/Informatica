#include <iostream>

template<typename T> class stack;

template<typename T> class stack{
    struct nodo{
        T t;
        nodo* next;  
    };
  private:
    nodo* m_front;  //cima dello stack
    nodo* m_back;   //fondo dello stack
  public: 
    stack(); //default constructor
    stack(const stack<T>& l); //copy constructor
    ~stack(); //destructor
    stack<T>& operator=(const stack<T>& l); //copy assigment
    stack<T> operator+(const T& l); 
    stack<T>& operator+=(const T& l);
    stack<T>& operator--(); //pop back
    T& top() const;
    void push_front(T t); //aggiunge elemento all'inizio
    void pop_front();    //toglie elemetno dall'inizio
    void push_back(T t); //aggiunge elemetno alla fine 
    void pop_back();     //toglie elemento alla fine
    bool empty() const; //determinare se lista vuota
};

template <typename T>
stack<T>::stack() { //default constructor
  m_front = nullptr;
  m_back = nullptr;  
}  

template <typename T>
stack<T>::stack(const stack<T>& l) :stack(){ //Copy constructor
    *this=l;
} 

template <typename T>
bool stack<T>::empty() const { //determinare se lista vuota
    return m_front == nullptr;
}

template <typename T>
stack<T>::~stack(){ //destructor
    while (!empty()) pop_back();
}

template <typename T>
void stack<T>::push_front(T t) { //aggiunge elemento all'inizio
    if (empty()) {
       m_front = new nodo{t, nullptr};
       m_back = m_front;
       return;
    }
    m_front = new nodo{t, m_front};
}

template <typename T>
void stack<T>::pop_front(){  //toglie elemetno dall'inizio
    if(!empty()){
        nodo* pc = m_front;
        m_front = m_front->next;
        delete pc;
        if(empty())
            m_back = nullptr;
    }
    
}

template <typename T>
void stack<T>::push_back(T t){ //aggiunge elemetno alla fine
     if(empty()){
        push_front(t);
    }else {
        m_back->next = new nodo{t, nullptr};
        m_back = m_back->next;
    }
}

template <typename T>
void stack<T>::pop_back() { //toglie elemento alla fine
    if (!empty()) {
        if (m_front == m_back) {
            nodo* pc=m_front;
            m_front= nullptr;
            m_back= nullptr;
            delete pc;
        }
        else{
            nodo *prev = m_front;
            while (prev->next != m_back)
                prev = prev->next;
            m_back = prev;
            prev = prev->next;
            m_back->next = nullptr;
            delete prev;
        }
}



template <typename T>
stack<T>& stack<T>::operator--(){ // funzionamento pop_back
    if(m_front!=nullptr)
        pop_back();
    return *this;
}

template <typename T>
stack<T>& stack<T>::operator=(const stack<T>& l){ //Copy assigment
    if(this == &l) //caso di autoassegnamento 
        return *this;
    while(!empty())
       pop_back();
    for(auto ptr=l.m_front; ptr!=nullptr; ptr=ptr->next){
        push_back(ptr->t);
    }
    return *this;
}

template <typename T>
stack<T>& stack<T>::operator+=(const T& l){ //push di "a" in cima allo stack
    nodo* nuovo = new nodo;
     nuovo->t = l;
     nuovo->next = nullptr;
     if(m_front==nullptr)
        push_front(l);
     else 
        push_back(l);
    return *this;
}

template <typename T>
stack<T> stack<T>::operator+(const T& l){
    stack<T> new_l = stack(*this);
    new_l += l;
    return new_l;
}

template <typename T>
T& stack<T>::top() const{
    return m_back->t;
}
int main(){
	
	int N {};
	std::cin >> N;
	N *= 2;
	
	using T = int;
	
	stack<T> S1;
	
	T x,y;
	for(int i=0;i<N/2;++i){
		std::cin >> x >> y;
		(S1 += x) += y;
	}
	
	stack<T> S2 = stack<T>{S1} + N;
	
	S2 = S2;
		
	for(int i = 0; i<N-1;++i){
		std::cout << (--S1).top()++ << std::endl;
		S2 += S1.top();
	}

	for(int i = 0; i<2*N;++i){
		
		std::cout << S2.top() << std::endl;
		--S2;
		
	}
	
	for(int i = 0; i<100;++i) --S2;
	
}