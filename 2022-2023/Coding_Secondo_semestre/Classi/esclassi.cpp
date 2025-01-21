#include<iostream>
#include<cstring>

class StrPascal{
    public:
        StrPascal(); //default constructor
        StrPascal(char* str);
        StrPascal(const StrPascal& copy); //copy constructor
        ~StrPascal(); //destructor
        char at(int pos);
        void print() const;
    private:
        //unsigned char buff[256];
        char* buff;
        int size;
};

StrPascal::StrPascal(){
    //buff[0] = 0; //creo stringa vuota
    buff = new char[255]; //creo la stringa vuota
    size = 0;
    std::cout<< "Chiamato il default constructor" <<std::endl;
}

StrPascal::~StrPascal(){
    delete[] buff;
    std::cout<< "Chiamato il distruttore di classi" <<std::endl;
}

StrPascal::StrPascal(char* str){
    buff = new char[255];
    size = strlen(str);
    //int n = strlen(str);
    //if(n<256)
    if(size>=256)
        size=255;
        /*buff[0] = 256;
    else    
        buff[0] = 255;*/
    for(int i = 0; i</*buff[0]*/size; i++){
        //buff[i+1] = str[i];
        buff[i] = str[i];
    }
    std::cout<< "Chiamato il constructor con string c come parametro" <<std::endl;
}

char StrPascal::at(int pos){
    if(pos<size)
        return buff[pos];
    else    
        return -1;
}

StrPascal::StrPascal(const StrPascal& copy){
    buff = new char[255];
    size = copy.size;
    for(int i=0; i</*copy.buff[0]*/copy.size; i++)
        buff[i] = copy.buff[i];
    std::cout<< "Chiamato il copy constructor" <<std::endl;
}

void StrPascal::print() const {
    //for(int i=0; i<=buff[0]; i++)
    for(int i=0; i<size; i++)  
        std::cout<<buff[i];
    std::cout<<std::endl;
}

void stampax2(StrPascal input){
    input.print();
    input.print();
}

int main(){
    char cstring[100] = "Hello";
    //StrPascal s(cstring);
    StrPascal s; //chiamo default constructor
    stampax2(s);
    std::cout<<s.at(3)<<std::endl;
    //std::cout<<sizeof(s)<<std::endl;
    //std::cout<<sizeof(int)<<std::endl;
    //std::cout<<sizeof(char*)<<std::endl;
    //StrPascal* t= new StrPascal[10]; //chiamo il costruttore
   // delete[] t; //chiamo il distruttore
    return 0;
}