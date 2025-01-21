#include <iostream>
#include <vector>

void generate_all_binary_strings(std::string& prefix, uint64_t population, const uint64_t n,
                                 const uint64_t k) {
    if (prefix.length() == n) {
        std::cout << prefix << std::endl;
        return;
    }

    prefix.push_back('1');
    if (population < k) generate_all_binary_strings(prefix, population + 1, n, k);

    prefix.pop_back();
    prefix.push_back('0');
    generate_all_binary_strings(prefix, population, n, k);

    prefix.pop_back();
}

int main() {
    const uint64_t n = 15;
    const uint64_t k = 3; /* at most k 1s */

    std::string prefix("");
    generate_all_binary_strings(prefix, 0, n, k);

    return 0;
}