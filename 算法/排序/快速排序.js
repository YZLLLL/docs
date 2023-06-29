/**
 *
 * 时间复杂度 O()
 * 空间复杂度 O()
 *
 * 取中间元素，大于小于等于各放在一个数字，再递归调用
 * 递归停止条件 arr长度为1或者0
 */
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  var midValue = arr[Math.floor(arr.length / 2)];
  var less = [];
  var more = [];
  var equal = [];
  for (var i = 0; i < arr.length; i++) {
    if (midValue > arr[i]) {
      less.push(arr[i]);
    } else if (midValue === arr[i]) {
      equal.push(arr[i]);
    } else {
      more.push(arr[i]);
    }
  }
  return quickSort(less).concat(equal, quickSort(more));
}
var arr = [3, 2, 1, 2, 3, 2, 5];
console.log(quickSort(arr));
console.log(arr);
