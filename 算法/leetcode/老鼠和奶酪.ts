/**
 * 有两只老鼠和 n 块不同类型的奶酪，每块奶酪都只能被其中一只老鼠吃掉。

下标为 i 处的奶酪被吃掉的得分为：

如果第一只老鼠吃掉，则得分为 reward1[i] 。
如果第二只老鼠吃掉，则得分为 reward2[i] 。
给你一个正整数数组 reward1 ，一个正整数数组 reward2 ，和一个非负整数 k 。

请你返回第一只老鼠恰好吃掉 k 块奶酪的情况下，最大 得分为多少。

输入：reward1 = [1,1,3,4], reward2 = [4,4,1,1], k = 2
输出：15
解释：这个例子中，第一只老鼠吃掉第 2 和 3 块奶酪（下标从 0 开始），第二只老鼠吃掉第 0 和 1 块奶酪。
总得分为 4 + 4 + 3 + 4 = 15 。
15 是最高得分。
 */
// 1 2 3 4
// 5 6 7 8

// 贪心算法
// 假设第一只老鼠吃0块，最大值就是2全吃，如果第一只吃一块，那就是选择差值（reward2[i]-reward2[i]）最小的那一块
var miceAndCheese = function(reward1, reward2, k) {
  // 保存最大值
  let max = 0;
  // 记录差值
  const diffs = reward2.map((val, index) => {
    max += val;
    return reward1[index] - val;
  })
  diffs.sort((a, b)=> a - b);
  for (let i = 1; i <= k; i++) {
    max += diffs[reward1.length - i];
  }
  return max;
};