/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

  有效字符串需满足：

  左括号必须用相同类型的右括号闭合。
  左括号必须以正确的顺序闭合。
  每个右括号都有一个对应的相同类型的左括号。
 */
// 判断太多
// var isValid = function(s: string): boolean {
//   const stack: string[] = [];
//   for (let i = 0; i < s.length; i++) {
//     if (s[i] === ")") {
//       if (stack[stack.length-1] === "(") {
//         stack.pop()
//       } else {
//         stack.push(s[i]);
//       };
//     } else if (s[i] === "}") {
//       if (stack[stack.length-1] === "{") {
//         stack.pop()
//       } else {
//         stack.push(s[i]);
//       }
//     } else if (s[i] === "]") {
//       if (stack[stack.length-1] === "[") {
//         stack.pop()
//       } else {
//         stack.push(s[i]);
//       }
//     } else {
//       stack.push(s[i]);
//     }
//   }
//   return stack.length === 0;
// };
// let res = isValid("{[]}");
// console.log(res)
var isValid = function (s) {
    var stack = [];
    for (var i = 0; i < s.length; i++) {
        stack.push(s[i]);
        if (/^(\{\})|(\[\])|(\(\))$/.test(stack[stack.length - 2] + stack[stack.length - 1])) {
            stack.splice(stack.length - 2, 2);
        }
    }
    return stack.length === 0;
};
