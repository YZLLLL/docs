/**
 * 选择排序
 * 通过不断选择剩余元素中的最小值，并将其与当前位置交换，从而逐步将数组排序
 *
 * 优化: 每次遍历不仅找出最小值，也找出最大值，减小时间复杂度（空间复杂度变大）
 */
function selectSort(arr) {
    var minIndex, maxIndex, minTemp, maxTemp;
    for (var i = 0; i < Math.floor(arr.length / 2); i++) {
        minIndex = i;
        maxIndex = i;
        for (var j = i + 1; j < arr.length - i; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
            if (arr[j] > arr[maxIndex]) {
                maxIndex = j;
            }
        }
        minTemp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = minTemp;
        maxTemp = arr[maxIndex];
        arr[maxIndex] = arr[arr.length - i - 1];
        arr[arr.length - i - 1] = maxTemp;
    }
    return arr;
}
console.log(selectSort([3, 2, 1, 2, 3, 2, 5, 4]));
