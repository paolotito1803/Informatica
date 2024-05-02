#include <iostream>
using namespace std;

class animal {
protected:
    int weight;
    double speed;

public:
    animal() : weight(0), speed(0.0){} //defualt constructor di animal

    animal(int w, double sp) : weight(w), speed(sp) {} //copy constructor di animal

    animal(const animal& a) : weight(a.weight), speed(a.speed) {} //copy constructor, uso la & perchè altrimenti rischio ricorsione
    //sto invocando il copy constructor dei tipi primitivi dentro il mio copy constructor

    const int& weight() const{ //const di this e la voglio const cquando non modifico nulla dentro di me
        return weight;
    }


    int& weight() { //mi legge direttamente e mi può anche modificare è solo read only, è un right value => getter
        return weight;
    }

    virtual void eat(const animal& a) { //è sia read che write, può essere anche left value => setter
        weight += a.weight; //viene chiamato l'operatore di += di int in quanto le variabili hanno tipo int
    }
};

class dog : public animal { //modo di ereditare una classe
private:
    bool pedegree;
public:
    dog(int w, double sp, bool ped) :animal(w, sp), pedegree(ped) {}; //richiamo il super costruttore

    void eat(const animal& a) {
		weight() += a.weight() / 2;
       
	}

};


int main() {
    animal* a1 = new animal(7, 2.34);
    /* Devo mettere * perchè new ritorna un pointer, viene creata nello HEAP*/
    animal a2(7, 2.34); //non si dichiarano mai le variabili, si costruiscono perchè si invoca il default constructor sullo stack
    animal a3(a2);
    animal* a4 = new animal(a2);

    a2.eat(a2);

    dog fido(60, 45.34, false);

    animal& a5 = fido; //altro modo per modificare una variabile, senza crearne una nuova ma modificando quella originaria
    a5.eat(a2);

   
    dog* fufi = new dog(3, 100., true);
    animal* a6 = fufi;
    a6->eat(a2);

    animal a6(fido); //fido è subsunto ad animal, è legale tra due entità: si possono subsumere pointer e reference. 
    //In questo caso è subsunto per reference 
    a6.eat(); //chiama quello di animal
}

