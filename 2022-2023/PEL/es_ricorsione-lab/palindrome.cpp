#include <iostream>
#include <cassert>

bool is_palindrome_iterative(std::string const& S) {
    uint64_t n = S.length();
    for (uint64_t i = 0; i != n; ++i) {
        if (S[i] != S[n - i - 1]) return false;
    }
    return true;
}

bool is_palindrome_recursive(std::string const& S, int i, int j) {
    if (i >= j) return true;
    if (S[i] != S[j]) return false;
    return is_palindrome_recursive(S, i + 1, j - 1);
}

int main() {
    std::string S("ROTATOR");
    std::cout << "'" << S << "' is ";
    if (!is_palindrome_iterative(S)) std::cout << "not ";
    std::cout << "palindrome" << std::endl;

    std::cout << "'" << S << "' is ";
    if (!is_palindrome_recursive(S, 0, S.length() - 1)) std::cout << "not ";
    std::cout << "palindrome" << std::endl;
    return 0;
}
