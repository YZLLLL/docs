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

/**
 *
 */
function minSubArrayLen(target, nums) {
  var len = nums.length;
  var slow = 0;
  var fast = 1;
  var result = len + 1;
  var temp = nums[slow];
  if (temp >= target) return 1;
  while (fast < len) {
    temp += nums[fast];
    if (temp >= target) {
      while (temp - nums[slow] >= target && slow <= fast) {
        temp -= nums[slow];
        slow++;
      }
      result = Math.min(result, fast - slow + 1);
    }
    fast++;
  }
  if (result > len) {
    result = 0;
  }
  return result;
}
console.log(minSubArrayLen(7, [1, 1, 3, 4, 2, 3]));
