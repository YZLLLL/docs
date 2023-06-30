/**
 * dp记录从i开始的最长递增子序列，最后max一下
 */

var lengthOfLIS = function(nums: number[]) {
  const len = nums.length;
  if (len < 2) return 1;
  const dp = new Array(len).fill(1);
  for (let i = len - 2; i >= 0; i--) {
    for (let j = i + 1; j <= len; j++) {
      if (nums[i] < nums[j]) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
    }

  }
  return Math.max(...dp);
};

console.log(lengthOfLIS([10,9,2,5,3,7,101,18]));