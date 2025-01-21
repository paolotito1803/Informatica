#include <iostream>
#include <vector>
#include <string>

using namespace std;


class Carrello{
public:
    Carrello() {
         desc = "";
         print = "";
         qnt =0;
         cost=0.0;
    }
    
    ~Carrello() {
        
    }

    void add(string  desc, int qnt, double cost) {
        
        
        Carrello elemento;
        //creo oggetti
        elemento.desc= desc;
        elemento.qnt = qnt;
        elemento.cost=cost; 
        
        v.push_back(elemento);
    }

    string print_carrello() {
         int i=0;
        for(int i=0;i<v.size(); i++){
            print = print + v.at(i).desc + ", ";
            
        }
        if(v.size() == 0)
            return "Carrello vuoto";
        else{
            print.erase(print.length()-2, 1);
            return print;
        }
    }

    double total() {
        double totale=0;
        
        for(int i=0;i<v.size(); i++){
         totale = totale + v.at(i).cost * v.at(i).qnt;        
        }
        return totale;
    }

private:
 string desc;
 string print;
 int qnt;
 double cost;
vector<Carrello> v;
};

int main() {

	Carrello car;

	int items;

	cin>>items;

	for (int i=0; i<items; i++) {
		string s;
		int q;
		double c;
		cin>>s;
		cin>>q;
		cin>>c;

		car.add(s, q, c);


	
	}

	std::cout << car.print_carrello();
	cout<<endl;
	cout<< car.total();
	return 0;
}