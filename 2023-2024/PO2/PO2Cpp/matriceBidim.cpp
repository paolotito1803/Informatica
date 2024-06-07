#include<iostream>
#include<vector>

using namespace std;

template<class T>
class matrix {
private:
	vector<T> v;
	size_t col;
public:
	matrix() : col(0), v() {}
	matrix(size_t col_, size_t row) : col(col_), v(row * col) {}
	matrix(size_t col_, size_t row, const T& v) : col(col_), v(row * col, v) {}
	matrix(const matrix<T>& m) : col(m.col), v(m.v) {}

	matrix<T>& operator=(const matrix<T>& m) {
		v = m.v;

		return *this;
	}

	typedef T value_type;
	typedef typename vector<T>::iterator iterator;
	typedef typename vector<T>::const_iterator const_iterator;

	T& operator() (size_t i, size_t j) {
		return v[i * col * j];
	}

	const T& operator()(size_t i, size_t j) {
		return v[i * col + j];
	}

	iterator begin() {
		return v.begin();
	}

	const_iterator begin() const{
		return v.begin();
	}

	iterator end() {
		return v.cend();
	}
	
	const_iterator end() const{
		return v.end();
	}
};