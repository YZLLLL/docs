/**
 * 插入排序
 * 类似打牌整理牌的操作
 * 如果下一张牌小于当前的牌，则在当前牌前面（已经整理好的牌）找第一个大于他的位置，插入在他之前
 */
function insertSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      let temp = arr.splice(i + 1, 1)[0];
      for (let j = 0; j <= i; j++) {
        if(temp < arr[j]) {
          arr.splice(j, 0, temp);
          break;
        }
      }
    }
  }
  return arr;
}


console.log(insertSort([2,312,25,34,23,233,234,54,2342]));