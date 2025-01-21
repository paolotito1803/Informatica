#include<string>
#include<vector>

class List_int{
  public:
    List_int();
    List_int(int el);
    List_int(const List_int& source);

    void prepend(int el);    
    void append(int el);
    

    std::string convert_to_string() const;

    void tail(List_int& res);
    int& first();
    const int& first() const;

    bool equal(const List_int& l) const;
    
    void concat(const List_int& l);

    ~List_int();
  private:

    std::vector<int> v;
};



