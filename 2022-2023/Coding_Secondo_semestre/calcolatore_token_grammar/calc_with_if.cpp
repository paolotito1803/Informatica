#include <iostream>
#include <vector>
#include <limits>
#include <cassert>

struct token {
    static constexpr double inf = std::numeric_limits<double>::max();

    //token() : m_type(0), m_value(inf) {}  // default constructor
    token(){
        m_type=0;
        m_value=inf;
    }

    friend std::ostream& operator<<(std::ostream& os, token const& t) {
        os << "[m_type: " << t.m_type << ", m_value: " << t.m_value << "]";
        return os;
    }

    friend std::istream& operator>>(std::istream& is, token& t) {
        char c = 0;
        is >> c;  // skip separators
        if (c >= '0' and c <= '9') {
            is.putback(c);
            is >> t.m_value;
        } else {
            t.m_type = c;
            //if we read I then we assume this is an IF: consume 'F'
            if(c=='I') is >> c; 
        }

        return is;
    }

    double get_value() const { return m_value; };
    char get_type() const { return m_type; };

    bool is_double() const { return m_type == 0 and m_value != inf; }
    bool is_open() const { return m_type == '('; }
    bool is_close() const { return m_type == ')'; }
    bool is_curly_open() const { return m_type == '{'; }
    bool is_curly_close() const { return m_type == '}'; }
    bool is_add() const { return m_type == '+'; }
    bool is_sub() const { return m_type == '-'; }
    bool is_mul() const { return m_type == '*'; }
    bool is_div() const { return m_type == '/'; }
    bool is_eq() const { return m_type == '='; }
    bool is_dot() const { return m_type == '.';}
    bool is_col() const { return m_type == ';';}  
    bool is_print() const { return m_type == 'p';}
    bool is_if() const { return m_type == 'I';}
    bool is_var() const { return m_type >= 'a' and m_type <= 'z' and m_type != 'p';}
    char get_var_name() const { return m_type; }

private:
    char m_type;     // ()+-*/=
    double m_value;  // the token's m_value or inf (if m_type is a symbol)
};


/*
 * Our grammar:
 * E -> P | E+P | E-P (implemented with while loop)
 * P -> T | P*T | P/T (implemented with while loop)
 * T -> double | (E) | var 
 * S -> var = E | p(E) | IF(E < E){ L }
 * L -> S. | S;L 
 *
 */

double vars[255];

double E(const std::vector<token>&, int&);
void L(const std::vector<token>&, int&, bool execute);

double T(const std::vector<token>& v, int& i){
    
    // T -> double | (E) | var
    
    double res = 0;
    
    if(v[i].is_double()){
        
        // T -> double
        
        res = v[i].get_value();
        i++;
        
    }else if(v[i].is_var()){
        
        // T -> var
        
        res = vars[v[i].get_var_name()];
        i++;
        
    }else{
        
        // T-> (E)
        
        i++; // consume '('
        res = E(v,i);
        i++; // consume ')'
        
    }
    
    return res;
    
}

double P(const std::vector<token>& v, int& i){
    
    // P -> T | P*T | P/T               T */ T */ T .... */ T
    
    double res = T(v,i);
    
    while(v[i].is_mul() or v[i].is_div()){
        
        if(v[i].is_mul()){            
            i++; 
            res *= T(v,i);
        }else{
            i++;
            res /= T(v,i);
        }
        
    }
    
    return res;
    
}

double E(const std::vector<token>& v, int& i){
    // E -> P | E+P | E-P 

    double res = P(v,i); 
    
    while(v[i].is_sub() or v[i].is_add()){
        
        if(v[i].is_sub()){        
        	i++;
			res -= P(v,i);
		}else{
        	i++;		
			res += P(v,i);
		}
		
    }
    return res;
}


void S(const std::vector<token>& v, int& i, bool execute){
    
    // S -> var = E | p(E) | IF(E < E){ L }

    if(v[i].is_var()){
        
        // S -> var = E

        char varname = v[i].get_var_name();
        i += 2; // consume "x="
        
        double res = E(v,i);
        if(execute) vars[varname] = res;
        
    }else if(v[i].is_print()){
        
        // S -> p(E)
        
        i += 2; // consume "p("
        double res = E(v,i);
        if(execute) std::cout << res << std::endl;
        i++;//consume )
        
    }else{

        // S -> IF(E < E){ L }

        i+=2; // consume IF(     ('IF' counts as just one token)
        double lhs = E(v,i);
        i++; //consume <
        double rhs = E(v,i);
        i+=2; // consume ){

        L(v,i,(lhs<rhs)and execute);
        assert(v[i].is_curly_close());
        i++; // consume }

    }

}

//L

void L(const std::vector<token>& v, int& i, bool execute){
 
   // L -> S. | S;L 

    S(v,i,execute);
    
    if(v[i].is_col()){
        
        i++; // consume ;
        L(v,i,execute);
        
    }else{
 
        i++;// consume .
        
    }
    
}



// example of code that can be parsed
// note: if '.' follows a double, then there must be a space before '.'
// note: body of IF must end with '.'. After scope of IF, must place ';'

/*
x = 7;
y = 2;

IF(y < x){
    p(x);
    p(y).
};

z = 0;

IF(x < y){
    z = x * y;
    x = 5 .
};

p(z);
p(x).
*/

int main(){
    
    std::vector<token> v;

    std::cout << "insert list of statements separated by ; and ended by . " << std::endl;

    while(not std::cin.eof()){

        token t;
        std::cin >> t;
        v.push_back(t);    

    }

    int i = 0;
    L(v,i,true);
 
}
