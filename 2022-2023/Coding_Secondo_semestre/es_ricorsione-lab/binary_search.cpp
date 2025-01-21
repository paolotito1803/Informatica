#include <iostream>
#include <cassert>
#include <vector>

/* return the position of x into vector v if x is found,
   -1 otherwise */
int binary_search_iterative(std::vector<int> const& v, int x) {
    int lo = 0;
    int hi = v.size() - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        int val = v[mid];
        if (val == x) {
            return mid;
        } else if (val < x) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return -1;
}

/* return the position of x into vector v if x is found,
   -1 otherwise */
int binary_search_recursive_helper(std::vector<int> const& v, int lo, int hi, int x) {
    if (lo > hi) return -1;
    int mid = (lo + hi) / 2;
    int val = v[mid];
    if (val == x) return mid;
    if (val < x) return binary_search_recursive_helper(v, mid + 1, hi, x);
    return binary_search_recursive_helper(v, lo, mid - 1, x);
}
int binary_search_recursive(std::vector<int> const& v, int x) {
    return binary_search_recursive_helper(v, 0, v.size() - 1, x);
}

int main() {
    std::vector<int> v{3, 5, 6, 10, 23, 25, 26, 31, 34, 50};

    int x = 10;
    std::cout << "element " << x << " found at pos " << binary_search_iterative(v, x) << std::endl;
    std::cout << "element " << x << " found at pos " << binary_search_recursive(v, x) << std::endl;

    x = 28;
    std::cout << "element " << x << " found at pos " << binary_search_iterative(v, x) << std::endl;
    std::cout << "element " << x << " found at pos " << binary_search_recursive(v, x) << std::endl;

    return 0;
}
