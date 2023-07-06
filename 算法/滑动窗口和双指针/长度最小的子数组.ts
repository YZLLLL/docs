/**
 * 长度最小的子数组
 * 
 * 给定一个含有 n 个正整数的数组和一个正整数 target 。
 * 找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。
 * 如果不存在符合条件的子数组，返回 0 。
 * 
 * 输入：target = 7, nums = [2,3,1,2,4,3]
 * 输出：2
 * 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 */

function minSubArrayLen(target: number, nums: number[]): number {
  const len = nums.length;
  let slow = 0;
  let fast = 1;
  let result = len + 1;
  let temp = nums[slow];
  if (temp >= target) return 1;
  while (fast <= len) {
    temp += nums[fast];
    if (temp >= target) {
      result = Math.min(result, fast - slow + 1);
      slow = fast;
    }
    fast++;
  }
  if (temp > len) {
    temp = 0;
  }
  return temp;
};

console.log(minSubArrayLen(7, [2,3,1,2,4,3]))