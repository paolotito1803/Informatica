#include <iostream>
#include <cassert>

uint64_t binomial_coefficient(const uint64_t n, const uint64_t k) {
    assert(n >= k);
    if (k == 0 or k == n) return 1;
    return binomial_coefficient(n - 1, k - 1) + binomial_coefficient(n - 1, k);
}

int main() {
    const uint64_t n = 4;
    /* print Pascal's triangle */
    for (uint64_t k = 0; k <= n; ++k) {
        std::cout << "C(" << n << "," << k << ") = " << binomial_coefficient(n, k) << std::endl;
    }
    return 0;
}
