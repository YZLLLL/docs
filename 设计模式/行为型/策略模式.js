/**
 * 策略模式是一种软件设计模式，它允许在运行时选择算法的行为。
 * 可以使用策略模式来实现动态算法选择。
 * 该模式将每个算法封装在单独的对象中，使它们可以互相替换，而不会影响到使用算法的客户端代码。
 * 这种灵活性使得在不修改现有代码的情况下，可以轻松地添加、删除或更改算法。
 */
// 定义策略对象
var strategy = {
    // 算法A
    algorithmA: function () {
        console.log("执行算法A");
    },
    // 算法B
    algorithmB: function () {
        console.log("执行算法B");
    },
    // 算法C
    algorithmC: function () {
        console.log("执行算法C");
    }
};
// 客户端代码
function executeAlgorithm(selectedAlgorithm) {
    strategy[selectedAlgorithm]();
}
// 使用策略模式执行算法
executeAlgorithm("algorithmA"); // 输出：执行算法A
executeAlgorithm("algorithmB"); // 输出：执行算法B
executeAlgorithm("algorithmC"); // 输出：执行算法C
