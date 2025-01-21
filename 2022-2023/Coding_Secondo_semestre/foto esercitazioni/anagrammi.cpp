#include<iostream>

bool anagramma( std::string s1, std::string s2){
    int i = 0;
    int j;
    bool verifica = false;
    std::string s3, s4;
    for(int k = 0; k < s1.length(); k++){
        if(s1.at(k) != ' ')
            s3 = s3 + s1.at(k);
    }
    for(int n = 0; n < s2.length(); n++){
        if(s2.at(n) != ' ')
            s4 = s4 + s2.at(n);
    }
    if(s3.length() != s4.length())
        return false;

    while(i < s3.length()){
        j = 0;
        while( j < s4.length() && !verifica){
            if(s3.at(i) == s4.at(j)){
                verifica = true;
                s4.erase(j, 1); //accorcio la stringa   
            }
            j++;
        }
        if(verifica == false)
            return false;
        i++;
    }
    return true;
}