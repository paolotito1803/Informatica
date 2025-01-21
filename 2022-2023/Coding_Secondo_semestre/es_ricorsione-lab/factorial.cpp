#include <iostream>

uint64_t factorial(const uint64_t n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}

int main() {
    const uint64_t n = 13;
    std::cout << n << "! = " << factorial(n) << std::endl;
    return 0;
}
