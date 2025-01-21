#include <iostream>

int main() {
    int* a = new int[10];
    delete[] a;
    std::cout << a[5] << std::endl;
    return 0;
}