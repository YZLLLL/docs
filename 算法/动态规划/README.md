几个常见的动态规划问题和它们对应的状态转移方程示例：

1. 斐波那契数列（Fibonacci Sequence）：

dp[i] = dp[i-1] + dp[i-2]，其中 dp[i] 表示第 i 个斐波那契数。

2. 爬楼梯问题（Climbing Stairs）：

dp[i] = dp[i-1] + dp[i-2]，其中 dp[i] 表示爬到第 i 级楼梯的方法数。

3. 背包问题（Knapsack Problem）：

dp[i][j] = max(dp[i-1][j], dp[i-1]j-weight[i]] + value[i])，其中 dp[i][j] 表示在前 i 个物品中选择总重量不超过 j 的最大价值，weight[i] 表示第 i 个物品的重量，value[i] 表示第 i 个物品的价值。

4. 最长递增子序列（Longest Increasing Subsequence）：

dp[i] = max(dp[j] + 1, dp[i])，其中 dp[i] 表示以第 i 个元素结尾的最长递增子序列的长度，j 为 0 到 i-1 的索引，且 nums[i] > nums[j]。

5. 最大子数组和（Maximum Subarray Sum）：

dp[i] = max(nums[i], nums[i] + dp[i-1])，其中 dp[i] 表示以第 i 个元素结尾的最大子数组和。

6. 最长公共子序列（Longest Common Subsequence）：

如果 str1[i] 等于 str2[j]，则 dp[i][j] = dp[i-1][j-1] + 1；

否则，dp[i][j] = max(dp[i-1][j], dp[i][j-1])，其中 dp[i][j] 表示 str1 的前 i 个字符和 str2 的前 j 个字符的最长公共子序列的长度。

7. 编辑距离（Edit Distance）：

如果 word1[i] 等于 word2[j]，则 dp[i][j] = dp[i-1][j-1]；

否则，dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1，其中 dp[i][j] 表示将 word1 的前 i 个字符转换为 word2 的前 j 个字符所需的最少操作次数。

8.打家劫舍（House Robber）：

dp[i] = max(dp[i-1], dp[i-2] + nums[i])，其中 dp[i] 表示前 i 个房屋能够获得的最大金额，nums[i] 表示第 i 个房屋中的金额。

9. 最大正方形（Maximal Square）：

如果 matrix[i][j] 等于 1，则 dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1；

否则，dp[i][j] = 0，其中 dp[i][j] 表示以 matrix[i][j] 为右下角的最大正方形的边长。
