/**
 * 归并排序 
 * 分治
 * 递归，让局部有序
 */
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const index = Math.floor(arr.length - 1);
  return merge(mergeSort(arr.slice(0, index)), mergeSort(arr.slice(index)));
}


/**
 * 两个有序数组的排序方法
 * 保存两个当前的索引，比较值，将最小值push进result,索引++
 * 当某个索引 == 数组长度，停止，并把未完成的那个数组contact在result上
 */
function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}


const arr = [2,312,25,34,23,233,234,54,2342];
console.log(mergeSort(arr));
