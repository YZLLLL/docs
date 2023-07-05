/**
 * 插入排序
 * 类似打牌整理牌的操作
 */
function insertSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            var temp = arr.splice(i + 1, 1)[0];
            for (var j = 0; j <= i; j++) {
                if (temp < arr[j]) {
                    arr.splice(j, 0, temp);
                    break;
                }
            }
        }
    }
    return arr;
}
console.log(insertSort([2, 312, 25, 34, 23, 233, 234, 54, 2342]));
