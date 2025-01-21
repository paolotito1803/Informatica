#include <fstream>
#include <utility>  // for std::move on Linux
#include "list.hpp"

/* default constructor */
template <typename Val>
list<Val>::list() : m_front(nullptr), m_back(nullptr) {}

/* constructor with one value v */
template <typename Val>
list<Val>::list(Val v)
    : list()  // calls the default constructor
{
    push_front(v);
}

/* copy constructor */
template <typename Val>
list<Val>::list(list<Val> const& rhs)
    : list()  // calls the default constructor
{
    auto ptr = rhs.front();
    while (ptr) {
        push_back(ptr->val);
        ptr = ptr->next;
    }
    /* can also be re-written in terms of copy assignment operator,
    very elegantly, like this: */
    // *this = rhs;
}

/* copy assignment operator */
template <typename Val>
list<Val>& list<Val>::operator=(list<Val> const& rhs) {
    if (this != &rhs) {  // not a self-assignment
        /* first delete all items (and free the memory) */
        clear();
        auto ptr = rhs.front();
        while (ptr) {
            push_back(ptr->val);
            ptr = ptr->next;
        }
    }
    return *this;
}

/* move constructor */
template <typename Val>
list<Val>::list(list<Val>&& rhs)
    : list()  // calls the default constructor
{
    m_front = rhs.m_front;
    m_back = rhs.m_back;
    rhs.m_front = nullptr;
    rhs.m_back = nullptr;
    /* can also be re-written in terms of move assignment operator,
    very elegantly, like this: */
    // *this = std::move(rhs);
}

/* move assignment operator */
template <typename Val>
list<Val>& list<Val>::operator=(list<Val>&& rhs) {
    if (this != &rhs) {  // not a self-assignment
        /* first delete all items (and free the memory) */
        clear();
        m_front = rhs.m_front;
        m_back = rhs.m_back;
        rhs.m_front = nullptr;
        rhs.m_back = nullptr;
    }
    return *this;
}

/* is the container empty? */
template <typename Val>
bool list<Val>::empty() const {
    return m_front == nullptr;
}

/* remove first element */
template <typename Val>
void list<Val>::pop_front() {
    if (!empty()) {
        node* tmp = m_front;
        m_front = m_front->next;
        delete tmp;
        if (empty()) m_back = nullptr;
    }
}

/* remove last element */
template <typename Val>
void list<Val>::pop_back() {
    if (m_front == m_back) {
        pop_front();
        return;
    }
    /* we have at least 2 nodes in the list */
    /* take the pointer to the node just before m_back */
    node* prev = m_front;
    while (prev->next != m_back) prev = prev->next;
    /* delete m_back */
    delete m_back;
    /* adjust m_back */
    prev->next = nullptr;
    m_back = prev;
}

/* clear() */
template <typename Val>
void list<Val>::clear() {
    while (!empty()) pop_front();
}

/* destructor */
template <typename Val>
list<Val>::~list() {
    clear();
}

/* return a const* to first node */
template <typename Val>
typename list<Val>::node const* list<Val>::front() const {
    return m_front;
}

/* return a const* to last node */
template <typename Val>
typename list<Val>::node const* list<Val>::back() const {
    return m_back;
}

/* push to the front of the list a new element with value v */
template <typename Val>
void list<Val>::push_front(Val v) {
    if (empty()) {
        m_front = new node{v, nullptr};
        m_back = m_front;
        return;
    }
    m_front = new node{v, m_front};
}

/* push to the back of the list a new element with value v */
template <typename Val>
void list<Val>::push_back(Val v) {
    if (empty()) {
        push_front(v);
        return;
    }
    m_back->next = new node{v, nullptr};
    m_back = m_back->next;
}

/* prefix decrement: remove the first node and return a reference to *this */
template <typename Val>
list<Val>& list<Val>::operator--() {
    pop_front();
    return *this;
}

/* postfix decrement: remove the last node and return a reference to *this
   Note:
   the int parameter is a dummy parameter used to differentiate between
   prefix and postfix decrement. */
template <typename Val>
list<Val>& list<Val>::operator--(int /* dummy */) {
    pop_back();
    return *this;
}

/* is this container equal to rhs? */
template <typename Val>
bool list<Val>::operator==(list<Val> const& rhs) const {
    // auto ptr1 = front();
    // auto ptr2 = rhs.front();
    // while (ptr1 or ptr2) {
    //     if ((!ptr1 and ptr2) or (!ptr2 and ptr1) or (ptr1->val != ptr2->val))
    //     {
    //         return false;
    //     }
    //     ptr1 = ptr1->next;
    //     ptr2 = ptr2->next;
    // }
    // return true;

    // with iterators!
    // auto it1 = begin();
    // auto it2 = rhs.begin();
    // while (it1 != end() or it2 != rhs.end()) {
    //     if ((it1 == end() and it2 != rhs.end()) or
    //         (it1 != end() and it2 == rhs.end()) or (*it1 != *it2)) {
    //         return false;
    //     }
    //     it1++;
    //     it2++;
    // }
    // return true;
    auto it1 = begin();
    auto it2 = rhs.begin();
    while (it1 or it2) {
        if ((!it1 and it2) or (it1 and !it2) or (*it1 != *it2)) {
            return false;
        }
        it1++;
        it2++;
    }
    return true;
}

/* is this container not equal to rhs? */
template <typename Val>
bool list<Val>::operator!=(list<Val> const& rhs) const {
    return !((*this) == rhs);
}

/* append to the back of the container the rhs
and return a reference to *this */
template <typename Val>
list<Val>& list<Val>::operator+=(list<Val> const& rhs) {
    node const* ptr = rhs.front();
    while (ptr) {
        push_back(ptr->val);
        ptr = ptr->next;
    }
    return *this;
}

/* push v to the back of the container
and return a reference to *this */
template <typename Val>
list<Val>& list<Val>::operator+=(Val v) {
    push_back(v);
    return *this;
}

/* returns a const reference to the val of the i-th node if it exists */
template <typename Val>
Val const& list<Val>::operator[](uint64_t i) const {
    uint64_t pos = 0;
    node const* ptr = m_front;
    while (pos++ < i) ptr = ptr->next;
    return ptr->val;
}

/* returns a reference to the val of the i-th node if it exists */
template <typename Val>
Val& list<Val>::operator[](uint64_t i) {
    uint64_t pos = 0;
    node const* ptr = m_front;
    while (pos++ < i) ptr = ptr->next;
    return ptr->val;
}

/*
    iterator implementation
*/

template <typename Val>
list<Val>::iterator::iterator(node* ptr) : m_ptr(ptr) {}

template <typename Val>
typename list<Val>::iterator::reference list<Val>::iterator::operator*() const {
    return m_ptr->val;
}

template <typename Val>
typename list<Val>::iterator::pointer list<Val>::iterator::operator->() const {
    return &(m_ptr->val);
}

template <typename Val>
typename list<Val>::iterator& list<Val>::iterator::operator++() {
    m_ptr = m_ptr->next;
    return *this;
}

template <typename Val>
typename list<Val>::iterator list<Val>::iterator::operator++(int /* dummy */) {
    iterator copy = *this;
    m_ptr = m_ptr->next;
    return copy;
}

template <typename Val>
bool list<Val>::iterator::operator==(
    typename list<Val>::iterator const& rhs) const {
    return m_ptr == rhs.m_ptr;
}

template <typename Val>
bool list<Val>::iterator::operator!=(
    typename list<Val>::iterator const& rhs) const {
    return !(*this == rhs);
}

template <typename Val>
list<Val>::iterator::operator bool() const {
    return m_ptr != nullptr;  // or just: return m_ptr
}

template <typename Val>
typename list<Val>::iterator list<Val>::begin() {
    return {m_front};
}

template <typename Val>
typename list<Val>::iterator list<Val>::end() {
    /* note: we do not return {m_back} because
       this will be an iterator pointing to the last element.
       We return an iterator pointing to one-past the last element,
       thus, iterator(nullptr). */
    return {nullptr};
}

/*
    const_iterator implementation
*/

template <typename Val>
list<Val>::const_iterator::const_iterator(node* ptr) : m_ptr(ptr) {}

template <typename Val>
typename list<Val>::const_iterator::reference
    list<Val>::const_iterator::operator*() const {
    return m_ptr->val;
}

template <typename Val>
typename list<Val>::const_iterator::pointer
    list<Val>::const_iterator::operator->() const {
    return &(m_ptr->val);
}

template <typename Val>
typename list<Val>::const_iterator& list<Val>::const_iterator::operator++() {
    m_ptr = m_ptr->next;
    return *this;
}

template <typename Val>
typename list<Val>::const_iterator list<Val>::const_iterator::operator++(
    int /* dummy */) {
    const_iterator copy = *this;
    m_ptr = m_ptr->next;
    return copy;
}

template <typename Val>
bool list<Val>::const_iterator::operator==(
    typename list<Val>::const_iterator const& rhs) const {
    return m_ptr == rhs.m_ptr;
}

template <typename Val>
bool list<Val>::const_iterator::operator!=(
    typename list<Val>::const_iterator const& rhs) const {
    return !(*this == rhs);
}

template <typename Val>
list<Val>::const_iterator::operator bool() const {
    return m_ptr != nullptr;  // or just: return m_ptr
}

template <typename Val>
typename list<Val>::const_iterator list<Val>::begin() const {
    return {m_front};
}

template <typename Val>
typename list<Val>::const_iterator list<Val>::end() const {
    /* note: we do not return {m_back} because
       this will be an iterator pointing to the last element.
       We return an iterator pointing to one-past the last element,
       thus, iterator(nullptr). */
    return {nullptr};
}

/*
    Non member functions.
*/

/* return lhs+rhs where both lhs and rhs are lists */
template <typename Val>
list<Val> operator+(list<Val> const& lhs, list<Val> const& rhs) {
    list<Val> result = lhs;  // copy constructor
    result += rhs;
    return result;
}

/* return lhs+rhs where rhs is a value */
template <typename Val>
list<Val> operator+(list<Val> const& lhs, Val rhs) {
    list<Val> res{lhs};
    res.push_back(rhs);
    return res;
}

/* return lhs+rhs where lhs is a value */
template <typename Val>
list<Val> operator+(Val lhs, list<Val> const& rhs) {
    list<Val> res{rhs};
    res.push_front(lhs);
    return res;
}

template <typename Val>
std::ostream& operator<<(std::ostream& os, list<Val> const& list) {
    for (auto ptr = list.front(); ptr; ptr = ptr->next) {
        os << ptr->val;
        if (ptr->next) os << " -> ";
    }
    return os;
}

template <typename Val>
std::istream& operator>>(std::istream& is, list<Val>& list) {
    Val v;
    while (is >> v) list.push_back(v);
    return is;
}

template <typename Val>
void read_list(list<Val>& list) {
    uint64_t list_size = 0;
    Val v;
    std::cin >> list_size;                       // first read list_size
    for (uint64_t i = 0; i != list_size; ++i) {  // then value by value
        std::cin >> v;
        list.push_back(v);
    }
}