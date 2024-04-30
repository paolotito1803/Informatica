#include <iostream>
using namespace std;

class animal {
private:
    int weight;
    double speed;
public:
    animal(int w, double sp) : weight(w), speed(sp) {}

    animal(const animal& a) : weight(a.weight), speed(a.speed) {} //copy constructor, uso la & perchè altrimenti rischio ricorsione

    int get_weight() {
        return weight;
    }

    virtual void eat(const animal& a) {
        weight += a.weight;
    }
};

class dog : public animal { //modo di ereditare una classe

};

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}

