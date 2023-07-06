/**
 * 1. 类型相等比较值
 * 2. 有NaN返回false
 * 3. undefined 和 null 只和 自身 或 彼此 比较返回true
 * 4. 两端都是原始类型， 转为 数字 比较
 * 5. 对象类型 和 原始类型，将 对象 转换成 原始类型 再进入第四步
 *
 * 比较时 对象类型 如何转换 为 原始类型
 * 1. 有 [Symbol.toPrimitive]， 调用, 得到的不是原始值（可以为null），报错
 * 2. 有vaueOf，调用 valueOf， 得到的不是原始值（可以为null），进入下一步
 * 3. 有toString， 调用 toString, 得到的不是原始值（可以为null），报错
 */

const obj = {};
Object.setPrototypeOf(obj, {
  // [Symbol.toPrimitive]() {
  //   console.log("toPrimitive");
  //   // return {}; // 返回一个引用类型会报错
  //   return "toPrimitive";
  // },
  valueOf() {
    console.log("valueOf");
    return null;
  },
  toString() {
    console.log("toString");
    return null;
  },
});
// console.log(obj == "toPrimitive");
// 实现 a == 1 && a == 2 && a == 3
const a = {
  value: 1,
};
Object.setPrototypeOf(a, {
  [Symbol.toPrimitive]() {
    return this.value++;
  },
});
console.log(a == 1 && a == 2 && a == 3); // true
console.log(a);
