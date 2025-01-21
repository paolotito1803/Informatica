#pragma once

template <typename Val>
class list {
    /* private struct node holding the values in the list */
    struct node {
        Val val;
        node* next;
    };

   

public:
    /* default constructor */
    list();
    /* constructor with one value v */
    list(Val v);

    /*Copy constructor*/
    list(list<Val> const& rhs);

    /*Move costructor*/
     list(list<Val>&& rhs);

    /*Move assigment operator*/
    list<Val>& operator=(list<Val>&& rhs); 

    /*Copy assigment operator*/
    list<Val>& operator=(list<Val> const& rhs);
    
    /* destructor */
    ~list();

    /* return a const* to first node */
    node const* front() const;


    /* return a const* to last node */
    node const* back() const;

    /* push to the front of the list a new element with value v */
    void push_front(Val v);
    /* push to the back of the list a new element with value v */
    void push_back(Val v);

    /* remove first element */
    void pop_front();
    /* remove last element */
    void pop_back();

    /* is the container empty? */
    bool empty() const;

    /* is this container equal to rhs? */
    bool operator==(list<Val> const& rhs) const;
    /* is this container not equal to rhs? */
    bool operator!=(list<Val> const& rhs) const;

    /* Append to the back of the container the rhs
    and return a reference to *this.
    Why do we return a reference?
    Because we may want to write: l1 += l2 += l3; */
    list<Val>& operator+=(list<Val> const& rhs);
    /* Appends v at the back of the container
    and return a reference to *this. */
    list<Val>& operator+=(Val v);

    /* return a const reference to the val of the i-th node if it exists */
    Val const& operator[](uint64_t i) const;
    /* return a reference to the val of the i-th node if it exists */
    Val& operator[](uint64_t i);

    /* prefix decrement: remove head and return a reference to *this */
    list<Val>& operator--();
    /* postfix decrement: remove tail and return a reference to *this
       Note:
       the int parameter is a dummy parameter used to differentiate between
       prefix and postfix decrement. */
    list<Val>& operator--(int dummy);

     // struct per l'utilizzo degli iteratori
	struct iterator{ 
		// proprietà degli iteratori
		using iterator_category = std::forward_iterator_tag; // serve anche ad indicare quali algoritmi posso utilizzare 
															 // con questa categoria	
		using value_type = Val;
		using pointer = Val*;
		using reference = Val&;

		// constructor
		iterator(node* ptr);

		// let the compiler define for us all the other methods like destructor, copy constructor/assignment

		// prefix increment
		iterator& operator++();

		// posfix increment
		iterator operator++(int /* dummy */);
		
		reference operator*() const;

		/*
			useful when Val is a struct with fields
			So I can write: it->x;
			This is equivalent to: (*it).x;
		*/
		pointer operator->() const;


		bool operator==(iterator const& rhs) const;
		bool operator!=(iterator const& rhs) const;
		
	private:
		node* m_ptr;
	};

    struct const_iterator{ 
		// proprietà degli iteratori
		using iterator_category = std::forward_iterator_tag; // serve anche ad indicare quali algoritmi posso utilizzare 
															 // con questa categoria	
		using value_type = const Val;
        using pointer = Val const*;
        using reference = Val const&;


		// constructor
		const_iterator(node* ptr) ;

		// let the compiler define for us all the other methods like destructor, copy constructor/assignment

		// prefix increment
		const_iterator& operator++();

		// posfix increment
		const_iterator operator++(int /* dummy */) ;
		
		reference operator*() const;

		/*
			useful when Val is a struct with fields
			So I can write: it->x;
			This is equivalent to: (*it).x;
		*/
		pointer operator->() const;


		bool operator==(iterator const& rhs) const;
		bool operator!=(iterator const& rhs) const;
        operator bool() const;
		
	private:
		node* m_ptr;
	};

    /* return a new iterator pointing to the first element in the
       container -- the "beginning" of the container */
    // iterator begin();
    iterator begin();
    /* return a new iterator pointing to (one-past) the last element in the
       container -- the "end" of the container */
    iterator end();

    const_iterator begin() const;
    const_iterator end() const;

private:
    node* m_front;  // pointer to first node: the "front" of the container
    node* m_back;   // pointer to last node: the "back" of the container
};
