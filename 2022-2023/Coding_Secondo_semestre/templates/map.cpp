/*
Exercise:

Implement a template class my_map<Key,Val> storing key-value pairs
where keys are of type Key and values are of type Val.

The class should implement the following methods:

1) default constructor
2) destructor
3) operator[]: given an object k of type Key and an object M of
   type my_map<Key,Val>, the call M[k] must return a reference
   to v (of type Val) such that the pair (k,v) is in the map.
   If (k,v) is not in the map, a new pair (k,v) is created
   calling the default constructor of Val to build v.

Use the provided list<Key,Val> as the underlying container for
the (key,value) pairs of my_map<Key,Val>.

*/

#include <iostream>
#include <string>

template <typename Key, typename Val>
struct list {
    list () { 
        next=nullptr;
        key; 
        val;
     }
    list(Key k, Val v, list<Key, Val>* n) : key(k), val(v), next(n) {}

    ~list() {
        if (next) delete next;
    }

    /* append a new pair (k,v) to the front of the list */
    list<Key, Val>* prepend(Key k, Val v) {
        return new list<Key, Val>(k, v, this);
    }

    Key key;
    Val val;
    list* next;
};

template <typename Key, typename Val>
struct my_map {
    my_map() { L = new list<Key, Val>{}; }

    ~my_map() { delete L; }

    Val& operator[](Key const& k) {
        auto ptr = L;
        while (ptr) {
            if (ptr->key == k) return ptr->val;
            ptr = ptr->next;
        }
        /* key was not found */
        Val v{};  // calls the default constructor of Val
        L = L->prepend(k, v);
        return L->val;
    }

private:
    list<Key, Val>* L;
};

int main() {
    my_map<std::string, double> M;

    M["pi"] = 3.14159;
    M["e"] = 2.71828;

    std::cout << M["pi"] << std::endl;
    std::cout << M["e"] << std::endl;
    std::cout << M["golden ratio"] << std::endl;

    return 0;
}