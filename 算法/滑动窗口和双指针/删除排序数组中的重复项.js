/**
 *
 *  给你一个 升序排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。
 * 元素的 相对顺序 应该保持 一致 。然后返回 nums 中唯一元素的个数。
 */
function removeDuplicates(nums) {
  var slow = 0;
  var fast = 1;
  while (fast < nums.length) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast];
      ++slow;
    }
    ++fast;
  }
  console.log(nums);
  return slow;
}
console.log(removeDuplicates([1, 2, 3, 3, 4, 5, 5]));
