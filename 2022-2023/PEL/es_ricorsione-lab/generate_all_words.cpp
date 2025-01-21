#include <iostream>
#include <vector>
#include <chrono>
#include <string>

int generate_all_words_v1(std::vector<char> const& alphabet, std::string prefix, const uint64_t k) {
    if (prefix.length() == k) return 1;
    int count = 0;
    for (auto c : alphabet) count += generate_all_words_v1(alphabet, prefix + c, k);
    return count;
}

int generate_all_words_v2(std::vector<char> const& alphabet, std::string& prefix,
                          const uint64_t k) {
    if (prefix.length() == k) return 1;
    int count = 0;
    for (auto c : alphabet) {
        prefix.push_back(c);
        count += generate_all_words_v2(alphabet, prefix, k);
        prefix.pop_back();
    }
    return count;
}

int generate_all_words_v3(std::vector<char> const& alphabet, int i, std::string& word) {
    if (i == word.length()) return 1;
    int count = 0;
    for (auto c : alphabet) {
        word[i] = c;
        count += generate_all_words_v3(alphabet, i + 1, word);
    }
    return count;
}

typedef std::chrono::high_resolution_clock clock_type;

int main() {
    const uint64_t k = 14;
    std::vector<char> alphabet{'A', 'C', 'G', 'T'};

    {
        auto start = clock_type::now();
        std::string prefix("");
        int count = generate_all_words_v1(alphabet, prefix, k);
        auto stop = clock_type::now();
        std::cout << std::chrono::duration_cast<std::chrono::milliseconds>(stop - start).count()
                  << " [ms]" << std::endl;
        std::cout << "### ignore " << count << std::endl;
    }

    {
        auto start = clock_type::now();
        std::string prefix("");
        prefix.reserve(k);
        int count = generate_all_words_v2(alphabet, prefix, k);
        auto stop = clock_type::now();
        std::cout << std::chrono::duration_cast<std::chrono::milliseconds>(stop - start).count()
                  << " [ms]" << std::endl;
        std::cout << "### ignore " << count << std::endl;
    }

    {
        auto start = clock_type::now();
        std::string word;
        word.resize(k);
        int count = generate_all_words_v3(alphabet, 0, word);
        auto stop = clock_type::now();
        std::cout << std::chrono::duration_cast<std::chrono::milliseconds>(stop - start).count()
                  << " [ms]" << std::endl;
        std::cout << "### ignore " << count << std::endl;
    }

    return 0;
}
