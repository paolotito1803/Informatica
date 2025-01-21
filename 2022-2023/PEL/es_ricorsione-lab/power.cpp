#include <iostream>
#include <cassert>

int power_iterative(int x, int y) {
    assert(y >= 0);
    int result = 1;
    for (int i = 0; i != y; ++i) result *= x;
    return result;
}

int power_recursive(int x, int y) {
    assert(y >= 0);
    if (y == 0) return 1;
    return x * power_recursive(x, y - 1);
}

int main() {
    int x = 3;
    int y = 5;
    std::cout << "power_iterative(" << x << "," << y << ") = " << power_iterative(3, 5)
              << std::endl;
    std::cout << "power_recursive(" << x << "," << y << ") = " << power_recursive(3, 5)
              << std::endl;
    return 0;
}
