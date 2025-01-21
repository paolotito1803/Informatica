#include <iostream>

int main() {
    int* a = new int[10];
    std::cout << a[10] << std::endl;
    delete[] a;
    return 0;
}