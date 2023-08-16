/**
 * 
给你两个 正 整数 startPos 和 endPos 。最初，你站在 无限 数轴上位置 startPos 处。在一步移动中，你可以向左或者向右移动一个位置。

给你一个正整数 k ，返回从 startPos 出发、恰好 移动 k 步并到达 endPos 的 不同 方法数目。由于答案可能会很大，返回对 10E9 + 7 取余 的结果。

如果所执行移动的顺序不完全相同，则认为两种方法不同。

注意：数轴包含负整数。
 */

// 超时

// 14 / 35 个通过的测试用例
var numberOfWays = function (startPos, endPos, k) {
  function s(startPos, endPos, k) {
    if (k == 0) return 0;
    if (Math.abs(endPos - startPos) > k) return 0;
    if (Math.abs(endPos - startPos) == k) return 1;
    return s(startPos, endPos - 1, k - 1) + s(startPos, endPos + 1, k - 1);
  }
  return s(startPos, endPos, k) % (7 + 10e9);
};

// s(startPos, endPos, k) = s(startPos, endPos - 1, k - 1) + s(startPos, endPos + 1, k - 1)

// var numberOfWays = function (startPos, endPos, k) {
//   const dp = new Array(k).fill(new Array(Math.abs(k)).fill(0));
//   console.log(dp);
// };
console.log(numberOfWays(1, 10, 99));
