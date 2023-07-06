
module.exports = function (source, map, meta) {
  const options = this.getOptions();

  const result = source + `
console.log("作者：${options.name}")
  `
  /**
   * 第一个参数：err 代表是否有错误 null表示没有错误
   * 第二个参数：content 处理后的内容
   * 第三个参数：source-map 继续传递source-map
   * 第四个参数：meta 给下一个loader传递参数
   */
  this.callback(null, result, map, meta)
}