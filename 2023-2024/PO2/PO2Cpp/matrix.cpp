#include<iostream>
#include<vector>
using namespace std;

template <class T>
class matrix{
	//fare vector lineare è migliore di fare un vector<vector>> fa un doppio calcolo di offset mentre dritto sono meno istruzioni perchè 
	//è un conto unico in quando ho una sola dimensione
private:
	size_t cols;
	vector<T> v;

public:
	matrix() : v() {}
	matrix(const matrix<T>& m) : cols(m.cols), v(m.v) {}

	template <class S>
	matrix(const matrix<S>& m) : cols(m.cols), v(m.get_rows()* m.get_cols()) {  //conversion constructor, serve per convertire, può diventare copy constructor
		//non si usa maai perchè per scorrere vector si usano gli iteratori
		for (int i = 0; i < v.size(); ++i)
			v[i] = m.v[i];
	}

	//	matrix(size_t rows, size_t _cols) : cols(_cols), v(rows* cols) {}
	matrix(size_t rows, size_t _cols, const T& x = T())
		: cols(_cols), v(rows* cols, x) {}


	explicit matrix(size_t dim) : matrix(dim, dim) {}

	typedef T value_type;
	typedef vector<T>::iterator iterator;
	typedef vector<T>::const_iterator const_iterator;

	iterator begin()
	{
		return v.begin();
	}

	iterator end()
	{
		return v.end();
	}

	const_iterator begin() const
	{
		return v.begin();
	}

	const_iterator end() const
	{
		return v.end();
	}

	const T& at(size_t i, size_t j) const{
		//è valido per i right value che possono essere const ma non è valido per i left value perchè non sono const
	
		return v[i * cols + j];
	}

	operator const vector<T>& () const	{
		return v;
	}

	matrix<T>& operator= (const matrix& a) {
		cols = a.cols;
		v = a.v;
		return *this;
	}

	const T& operator()(size_t i, size_t j) const
	{
		return v[i * cols + j];
	}

	T& operator()(size_t i, size_t j)
	{
		return v[i * cols + j];
	}


	size_t get_cols() const { return cols; }

	size_t get_rows() const { return v.size() / cols; }
};

//stampa
template <class C>
ostream& operator<<(ostream& os, const C& m)
{
	for (typename C::iterator it = m.v.begin(); it != m.v.end(); ++it) //:: metodo di accesso di un tipo 
	{																	//invoco operatore di shift << che associa a sinistra con os e a destra c'è il dereference di it, 
																		//tutto questo ritorna uno stream in modo da poter essere concatenato
		typename C::value_type x = *it;
		os << x << " ";
	}
	return os;
} 
		


int main() {
	matrix<int> m;

	//prograsmmazione orientata ai vavlori => copy e default constructor e operatore di assegnamento
	matrix<int> m(20, 30);
	m(8, 10) = m(3, 4);

	matrix<int> m2(40, 50);
	m = m2;
	m.operator=(m2);

	m = m2 = m; //	m.operator=(m2.operator=(m));

	matrix<int> m3;
	m3 = m;
	matrix<int> m4(m3);
	matrix<int> m1(20, 30);
	matrix<double> m5(m1);

	cout << 7;
	/*
	se l'operatore fosse void non potrei fare m = (m2 = a)*/
	
}