/**
 * dp记录从i开始的最长递增子序列，最后max一下
 */
var lengthOfLIS = function (nums) {
  var len = nums.length;
  if (len < 2) return 1;
  var dp = new Array(len).fill(1);
  for (var i = len - 2; i >= 0; i--) {
    for (var j = i + 1; j <= len; j++) {
      if (nums[i] < nums[j]) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
    }
  }
  return Math.max.apply(Math, dp);
};
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3]));
