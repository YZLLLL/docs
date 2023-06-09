/**
 * 你是一个专业的小偷，计划偷窃沿街的房屋。
 * 每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
 */
// Max(n) = Math.max( (Max(n-2) + n), Max(n-1) )
var rob = function (arr) {
    if (arr.length <= 1)
        return Math.max.apply(Math, arr);
    var len = arr.length;
    var dep = new Array(len).fill(0);
    dep[0] = arr[0];
    dep[1] = Math.max(arr[0], arr[1]);
    for (var i = 2; i < len; i++) {
        dep[i] = Math.max(dep[i - 2] + arr[i], dep[i - 1]);
    }
    return dep[len - 1];
};
var arr = [2, 7, 9, 3, 1];
console.log(rob(arr));
