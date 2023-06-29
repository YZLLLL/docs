function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return  arr;
  const midValue = arr[Math.floor(arr.length / 2)];
  const less: number[] = [];
  const more: number[] = [];
  const equal: number[] = [];
  for ( let i = 0; i < arr.length; i++) {
    if (midValue > arr[i]) {
      less.push(arr[i]);
    } else if (midValue === arr[i]) {
      equal.push(arr[i]);
    } else {
      more.push(arr[i]);
    }
  }
  return quickSort(less).concat(equal, quickSort(more))
}

const arr = [3,2,1,2,3,2,5]
console.log(quickSort(arr));
console.log(arr)