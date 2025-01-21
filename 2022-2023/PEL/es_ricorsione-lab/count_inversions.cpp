#include <iostream>
#include <cassert>

int merge(int* A, int lo, int mid, int hi) {
    std::cout << "merging lo " << lo << "; mid " << mid << "; hi " << hi << std::endl;

    int n = hi - lo + 1;

    for (int k = 0; k != n; ++k) { std::cout << A[lo + k] << " "; }
    std::cout << std::endl;

    int* tmp = new int[n];

    int i = lo;
    int j = mid + 1;
    int count = 0;
    int k = 0;
    while (i <= mid and j <= hi) {
        if (A[i] > A[j]) {
            count += mid - i + 1;
            tmp[k] = A[j++];
        } else {
            tmp[k] = A[i++];
        }
        ++k;
    }

    while (i <= mid) tmp[k++] = A[i++];
    while (j <= hi) tmp[k++] = A[j++];

    for (k = 0; k != n; ++k) A[lo + k] = tmp[k];
    delete[] tmp;

    std::cout << "count = " << count << std::endl;

    return count;
}

int count_inversions(int* A, int lo, int hi) {
    if (lo >= hi) return 0;
    int mid = (lo + hi) / 2;
    int l = count_inversions(A, lo, mid);
    int r = count_inversions(A, mid + 1, hi);
    return l + r + merge(A, lo, mid, hi);
}

int main() {
    int A[] = {3, -1, 0, 2, 5, -3, 2, -1};
    std::cout << count_inversions(A, 0, sizeof(A) / sizeof(int) - 1) << std::endl;
    return 0;
}
