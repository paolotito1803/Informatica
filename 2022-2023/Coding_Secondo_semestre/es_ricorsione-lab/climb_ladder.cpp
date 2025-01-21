#include <iostream>
#include <cassert>

int climb_ladder(int n, int recursion_depth) {
    assert(n >= 0);
    if (n == 0) return 0;
    for (int i = 0; i != recursion_depth; ++i) std::cout << "|\t";
    std::cout <<  // std::string(recursion_depth, '\t')
        "climbing a ladder with " << n << " steps...\n"
              << std::endl;
    int climbed_steps = 1 + climb_ladder(n - 1, recursion_depth + 1);
    for (int i = 0; i != recursion_depth; ++i) std::cout << "|\t";
    std::cout << "climbed " << climbed_steps << " steps\n" << std::endl;
    return climbed_steps;
}

int main() {
    climb_ladder(7, 0);
    return 0;
}