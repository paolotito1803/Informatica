#include <iostream>;
#include <functional>;

using namespace std;


template <class X, class Y>
class fun_seq
{
private:
	const X a, b, dx;
	const function<Y(const X&)> f;

public:
	using value_type = pair<X, Y>;

	fun_seq(const X& _a, const X& _b, const X& _dx, const function<Y(const X&)>& _f) : a(_a), b(_b), dx(_dx), f(_f) {}

	class iterator
	{
	private:
		X x;
		fun_seq<X, Y> that;

	public:
		explicit iterator(const X& _x, const fun_seq<X, Y>& _that) : x(_x), that(_that) {}

		iterator(const iterator& it) : x(it.x), that(it.that) {}

		pair<X, Y> operator*() const
		{
			return pair<X, Y>(x, that.f(x));
		}

		bool operator!=(const iterator& it)
		{
			return !(x > it.x - that.dx && x < it.x + that.dx);
		}

		iterator operator++()
		{
			iterator r(*this);
			x += that.dx;
			return r;
		}
	};

	iterator begin() const
	{
		return iterator(a, *this);
	}

	iterator end() const
	{
		return iterator(b, *this);
	}


};