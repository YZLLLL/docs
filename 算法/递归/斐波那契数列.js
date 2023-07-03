// 求第n项斐波那契数列的值
// Fibonacci[0] = 1
// Fibonacci[1] = 1
// Fibonacci[n] = Fibonacci[n - 1] + Fibonacci[n - 2]
// 1 1 2 3 5 8 13 21 34 55 89 146
// 第一种 递归
// function Fibonacci(n: number): number {
//   if (n == 0 || n == 1) return 1;
//   return Fibonacci(n - 1) + Fibonacci(n - 2)
// }
// const result = Fibonacci(10);
// 第二种 动态规划
function Fibonacci(n) {
    var dp = [1, 1];
    var t = 1;
    while (t < n) {
        var temp = dp[1];
        dp[1] = dp[0] + dp[1];
        dp[0] = temp;
        t++;
    }
    return dp[1];
}
var result = Fibonacci(10);
console.log(result);
