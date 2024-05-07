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
	matrix(const matrix<T>& m) : v(m.v) {}


	//	matrix(size_t rows, size_t _cols) : cols(_cols), v(rows* cols) {}
	matrix(size_t rows, size_t _cols, const T& x = T())
		: cols(_cols), v(rows* cols, x) {}


	explicit matrix(size_t dim) : matrix(dim, dim) {}

	const T& at(size_t i, size_t j) const{
		//è valido per i right value che possono essere const ma non è valido per i left value perchè non sono const
	
		return v[i * cols + j];
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

int main() {
	matrix<int> m;

	//prograsmmazione orientata ai vavlori => copy e default constructor e operatore di assegnamento
	int x;
	x = 7;
	int y = 8;
	x = y;

	matrix<int> m(20, 30);
	m(8, 10) = m(3, 4);

	matrix<int> m2(40, 50);
	m = m2;
	m.operator=(m2);

	m = m2 = m; //	m.operator=(m2.operator=(m));

	matrix<int> m3;
	m3 = m;
	matrix<int> m4(m3);
	/*
	se l'operatore fosse void non potrei fare m = (m2 = a)*/
}