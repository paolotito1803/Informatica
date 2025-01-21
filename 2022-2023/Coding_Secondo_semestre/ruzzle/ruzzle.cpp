#include<vector>
#include<string>
#include<iostream>


using std::vector;
using std::string;

bool trova_parola_ric(const vector<vector<char>>& t,
                      vector<vector<bool>>& used,
                      int r,
                      int c,
                      string parola)
{
    if (parola == "")
        return true;
    else {
        if (t.at(r).at(c) == parola.at(0) &&
            used.at(r).at(c) == false) {

            used.at(r).at(c) = true;
            parola.erase(0,1);

            bool found = false;

            for (int i=r-1; i<=r+1; i++)
                for (int j=c-1; j<=c+1; j++)
                    if (i>=0 && i<=3 && j>=0 && j<=3)
                        if (trova_parola_ric(t, used, i, j, parola))
                            found = true;

            used.at(r).at(c) = false;

            return found;
        }
        else
            return false;
    }
}



bool trova_parola(const vector<vector<char>>& t, string parola) {

    vector<vector<bool>> used(4, vector<bool>(4, false));

    bool found = false;
    int r=0 ,c;
    while (r<4 && !found) {
        c = 0;
        while (c<4 && !found) {
            if (trova_parola_ric(t, used, r, c, parola))
                found = true;
            c++;
        }
        r++;
    }

    return found;
}


int main() {
    vector<vector<char>> tab = {{'A', 'C', 'B', 'E'},
                                {'T', 'I', 'A', 'B'},
                                {'R', 'L', 'A', 'T'},
                                {'I', 'F', 'E', 'V'}};

    if (trova_parola(tab, "ATRII"))
        std::cout<<"Trovata"<<std::endl;
    else
        std::cout<<"Non trovata"<<std::endl;

    return 0;

}

