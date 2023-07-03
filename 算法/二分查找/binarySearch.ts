function binarySearch<T extends number[]>(arr: T, n: number): keyof T {
  let left = 0;
  let right = arr.length - 1;
  if (n > arr[right] || n < arr[left]) return -1;
  while ( left <= right ) {
    const mid = Math.floor( (left + right) / 2 );
    if (arr[mid] === n) return mid;
    else if (arr[mid] > n) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}

const array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
const target = 23;
const result = binarySearch(array, target);

console.log(result)