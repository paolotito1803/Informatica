#include <iostream>
#include <vector>
#include <chrono>

constexpr int N = 10000000;
constexpr int M = 1000;

/*
 * creates N random numbers, stores them
 * in a vector, extracts M *random numbers* from this
 * vector, and computes their average.
 */
int64_t random_access() {
    std::vector<int> points;
    points.reserve(N);

    srand(time(NULL));

    for (int i = 0; i < N; ++i) points.push_back(rand());

    // pre-compute a set of M random indexes between 0 and N-1
    std::vector<int> indexes;
    for (int i = 0; i < M; ++i) indexes.push_back(rand() % N);

    int64_t sum = 0;
    auto start = std::chrono::high_resolution_clock::now();
    for (int i = 0; i < M; ++i) sum += points[indexes[i]];
    auto stop = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(stop - start).count();

    std::cout << "total time (random accesses) " << duration << " nanoseconds." << std::endl;

    return sum / M;
}

/*
 * creates N random numbers, stores them
 * in a vector, extracts the *first M numbers*
 * from this vector, and computes their average
 */
int64_t sequential_access() {
    std::vector<int> points;
    points.reserve(N);

    srand(time(NULL));

    for (int i = 0; i < N; ++i) points.push_back(rand());

    std::vector<int> indexes;
    for (int i = 0; i < M; ++i) indexes.push_back(i);

    int64_t sum = 0;
    auto start = std::chrono::high_resolution_clock::now();
    for (int i = 0; i < M; ++i) sum += points[indexes[i]];
    auto stop = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(stop - start).count();

    std::cout << "total time (sequential accesses): " << duration << " nanoseconds." << std::endl;

    return sum / M;
}

int main() {
    auto avg1 = random_access();
    auto avg2 = sequential_access();
    std::cout << "### ignore: " << avg1 << " " << avg2 << std::endl;
}
