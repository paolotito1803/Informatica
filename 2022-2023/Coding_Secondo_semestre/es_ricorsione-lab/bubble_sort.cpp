#include <iostream>
#include <cassert>

void swap(int* A, uint64_t i, uint64_t n) {
    if (i == n - 1) return;
    if (A[i] > A[i + 1]) std::swap(A[i], A[i + 1]);
    swap(A, i + 1, n);
}

void bubble_sort_v2(int* A, uint64_t n) {
    if (n == 0 or n == 1) return;
    swap(A, 0, n);
    bubble_sort_v2(A, n - 1);
}

void bubble_sort_v1(int* A, uint64_t n) {
    if (n == 0 or n == 1) return;
    for (uint64_t i = 0; i != n - 1; ++i) {
        if (A[i] > A[i + 1]) std::swap(A[i], A[i + 1]);
    }
    bubble_sort_v1(A, n - 1);
}

void bubble_sort_v1_better(int* A, uint64_t n) {
    std::cout << n << std::endl;
    if (n == 0 or n == 1) return;
    uint64_t last_swap_pos = 0;
    for (uint64_t i = 0; i != n - 1; ++i) {
        if (A[i] > A[i + 1]) {
            std::swap(A[i], A[i + 1]);
            last_swap_pos = i + 1;
        }
    }
    bubble_sort_v1_better(A, last_swap_pos);
}

int main() {
    int A[] = {0, 34, -3, 0, 8, 4, 21, 11};

    uint64_t n = sizeof(A) / sizeof(int);
    // bubble_sort_v1(A, n);
    // bubble_sort_v2(A, n);
    bubble_sort_v1_better(A, n);

    for (uint64_t i = 0; i != n; ++i) { std::cout << A[i] << " "; }
    std::cout << std::endl;

    return 0;
}