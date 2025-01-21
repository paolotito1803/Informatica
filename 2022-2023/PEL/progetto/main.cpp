#include"json.cpp"

int main(){
    try
    {
        json j;
        cin >> j;
        cout << j;
    }
    catch(json_exception const& e)
    {
        std::cerr << e.msg << '\n';
    }
    
}