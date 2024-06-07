#include<iostream>
using namespace std;

template<class A, class B>
class pair {
private:
	A first;
	B second;
public:
	pair() : first(), second() {}

	pair(const pair<A, B>& m) : first(m.first), second(m.second) {}

	pair<A, B>& operator=(const pair<A, B>& m) {
		first = m.first;
		second = m.second;

		return *this;
	}

	const A& get_first() const {
		return first;
	}

	A& get_first() const {
		return first;
	}

	const B& get_second() const {
		return second;
	}

	B& get_second() const {
		return second;
	}

	bool operator==(const pair<A, B>& m) const {
		return this->first == m.first && this->second == m.second;
	}

	pair<A, B> operator++() {
		this->first++;
		this->second++;

		return *this;
	}

	pair<A, B>& operator++()
	{
		++first;
		++second;
		return *this;
	}

	bool operator!=(const pair<A, B>& p) const
	{
		return !(*this == p);
	}

	// altri operatori aritmentici ed in-place sono analoghi
	pair<A, B> operator+(const pair<A, B>& p) const
	{
		return pair<A, B>(first + p.first, second + p.second);
	}

	template<class C, class D>
	pair(const pair<C, D>& m) : first(m.first), second(m.second) {}
};


/*template<class A, class B>
class pair {
private:
	A first;
	B second;

public:
	pair() : first(), second() {} //default constructor

	pair(const pair<A, B>& m) : first(m.first), second(m.second) {} //copy constructor

	pair<A, B>& operator=(const pair<A, B>& m) { //opertore di assegnamento
		first = m.first;
		second = m.second;
		return *this;
	}

	const A& get_first() const{
		return first;
	}

	A& get_first() const {
		return first;
	}

	const B& get_second() const {
		return second;
	}

	B& get_second() const {
		return second;
	}

	pair<A, B> operator++(int)
	{
		pair<A, B> tmp(*this);
		first++;
		second++;
		return tmp;
	}

	pair<A, B>& operator++()
	{
		++first;
		++second;
		return *this;
	}

	bool operator==(const pair<A, B>& p) const
	{
		return first == p.first && second == p.second;
	}

	bool operator!=(const pair<A, B>& p) const
	{
		return !(*this == p);
	}

	// altri operatori aritmentici ed in-place sono analoghi
	pair<A, B> operator+(const pair<A, B>& p) const
	{
		return pair<A, B>(first + p.first, second + p.second);
	}

	pair<A, B>& operator+=(const pair<A, B>& p)
	{
		first += p.first;
		second += p.second;
		return *this;
	}

	template<class C, class D>
	pair(const pair<C, D>& a) : first(a.first), second(a.second) {}
};*/