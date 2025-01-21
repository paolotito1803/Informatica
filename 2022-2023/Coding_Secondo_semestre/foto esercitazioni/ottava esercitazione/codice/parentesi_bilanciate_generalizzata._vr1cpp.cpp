#include<string>
#include<iostream>
#include<stack>

using namespace std;

bool bilanciata(string&);

bool bilanciata(string& s){
    stack<char> S;
    for(int i=0; i<s.length();i++){
        if(S.empty()){
            S.push(s.at(i));
        }
        else if(s.at(i) == S.top()+32){
            S.pop();
        }
        else{
            S.push(s.at(i));
        }
    }
    if(S.empty())
        return true;
    return false;
}
/*
 * //come usare std::stack<char>:
 *
 * stack<char> S; //crea nuovo stack vuoto di char
 * char x = 'a';
 * S.push(x); // aggiungi x in cima allo stack
 * char& t = S.top(); // reference alla cima dello stack
 * S.pop(); //rimuove la cima dello stack
 *
 */

int main(){

	string s;
	getline(cin,s);
	
	cout << boolalpha <<  bilanciata(s);
	
}