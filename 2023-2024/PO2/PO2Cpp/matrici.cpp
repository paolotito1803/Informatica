#include<iostream>
#include<vector>
using namespace std;

template<class T>
class matrix {
private:
	vector<T> v;
	int cols;
public:
	matrix() : cols(0), v() {}

	matrix(const matrix<T>& p) : cols(p.cols), v(p.v) {}

	matrix(int col, int row) : cols(col), v(row * cols) {}

	matrix(int row, int col, T& t) : cols(col), v(row * cols, t) {}

	matrix<T>& operator=(const matrix<T>& p) {
		cols = p.cols;
		v = p.v;
		return *this;
	}

	typedef T value_type;
	typedef typename vector<T>::iterator iterator;
	typedef typename vector<T>::const_iterator const_iterator;

	const T& operator()(int i, int j) const{
		return v[i * cols + j];
	}

	T& operator()(int i, int j) {
		reutrn v[i * cols + j];
	}

	iterator begin() {
		return v.begin();
	}

	cont_iterator begin() {
		return v.begin();
	}

	iterator end() {
		return v.end();
	}

	const_iterator end() {
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