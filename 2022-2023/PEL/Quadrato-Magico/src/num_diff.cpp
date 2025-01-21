#include<iostream>
#include<vector>
#include"function.hpp"

bool num_diff(std::vector<std::vector<int>>& v)
{
    int n = v.size();
    std::vector<bool> nums(n*n+1, false);
    for (int r = 0; r < n; r++) {
        for (int c = 0; c < n; c++) {
            int num = v.at(r).at(c);
            if (num < 1 || num > n*n || nums[num]) {
                 return false;
            }
            nums[num] = true;
        }
    }
    return true;
}