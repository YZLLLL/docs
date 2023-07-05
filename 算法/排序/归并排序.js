/**
 * 归并排序
 *
 */
function mergeSort(arr) {
    if (arr.length <= 1)
        return arr;
    var index = Math.floor(arr.length - 1);
    return merge(mergeSort(arr.slice(0, index)), mergeSort(arr.slice(index)));
}

function merge(left, right) {
    var result = [];
    var i = 0;
    var j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        }
        else {
            result.push(right[j]);
            j++;
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}
var arr = [2, 312, 25, 34, 23, 233, 234, 54, 2342];
console.log(mergeSort(arr));
