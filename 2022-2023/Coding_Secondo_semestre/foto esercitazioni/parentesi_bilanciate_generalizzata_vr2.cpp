#include<string>
#include<iostream>
#include<stack>

using namespace std;

bool bilanciata(string&);

bool bilanciata(string& s){
    stack<char> S;
    
        while(!s.empty()){
        if(S.empty()){
            S.push(s.at(0));
            s.erase(0,1);
        }
        else{
            if(s.at(0)== S.top()+32){
                    S.pop();
                    s.erase(0,1);
            }
            else{
                    S.push(s.at(0));
                    s.erase(0,1);
            }
        }
        if(S.empty())
            return true;
        else
            return false;
    }
}

int main(){

	string s;
	getline(cin,s);
	
	cout << boolalpha <<  bilanciata(s);
	
}