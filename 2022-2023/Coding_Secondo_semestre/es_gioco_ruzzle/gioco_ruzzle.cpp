#include <iostream>
#include <vector>
#include <string>


using namespace std;
bool trova_parola(const vector<vector<char>>& t, vector<vector<bool>>& u, string s, int i, int j){
	if(i < 0 || i >= 4 || j < 0 || j >= 4)
		return false;
	else {
		if(s.length() == 0)
			return true;
		else {
			if(s.at(0) != t.at(i).at(j) || u.at(i).at(j))
				return false;
			else {
				bool found = false;
				s.erase(s.begin(),s.begin());
				u.at(i).at(j) = true;
				for(int r = i-1; r <= i+1; r++){
					for(int c = j-1; c <= j+1; c++){
						if(!found){
							found = trova_parola(t,u,s,r,c);
						}
					}
				}
				if(!found){
					u.at(i).at(j) = false;
				}
				return found;
			}
		}
	}
}

bool trova_totale(const vector<vector<char>>& t, vector<vector<bool>>& u, string s){ // funzione cappello
	bool found = false;
	for(int r = 0; r < 4; r++){
		for(int c = 0; c < 4; c++){
			if(!found){
				found = trova_parola(t,u,r,c);
			}
		}
	}
	return found;
}


int main()
{
	return 0;
}