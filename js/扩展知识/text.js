var fourSum = function (nums, target) {
  if (nums.length < 4) return [];
  const result = [];
  nums.sort((a, b) => a - b); // 升序排列
  const length = nums.length;
  // 直接遍历每一种组合求解
  for (let i = 0; i < length - 3; i++) {
    // 当 i 不是0，并且和后一个相等，直接跳过
    // 如 [2,2,2,3,3] target 10
    // 第一次 i = 0,nums[0] == nums[1],不跳过 2 2 3 3找到了
    // 第二次 i = 1，nums[1] == nums[2],如果不跳过仍然会找到 2 2 3 3
    if (i !== 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    // 最小的4个之和都大于target，直接break
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
      break;
    }
    // nums[i]和最大3个之和都小于target，直接continue
    if (
      nums[i] + nums[length - 3] + nums[length - 2] + nums[length - 1] <
      target
    ) {
      continue;
    }
    for (let j = i + 1; j < length - 2; j++) {
      // 当 j 不是 i 后一个时，并且和后一个相等，直接跳过
      if (j !== i + 1 && nums[j] === nums[j - 1]) {
        continue;
      }
      // 这两个判断原理同上
      if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) {
        break;
      }
      if (nums[i] + nums[j] + nums[length - 2] + nums[length - 1] < target) {
        continue;
      }
      // 定义两个指针，分别指向 j+1 和末尾
      let left = j + 1,
        right = length - 1;
      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];
        if (sum === target) {
          // 找到了
          result.push([nums[i], nums[j], nums[left], nums[right]]);
          // left++,right--
          // 遇到重复值，跳过
          while (left < right && nums[left] === nums[left + 1]) {
            left++;
          }
          left++;
          while (left < right && nums[right] === nums[right - 1]) {
            right--;
          }
          right--;
        } else if (sum < target) {
          left++;
        } else {
          right++;
        }
      }
    }
  }
  return result;
};

const nums = [2, 2, 2, 2, 2],
  target = 8;
console.log(fourSum(nums, target));
