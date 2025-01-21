#include <iostream>
#include <cassert>

int climb_ladder(int n) {
    assert(n >= 0);
    if (n == 0) return 0;
    return 1 + climb_ladder(n - 1);
}

int main() {
    climb_ladder(5);
    return 0;
}
