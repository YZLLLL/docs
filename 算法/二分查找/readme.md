二分查找也称折半查找（Binary Search），它是一种效率较高的查找方法。(**必须采用顺序存储结构**)

首先，假设表中元素是按升序排列，将表中间位置记录的关键字与查找关键字比较，如果两者相等，则查找成功；否则利用中间位置记录将表分成前、后两个子表，如果中间位置记录的关键字大于查找关键字，则进一步查找前一子表，否则进一步查找后一子表。重复以上过程，直到找到满足条件的记录，使查找成功，或直到子表不存在为止，此时查找不成功。

##### 循环实现

```js
function binarySearch(arr, target) {
  // 定义左、右边界
  let left = 0;
  let right = arr.length - 1;
  // 小于最小值，大于最大值说明不可能有，直接返回 -1
  if (target > arr[right] || target < arr[left]) return -1;

  while (left <= right) {
    // 取中间值，与 target 比较
    let mid = Math.floor((right + left) / 2);
    // 相等说明找到，返回下标
    if (arr[mid] === target) {
      return mid;
      // arr[mid] < target 说明目标在 mid + 1 到 right 之间
    } else if (arr[mid] < target) {
      left = mid + 1;
      // 反之，arr[mid] > target,说明目标在 left 到 mid - 1 之间
    } else {
      right = mid - 1;
    }
  }
  return -1;
}
```

##### 递归实现

```js
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  let mid = Math.floor((right + left) / 2);
  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearch(arr, target, mid + 1, right);
  } else {
    return binarySearch(arr, target, left, mid - 1);
  }
}
```

总体思想就是保存左边界和右边界（下标记为 left 和 right），取这两个的中间数字（下标记为 mid），与目标数字（记为 target）对比，相等则说明找到，直接返回 mid，大于 target 则将 right 变为 mid-1，小于 left 变为 left 变为 mid+1，然后继续取 left 和 right 的中间数字比较，直到找到或者找完。
