#include <iostream>

uint64_t fibonacci_iterative(const uint64_t n) {
    uint64_t F_n_2 = 0;
    uint64_t F_n_1 = 1;
    for (uint64_t i = 0; i != n; ++i) {
        uint64_t F_n = F_n_2 + F_n_1;
        F_n_2 = F_n_1;
        F_n_1 = F_n;
    }
    return F_n_2;
}

uint64_t fibonacci_recursive(const uint64_t n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    return fibonacci_recursive(n - 2) + fibonacci_recursive(n - 1);
}

int main() {
    for (uint64_t n = 0; n <= 10; ++n) {
        std::cout << "F_itr(" << n << ") = " << fibonacci_iterative(n) << std::endl;
        std::cout << "F_rec(" << n << ") = " << fibonacci_recursive(n) << std::endl;
    }
    return 0;
}
