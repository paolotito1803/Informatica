#include"json.hpp"

using namespace std;

//CFG
/*
    dizionario -> { | coppia | dizionario | {} | }
    coppia ->  "stringa" | json 
    json -> num | "stringa" |bool |list | dizionario | nullo
    list -> [ | json | ] | []

*/
/*
    D-> {} | {S:J} 
    G-> D | L       -->generale
    L-> [] | [J]                                        //| [J,L] | [S,L]
    S-> "" |"T"                                          //| "S"
    T->  nullo
    B-> true | false
    N-> num
*/
 
struct dizionario{
        dizionario* next;
        //json info;
        //std::string chiave;
        pair<string, json> contenuto;
    };

    struct lista{
        lista* next;
        json info;
    };

struct json::impl{

    static constexpr double inf = std::numeric_limits<double>::max();

    double  m_value;                // contiene i valori
    char m_type;                    //contiene riferimento al tipo di caratteri
    bool m_bool;                    //verifica booleana
    string stringa;                 //allocazione per la stringa
    struct dizionario* dizio;       //allocazione per il dizionario
    struct lista* list;             //allocazione per la lista
    dizionario* head_dizionario;
    dizionario* tail_dizionario;
    lista* head_lista;
    lista* tail_lista;

    void append_dizionario(pair<string, json> contenuto){
        dizionario* nuovo_dizionario = new dizionario {nullptr, contenuto};
        if(head_dizionario == nullptr){
            head_dizionario = tail_dizionario = nuovo_dizionario;
        }
        else{
            this->tail_dizionario->next = nuovo_dizionario;
            tail_dizionario = nuovo_dizionario; 
        }
    }

    void append_lista(json info){
        lista* nuovo_lista = new lista {nullptr, info};
        if(head_lista == nullptr){
            head_lista = tail_lista = nuovo_lista;
        }
        else{
            tail_lista->next = nuovo_lista;
            tail_lista = nuovo_lista;
        } 
    }

    void copia_dizio(dizionario* dizio){
        if(dizio == nullptr) return;
        dizionario* new_dizio = dizio;
        while(new_dizio != nullptr){
           append_dizionario(new_dizio->contenuto);
            new_dizio = new_dizio->next;
           
        }
    }

    void copia_list(lista* list){
        if(list == nullptr) return;
        lista* new_list = list;
        while(new_list != nullptr){
            append_lista(new_list->info);
            
            new_list = new_list->next;
        }
    }

};

struct json::list_iterator{
    public:
        using iterator_category = std::forward_iterator_tag;
        using value_type = json;
        using pointer = json*;
        using reference = json&;
        
        list_iterator(lista* ptr):m_ptr(ptr){}

        reference operator*() const{
            return m_ptr->info;
        }

        pointer operator->() const{
            return &m_ptr->info;
        }

        list_iterator& operator++(){
            m_ptr = m_ptr->next;
            return *this;
        }
        
        list_iterator operator++(int /* dummy */){
            list_iterator pc = *this;
            m_ptr = m_ptr->next;
            return pc;
        }

        bool operator==(list_iterator const& rhs) const{
            return m_ptr == rhs.m_ptr;
        }
        bool operator!=(list_iterator const& rhs) const{
            return !(m_ptr == rhs.m_ptr);
        }
       

    private:
        lista* m_ptr;
};

struct json::const_list_iterator{
    public:
        using iterator_category = std::forward_iterator_tag;
        using value_type = const json;
        using pointer = json const*;
        using reference = json const&;

        const_list_iterator(lista* ptr):m_ptr(ptr){}

        reference operator*() const{
            return m_ptr->info;
        }
        
        pointer operator->() const{
            return &m_ptr->info;
        }
        const_list_iterator& operator++(){
             m_ptr = m_ptr->next;
            return *this;
        }
        const_list_iterator operator++(int /* dummy */){
            const_list_iterator pc = *this;
            m_ptr = m_ptr->next;
            return pc;
        }

        bool operator==(const_list_iterator const& rhs) const{
            return m_ptr == rhs.m_ptr;
        }
        bool operator!=(const_list_iterator const& rhs) const{
            return !(m_ptr == rhs.m_ptr);
        }
        

    private:
        lista const* m_ptr;
};

struct json::dictionary_iterator{
public:
        using iterator_category = std::forward_iterator_tag;
        using value_type = pair<string, json>;
        using pointer = pair<string, json>*;
        using reference = pair<string, json>&;
        
        dictionary_iterator(dizionario* ptr):m_ptr(ptr){}

        reference operator*() const{
             return m_ptr->contenuto;
        }

        pointer operator->() const{
            return &m_ptr->contenuto;
        }

        dictionary_iterator& operator++(){
             m_ptr = m_ptr->next;
            return *this;
        }
        
        dictionary_iterator operator++(int /* dummy */){
            dictionary_iterator pc = *this;
            m_ptr = m_ptr->next;
            return pc;
        }

        bool operator==(dictionary_iterator const& rhs) const{
            return m_ptr == rhs.m_ptr;
        }
        bool operator!=(dictionary_iterator const& rhs) const{
             return !(m_ptr == rhs.m_ptr);
        }
        
    private:
        dizionario* m_ptr;
};

struct json::const_dictionary_iterator{
    public:
        using iterator_category = std::forward_iterator_tag;
        using value_type = const pair<string, json>;
        using pointer = pair<string, json> const*;
        using reference = pair<string, json> const&;

        const_dictionary_iterator(dizionario* ptr):m_ptr(ptr){}

        reference operator*() const{
            return m_ptr->contenuto;
        }
        pointer operator->() const{
             return &m_ptr->contenuto;
        }
        const_dictionary_iterator& operator++(){
             m_ptr = m_ptr->next;
            return *this;
        }
        const_dictionary_iterator operator++(int /* dummy */){
            const_dictionary_iterator pc = *this;
            m_ptr = m_ptr->next;
            return pc;
        }

        bool operator==(const_dictionary_iterator const& rhs) const{
            return m_ptr == rhs.m_ptr;
        }
        bool operator!=(const_dictionary_iterator const& rhs) const{
             return !(m_ptr == rhs.m_ptr);
        }
    

    private:
        dizionario const* m_ptr;
};

void D(istream& is, json& k);
void L(istream& is, json& k);
void B(istream& is, json& k);
void N(istream& is, json& k);
void S(istream& is, json& k);
void T(istream& is, json& k);

//funzione grammatica per il json
json G(istream& is){
    char c;
    is >> c;
    json j;
    switch(c){
        case '{':
            j.set_dictionary();
            is >> c;
            if(c != '}'){
                is.putback(c);
                D(is, j);
            }
            break;            

        case '[':
            j.set_list();
            is >> c;
            if(c != ']'){
                is.putback(c);
                L(is, j);
            }
            break;
        
        case '"':
            S(is, j);
            break;

        case 't':
            is.putback(c);
            B(is, j);
            break;

        case 'f':
            is.putback(c);
            B(is, j);
            break;

        case 'n':
            is.putback(c);
            T(is, j);
            break;

        default: 
            if(c >= '0' && c <= '9' || c == '-' || c == '.'){
                is.putback(c);
                N(is, j);
            }
            break;
    }
    return j;
}

//funzione grammatica per il dizionario
void D(istream& is, json& k){
    pair<string, json> nuovo;
    char c;
    is >> c;
    if(c == '"'){
        json j;
        S(is, j);
        nuovo.first = j.get_string();
    }
    else
        throw json_exception{"Errore, l'elemento inserito non è di tipo dizionario."};
    is >> c;
    if(c != ':')
        throw json_exception{"Errore, non è stato creato correttamente il dizionario"};
    nuovo.second = G(is);
    k.insert(nuovo);
    is >> c;
    if(c == ',')
        return D(is, k);
    if(c == '}')
        return;
    else
        throw json_exception{"Il dizionario inserito non è corretto"};
    /*json dizionario;
    dizionario.set_dictionary();
    while(is.peek() != '}'){
        elimina_spazi(is);
        std::pair<string, json> D;
        D.first = S(is).get_string();
        elimina_spazi(is);
        if(is.peek()== ':'){
            is.get();
        }
        else{
            throw json_exception{};
        }
        elimina_spazi(is);
        D.second = J(is);
        dizionario.insert(D);
        elimina_spazi(is);
        if(is.peek() == ','){
            is.get();
        }
        else{
            elimina_spazi(is);
            if(is.eof() || is.peek() != '}'){
                throw json_exception{};
            }
        }
    }
    return dizionario;*/
}

//funzione grammatica per la lista
void L(istream& is, json& k){
    char c;
    json j = G(is);
    k.push_back(j);
    is >> c;
    if(c == ',')
        L(is,k);
    else if(c == ']')
        return;
    else
        throw json_exception{"Lista inserita non è corretta"};
   /* json lista;
    lista.set_list();
    while(is.peek() != ']'){
        elimina_spazi(is);
        json L;
        L = J(is);
        lista.push_back(L);
        elimina_spazi(is);
        if(is.peek() == ','){
            is.get();
        }
        if(is.peek() != ','){
            elimina_spazi(is);
          if(is.peek() != ']' || is.eof()){
            throw json_exception{};
            }
        }
    }
    return lista;*/
}

//funzione grammatica per i boleani
void B(istream& is, json& k){
    char c;
    is >> c;
    string i; 
    while(c >= 'a' && c <='z'){
        i.push_back(c);
        c = is.get();
    }
    if(c == ',' || c == ']' || c == '}'){
        is.putback(c);
    }
    if(i == "true"){
        k.set_bool(true);
    }
    else if( i == "false"){
        k.set_bool(false);
    }
    else{
        throw json_exception{"Valore inserito errato"};
    }
}

//funzione grammatica per i numeri
void N(istream& is, json& k){
    char c;
    is >> c;
    string i;
    while(c >= '0' && c <= '9' || c == '.' || c == '-'){
        i.push_back(c);
        c = is.get();
    }
    if(c == ',' || c == ']' || c == '}'){
        is.putback(c);
    }
    double ris = stod(i);
    k.set_number(ris);
}

//funzione grammatica per la stringa
void S(istream& is, json& k){
    string backup;
    char c;
    is >> c;
    char i = '1';
    bool end = false;
    while(end == false){
        if(c == '"' && i != '\\'){
            end = true;
        }
        else{
            backup.push_back(c);
            i = c;
            c = is.get();
        }
    }
     k.set_string(backup);
}

//funzione grammatica per i valori terminali
void T(istream& is, json& k){
    char c;
    is >> c;
    string i;
    while(c >= 'a' && c <='z'){
        i.push_back(c);
        c = is.get();
    }
    if(c == ',' || c == ']' || c == '}'){
        is.putback(c);
    }
    if(i == "null"){
        k.set_null();
    }
    else
        throw json_exception{"Valore inserito errato"};
}


bool json::is_list() const{
    return pimpl->m_type == '[';
}

bool json::is_dictionary() const{
    return pimpl->m_type == '{';
}

bool json::is_string() const{
    return pimpl->m_type == '"';
}
bool json::is_number() const{
    return pimpl->m_type == 1;
}

bool json::is_bool() const{
    return pimpl->m_type == 3 ;
}

bool json::is_null() const{
    if(pimpl->m_type == 0){
        return true;
    }
    else{
        return false;
    }
}

//default constructor
json::json(){
    pimpl = new impl;
    pimpl->m_value = pimpl->inf;
    pimpl->m_type = 0;
    pimpl->head_dizionario = nullptr;
    pimpl->head_lista = nullptr;
    pimpl->tail_dizionario = nullptr;
    pimpl->tail_lista = nullptr;
}

//copy constructor
json::json(json const& k){
    pimpl = new impl;
    /*pimpl->m_value = k.pimpl->m_value;
    pimpl->m_type = k.pimpl->m_type;
    pimpl->m_bool = k.pimpl->m_bool;
    pimpl->dizio = k.pimpl->dizio;
    pimpl->list = k.pimpl->list;
    pimpl->stringa = k.pimpl->stringa;*/
    pimpl->m_value = pimpl->inf;
    pimpl->m_type = 0;
    pimpl->head_dizionario = nullptr;
    pimpl->head_lista = nullptr;
    pimpl->tail_dizionario = nullptr;
    pimpl->tail_lista = nullptr;
    *this = k;
} 

// move constructor
json::json(json&& k){
    pimpl = new impl;
    pimpl->m_value = pimpl->inf;
    pimpl->m_type = 0;
    pimpl->head_dizionario = nullptr;
    pimpl->head_lista = nullptr;
    pimpl->tail_dizionario = nullptr;
    pimpl->tail_lista = nullptr;
    *this=k; 
} 

// destructor
json::~json(){
    if(is_dictionary()){
        dizionario* pc = pimpl->head_dizionario;
        while(pc){
            pimpl->head_dizionario = pimpl->head_dizionario->next;
            delete pc;
            pc = pimpl->head_dizionario;
        }
    }
    else if(is_list()){
        lista* tmp = pimpl->head_lista;
        while(tmp){
            pimpl->head_lista = pimpl->head_lista->next;
            delete tmp;
            tmp = pimpl->head_lista;
        }
    }
    delete pimpl;
} 

json::list_iterator json::begin_list(){
    if(is_list())
        return {pimpl->head_lista};
    else
         throw json_exception{"Lista errata."};
}

json::const_list_iterator json::begin_list() const{
    if(is_list())
        //return {&(pimpl->head_lista)};
        return {pimpl->head_lista};
    else
         throw json_exception{"Errore, lista non corretta."};
}

json::list_iterator json::end_list(){
    if(is_list())
        return {nullptr};
    else
         throw json_exception{"Errore, ricontrolla se la lista è corretta."};
}

json::const_list_iterator json::end_list() const{
    if(is_list())
        //return {&(pimpl->tail_lista)};
        return {nullptr};
    else
         throw json_exception{"Attenzione lista non corretta."};
}

json::dictionary_iterator json::begin_dictionary(){
    if(is_dictionary())
        return {pimpl->head_dizionario};
    else
         throw json_exception{"Errore, l'elemento inserito non è di tipo dizionario."};
}

json::const_dictionary_iterator json::begin_dictionary() const{
    if(is_dictionary())
        //return {&(pimpl->head_dizionario)};
        return {pimpl->head_dizionario};
    else
         throw json_exception{"Errore, dizionario inserito non è corretto."};
}

json::dictionary_iterator json::end_dictionary(){
    if(is_dictionary())
        return {nullptr};
    else
         throw json_exception{"Errore, dizionario non valido."};
}

json::const_dictionary_iterator json::end_dictionary() const{
    if(is_dictionary())
        //return {&(pimpl->tail_dizionario)};
        return {nullptr};
    else
         throw json_exception{"Errore, l'elemento inserito non è un corretto dizionario."};
}

json& json::operator=(json const& j){
    if(this == &j) return *this;
   if(is_dictionary()){
        dizionario* pc = pimpl->head_dizionario;
        while(pc){
            pimpl->head_dizionario = pimpl->head_dizionario->next;
            delete pc;
            pc = pimpl->head_dizionario;
        }
    }
    else if(is_list()){
        lista* tmp = pimpl->head_lista;
        while(tmp){
            pimpl->head_lista = pimpl->head_lista->next;
            delete tmp;
            tmp = pimpl->head_lista;
        }
    }
    if(j.is_dictionary()){
        set_dictionary();
        pimpl->copia_dizio(j.pimpl->head_dizionario);
    }
    else if(j.is_list()){
         set_list();
        pimpl->copia_list(j.pimpl->head_lista);
    }
    else if(j.is_number()){
        set_number(j.pimpl->m_value);
    }
    else if(j.is_string()){
        set_string(j.pimpl->stringa);
    }
    else if(j.is_bool()){
        set_bool(j.pimpl->m_bool);
    }
    else if(j.is_null()){
        set_null();
    }
    return *this;
}

json& json::operator=(json&& j){
     if(this == &j) return *this;
   if(is_dictionary()){
        dizionario* pc = pimpl->head_dizionario;
        while(pc){
            pimpl->head_dizionario = pimpl->head_dizionario->next;
            delete pc;
            pc = pimpl->head_dizionario;
        }
    }
    else if(is_list()){
        lista* tmp = pimpl->head_lista;
        while(tmp){
            pimpl->head_lista = pimpl->head_lista->next;
            delete tmp;
            tmp = pimpl->head_lista;
        }
    }
    if(j.is_dictionary()){
        set_dictionary();
        pimpl->head_dizionario = j.pimpl->head_dizionario;
        pimpl->tail_dizionario = j.pimpl->tail_dizionario;
        j.pimpl->head_dizionario = nullptr;
        j.pimpl->tail_dizionario = nullptr;
    }
    else if(j.is_list()){
         set_list();
        pimpl->head_lista = j.pimpl->head_lista;
        pimpl->tail_lista = j.pimpl->tail_lista;
        j.pimpl->head_lista = nullptr;
        j.pimpl->tail_lista = nullptr;

    }
    else if(j.is_number()){
        set_number(j.pimpl->m_value);
    }
    else if(j.is_string()){
        set_string(j.pimpl->stringa);
    }
    else if(j.is_bool()){
        set_bool(j.pimpl->m_bool);
    }
    else if(j.is_null()){
        set_null();
    }
    return *this;
}

json const& json::operator[](std::string const& i) const{
  if(is_dictionary()){
       bool found = false;
        dizionario* ptr = pimpl->head_dizionario;
        while (ptr && found == false){
            if(ptr->contenuto.first == i){
                found = true;
                }
            else
                ptr = ptr->next;
        } 
        
        if(found == false){
             throw json_exception{"Errore, l'elemento non è di tipo dizionario."};
        }
        return ptr->contenuto.second;
    }
    else
         throw json_exception{"Errore, l'elemento inserito non è un dizionario."};
}

json& json::operator[](std::string const& i){
    if(is_dictionary()){
       bool found = false;
       dizionario* ptr = pimpl->head_dizionario;
        while (ptr && found == false){
            if(ptr->contenuto.first == i){
                found = true;
                }
            else
                ptr = ptr->next;
        } 
        
        if(found == false){
            json j;
            std::pair<std::string, json> c;
            c.first = i;
            c.second = j;
            insert(c);
            return pimpl->tail_dizionario->contenuto.second;
        }
        return ptr->contenuto.second;
    }
    else
         throw json_exception{"Errore, l'elemento inserito non è di tipo dizionario."};
}


double& json::get_number(){
    if(is_number() == true){
        return pimpl->m_value;
    }
    else{
         throw json_exception{"Errore, non è di tipo double."};
    }
}

double const& json::get_number() const{
    if(is_number() == true){
        return pimpl->m_value;
    }
    else{
         throw json_exception{"Errore, non è un numero."};
    }
}

bool& json::get_bool(){
    if(is_bool() == true){
        return pimpl->m_bool;
    }
    else{
         throw json_exception{"Errore, non è di tipo booleano."};
    }
}

bool const& json::get_bool() const{
     if(is_bool() == true){
        return pimpl->m_bool;
    }
    else{
         throw json_exception{"Errore, non è un booleano."};
    }
}

std::string& json::get_string(){
     if(is_string() == true){
        return pimpl->stringa;
    }
    else{
         throw json_exception{"Errore, non è di tipo stringa."};
    }
}

std::string const& json::get_string() const{
    if(is_string() == true){
        return pimpl->stringa;
    }
    else{
         throw json_exception{"Errore, non è una stringa."};
    }
}

void json::set_string(std::string const& s){
    if(is_dictionary()){
        dizionario* pc = pimpl->head_dizionario;;
        while(pc){
            pimpl->head_dizionario = pimpl->head_dizionario->next;
            delete pc;
            pc = pimpl->head_dizionario;
        }
    }
    else if(is_list()){
        lista* tmp = pimpl->head_lista;
        while(tmp){
            pimpl->head_lista = pimpl->head_lista->next;
            delete tmp;
            tmp = pimpl->head_lista;
        }
    }
    pimpl->m_type = '"';
    pimpl->stringa = s;
}

void json::set_bool(bool boolean){
    if(is_dictionary()){
        dizionario* pc = pimpl->head_dizionario;;
        while(pc){
            pimpl->head_dizionario = pimpl->head_dizionario->next;
            delete pc;
            pc = pimpl->head_dizionario;
        }
    }
    else if(is_list()){
        lista* tmp = pimpl->head_lista;
        while(tmp){
            pimpl->head_lista = pimpl->head_lista->next;
            delete tmp;
            tmp = pimpl->head_lista;
        }
    }
    pimpl->m_type = 3;
     pimpl->m_bool = boolean;
}

void json::set_number(double num){
    if(is_dictionary()){
        dizionario* pc = pimpl->head_dizionario;;
        while(pc){
            pimpl->head_dizionario = pimpl->head_dizionario->next;
            delete pc;
            pc = pimpl->head_dizionario;
        }
    }
    else if(is_list()){
        lista* tmp = pimpl->head_lista;
        while(tmp){
            pimpl->head_lista = pimpl->head_lista->next;
            delete tmp;
            tmp = pimpl->head_lista;
        }
    }
    pimpl->m_type = 1;
    pimpl->m_value = num;
}

void json::set_null(){
    dizionario* pc = pimpl->head_dizionario;;
    while(pc){
        pimpl->head_dizionario = pimpl->head_dizionario->next;
        delete pc;
        pc = pimpl->head_dizionario;
    }
    lista* tmp = pimpl->head_lista;
    while(tmp){
        pimpl->head_lista = pimpl->head_lista->next;
        delete tmp;
        tmp = pimpl->head_lista;
    }
    pimpl->m_bool = false;
    pimpl->m_value = 0;
    pimpl->m_type = 0;
    pimpl->stringa = "";
}

void json::set_list(){
    if(is_dictionary()){
        dizionario* pc = pimpl->head_dizionario;
        while(pc){
            pimpl->head_dizionario = pimpl->head_dizionario->next;
            delete pc;
            pc = pimpl->head_dizionario;
        }
    }
    else if(is_list()){
        lista* tmp = pimpl->head_lista;
        while(tmp){
            pimpl->head_lista = pimpl->head_lista->next;
            delete tmp;
            tmp = pimpl->head_lista;
        }
    }
    pimpl->m_type = '[';
    pimpl->head_lista = nullptr;
    pimpl->tail_lista = nullptr;
}

void json::set_dictionary(){
    if(is_dictionary()){
        dizionario* pc = pimpl->head_dizionario;
        while(pc){
            pimpl->head_dizionario = pimpl->head_dizionario->next;
            delete pc;
            pc = pimpl->head_dizionario;
        }
    }
    else if(is_list()){
        lista* tmp = pimpl->head_lista;
        while(tmp){
            pimpl->head_lista = pimpl->head_lista->next;
            delete tmp;
            tmp = pimpl->head_lista;
        }
    }
    pimpl->m_type = '{';
    pimpl->head_dizionario = pimpl->tail_dizionario = nullptr;
}

void json::push_front(json const& j){
    if(is_list()){
        if (pimpl->head_lista == nullptr) {
            pimpl->head_lista = new lista{nullptr, j};
            pimpl->tail_lista = pimpl->head_lista;
            return;
        }
        pimpl->head_lista = new lista{pimpl->head_lista, j};
    }
    else
         throw json_exception{"Errore, elemento non di tipo lista."};
}

void json::push_back(json const& v){
    if(is_list()){
        if (pimpl->head_lista == nullptr) {
            push_front(v);
            return;
        }
        pimpl->tail_lista->next = new lista{nullptr, v};
        pimpl->tail_lista = pimpl->tail_lista->next;
    }
    
    else
        throw json_exception{"Errore, l'elemento non è una lista."};
}

void json::insert(std::pair<std::string, json> const& c){
   if(is_dictionary()){
    pimpl->append_dizionario(c);
   }
   else
        throw json_exception{"Errore, l'elemento inserito non è di tipo dizionario."};
}

void stampa_dizionario(ostream& os, json const& rhs);
void stampa_lista(ostream& os, json const& rhs);

void stampa_second(ostream& os, json const& rhs){
    if(rhs.is_dictionary()){
        stampa_dizionario(os, rhs);
    }
    else if(rhs.is_list()){
        stampa_lista(os, rhs);
    }
    else if(rhs.is_number()){
        os << rhs.get_number();
    }
   
    else if(rhs.is_null()){
        os << "null";
    }
    else if(rhs.is_string()){
        os << rhs.get_string();
    }
     else if(rhs.is_bool()){
        if(rhs.get_bool() == true)
            os << "true";
        else
            os << "false";
    }
    
}

void stampa_dizionario(ostream& os, json const& rhs){
    cout << '{';
    for(auto i = rhs.begin_dictionary(); i != rhs.end_dictionary(); i++){
        os << (*i).first;
        stampa_second(os, (*i).second);
    }
    cout << '}';
}

void stampa_lista(ostream& os, json const& rhs){
    cout << '[';
    for(auto i = rhs.begin_list(); i != rhs.end_list(); i++){
        stampa_second(os, *i);
    }
    cout<< ']';
}

std::ostream& operator<<(std::ostream& lhs, json const& rhs){
    stampa_second(lhs, rhs);
    return lhs;
}

std::istream& operator>>(std::istream& lhs, json& rhs){
    rhs = G(lhs);
    return lhs;
}



