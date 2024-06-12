#include<iostream>
#include<vector>
using namespace std;

template<typename T>
class matrix {
private;
	vector<T> v > v;
	int col;
public:
	matrix() : v(), col(0) {}
	matrix(const matrix<T>& m) : v(m.v), col(m.col) {}
	matrix(int row, int col) : col(col), v(row * col) {}
	matrix(int row, int col, const T& p) : col(col), v(row * col, p) {}

	matrix<T>& operator=(const matrix<T>& m) {
		v = m.v;
		col = m.col;

		return *this;
	}

	typedef T value_type;
	typedef typename vector<T>::iterator iterator;
	typedef typename vector<T>::const_iterator const_iterator;

	T& operator()(int i, int j) {
		return v[i * col + j];
	}

	const T& operator()(int i, int j) const {
		return v[i * col + j];
	}

	iterator begin() {
		return v.begin();
	}

	iterator end() {
		return v.end();
	}

	const iterator begin() const {
		return v.begin();
	}

	const iterator end() const {
		return v.end();
	}
};





/*template <class T>
class matrix {
private:
	size_t col;
	vector<T> v;

public:
	matrix() : col(0), v() {}
	matrix(const matrix& m) : col(m.col), v(m.v) {}
	matrix(size_t colon, size_t row) : col(colon), v(row * col) {}

	typedef T value_type;
	typedef typename vector<T>::iterator iterator;
	typedef typename vector<T>::const_iterator const_iterator;

	matrix<T>& operator=(const matrix<T>& m) {
		col = m.col;
		v = m.v;

		return *this;
	}
	
	T& operator() (size_t i, size_t j) {
		return v[i * col + j];
	}

	const T& operator() (size_t i, size_t j) const {
		return v[i * col + j];
	}

	iterator begin() {
		return v.begin();
	}

	iterator end() {
		return v.end();
	}

	const_iterator begin() const {
		return v.begin();
	}

	const_iterator end() const {
		return v.end();
	}
};*/