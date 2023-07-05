/**
 * 希尔排序
 * 不是很懂
 */
function shellSort(arr) {
    var len = arr.length;
    var gap = Math.floor(len / 2);
    while (gap > 0) {
        for (var i = gap; i < len; i++) {
            var temp = arr[i];
            var j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    return arr;
}
console.log(shellSort([2, 312, 25, 34, 23, 233, 234, 54, 2342]));
