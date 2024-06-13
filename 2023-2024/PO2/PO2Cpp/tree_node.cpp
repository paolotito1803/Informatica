#include<iostream>
#include<vector>
using namespace std;

template<class T>
class tree_node {
public:
	T data;
	tree_node<T>* left, right;

	tree_node() : data(0), left(), right() {}

	tree_node(const tree_node<T>& m) : data(m.data), left(m.left), right(m.right) {}

	~tree_node() {
		if (left != nullptr) {
			delete left;
			left = nullptr;
		}
		if (right != nullptr) {
			delete right;
			right = nullptr;
		}
	}

	tree_node<T>& operator=(const tree_node<T>& t) {
		data = t.data;
		right = t.right;
		left = t.left;

		return *this;
	}

	bool eq(tree_node<T>& a, tree_node<T> p) {
		if (a != nullptr && p != nullptr) {
			return a.data == p.data && eq(a->left, p->left) && eq(a->right, p->right);
		}
		return false;
	}

	bool operator==(tree_node<T>& p) const {
		return eq(this, p);
	}

private:
	vector<T> v;

	void dfs(vector<T>& v) {
		v.push_back(data);
		if (left != nullptr)
			left->dfs(v)
			if (right != nullptr)
				right->dfs(v);
	}

	const_iterator begin() {
		return v.beign();
	}

	iterator begin() {
		return v.begin();
	}

	const_iterator end() {
		return v.end();
	}

	iterator end() {
		return v.end;
	}
};


/*template<class T>
class tree_node {
public:
	T data;
	tree_node<T>* left, right;

	using value_type = T;
	using const_iterator = typename vector<T>::const_iterator;
	using iterator = typename vector<T>::iterator;

	tree_node() : data(0), left(nullptr), right(nullptr) {}

	tree_node(const tree_node<T>& m) : data(m.data), left(m.left), right(m.right) {}

	~tree_node() {
		if (left != nullptr) {
			delete left;
			left = nullptr;
		}

		if (right != nullptr) {
			delete right;
			right = nullptr;
		}
	}

	tree_node<T>& operator=(const tree_node<T>& m) {
		data = m.data;
		left = m.left;
		right = m.right;

		return *this;
	}

	static bool are_equals(const tree_node<T>* a, const tree_node* b) {
		return a == b || (a != nullptr && b != nullptr && *a = *b);
	}

	bool operator==(const tree_node<T>& m) const {
		return data == m.data && are_equals(left, m.left) && are_equals(right, m.right);
	}
private:
	vector<T> v;

	void dfs(vector<T>& v) {
		v.push_back(data);
		if (left != nullptr) left->dfs(v);
		if (right != nullptr) right->dfs(v);
	}

	const_iterator begin() {
		return v.beign();
	}

	iterator begin() {
		return v.begin();
	}

	const_iterator end() {
		return v.end();
	}

	iterator end() {
		return v.end;
	}

	static tree_node<T>* get_next_node(const tree_node<T>* m) {
		if (m->left != nullptr) {
			return m->left;
		}
		if (m->right != nullptr)
			return m->right;
		else
			return m;

	}

};*/