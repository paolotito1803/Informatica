#include<iostream>
#include<vector>

std::vector<int> fill_with_primes(int size) {
    std::vector<int> v;
    v.resize(size);
    int i = 0, numero_primo = 2;
    while( i < size ){
        bool verifica = true;
        int j = 2;
        while( j < numero_primo && verifica){
            if( numero_primo % j == 0){
                verifica = false;
            }
            j++;
        }
        if(verifica){
            v.at(i) = numero_primo;
            i++;
        }
        numero_primo++;
    }
    return v;
}