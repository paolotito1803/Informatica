#include<iostream>
#include<string>
using namespace std;
bool anagramma(string s1, string s2)
{
    int i=0;
    int j;
    std::string s3, s4;
    for(int k=0; k<s1.length(); k++){
        if(s1.at(k) != ' ')
            s3 = s3 + s1.at(k); 
    }
    for(int n=0; n<s2.length(); n++){
        if(s2.at(n) != ' ')
            s4 = s4 + s2.at(n);
    }
    cout<< s3 <<endl <<s4 <<endl;
    if(s3.length() != s4.length())
        return false;
    cout<<s3 <<endl <<s4<<endl;
    //if(s3.at(0) == s4.at(0)){
    while(i<s3.length()){
        j=0;
        bool verifica = false;
            while(j<s4.length() && !verifica){
                if(s3.at(i)==s4.at(j)){
                    verifica=true;
                    s4.erase(j,1);
                }
                j++;
            }
            if(verifica==false){
                return false;
            }
            i++;
        }
    //}
    return true;
}

int main() {
    string parola1 = "animale domestico";
    string parola2 = "stimo ed amo il cane";

    if (anagramma(parola1, parola2)) {
        cout << "Le parole '" << parola1 << "' e '" << parola2 << "' sono anagrammi!" << endl;
    } else {
        cout << "Le parole '" << parola1 << "' e '" << parola2 << "' non sono anagrammi." << endl;
    }

    return 0;
}