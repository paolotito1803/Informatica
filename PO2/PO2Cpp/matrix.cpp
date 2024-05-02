#include<iostream>
#include<vector>
using namespace std;

template <class T>
class matrix{
	//fare vector lineare è migliore di fare un vector<vector>> fa un doppio calcolo di offset mentre dritto sono meno istruzioni perchè 
	//è un conto unico in quando ho una sola dimensione
private:
	vector<T> v;
public:
	matrix() : v() {}
	matrix(const matrix<T>& m) : v(m.v) {}
	matrix(size_t rows, size_t cols) : v(rows* cols) {}
	explicit matrix(size_t dim) : matrix(dim, dim) {}

	const T& at(size_t i, size_t j) const 
		//è valido per i right value che possono essere const ma non è valido per i left value perchè non sono const
	{
		return v[i * cols + j];
	}


};

int main() {
	matrix<int> m;

	//prograsmmazione orientata ai vavlori => copy e default constructor e operatore di assegnamento
	matrix<double> p;
	p = matrix<double>();
	matrix<double> b();

}