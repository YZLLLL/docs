// 时间复杂度 O(n²)  n + n-1 + n-2 + ... + 1 ---> n*(n+1) / 2
// 空间复杂度 O(1)
function bubbleSort(arr: Array<number>): Array<number> {
  for ( let i = 0; i < arr.length; i++ ) {
    for ( let j = 0; j < arr.length - 1 - i; j++ ) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

console.log(bubbleSort([3,2,1,2,3]))


/**
 * 优化
 * 
 * 增加一个变量查看内层循环是否有交换
 * 无交换则代表已经排序完成，直接结束
 * 
 */
