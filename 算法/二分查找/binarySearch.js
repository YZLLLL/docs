function binarySearch(arr, n) {
    var left = 0;
    var right = arr.length - 1;
    if (n > arr[right] || n < arr[left])
        return -1;
    while (left <= right) {
        var mid = Math.floor((left + right) / 2);
        if (arr[mid] === n)
            return mid;
        else if (arr[mid] > n) {
            right = mid - 1;
        }
        else {
            left = mid + 1;
        }
    }
    return -1;
}
var array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
var target = 23;
var result = binarySearch(array, target);
console.log(result);
