#include<iostream>
#include<vector>

std::vector<double> moving_average( const std::vector<double> v, int k){
    std::vector<double> new_v(v.size());
    double somma, counter;
    for( int i = 0; i < v.size(); i++){
        somma = 0.0;
        counter = 0.0;
        for( int j = i - k; j <= i + k; j++){
            if( j >=0 && j < v.size()){
                somma = somma + v.at(j);
                counter++;
            }
        }
        new_v.at(i) = somma/counter;
    } 
    return new_v;
} 