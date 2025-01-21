#include <iostream>

// int smaller(int const* A, int n, int x) {
//     if (n == 0) return 0;
//     return (A[0] < x) + smaller(A + 1, n - 1, x);
// }

// int count_inversions(int const* A, int n) {
//     if (n == 1) return 0;
//     return count_inversions(A + 1, n - 1) + smaller(A + 1, n - 1, A[0]);
// }

int larger(int const* A, int i, int j) {
    if (i == j) return 0;
    return (A[i] > A[j]) + larger(A, i + 1, j);
}

int count_inversions_recursive(int const* A, int i, int j) {
    if (i == j) return 0;
    return count_inversions_recursive(A, i, j - 1) + larger(A, i, j - 1);
}

int count_inversions_iterative(int const* A, int n) {
    int count = 0;
    for (int j = 0; j != n; ++j) {
        for (int i = 0; i < j; ++i) {
            if (A[i] > A[j]) ++count;
        }
    }
    return count;
}

int main() {
    int A[] = {3, -1, 0, 2, 5, -3, 2, -1};
    std::cout << count_inversions_iterative(A, sizeof(A) / sizeof(int)) << std::endl;
    std::cout << count_inversions_recursive(A, 0, sizeof(A) / sizeof(int)) << std::endl;
    return 0;
}