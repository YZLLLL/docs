var 存在 变量提升， 在声明之前访问， 值为 undefined

```js
console.log(a); // undefined
var a = 1;
```

let、const 不存在遍历提升，在声明之前访问， 将会报错；

```js
console.log(a, b); // Uncaught ReferenceError: a is not defined
let a = 1;
const b = 1;
```

let、const 存在 暂时性死区；

ES6 规定，如果区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”，也就是说使用 let 声明的变量都是先声明再使用 ，不存在变量提升问题。

```js
var a = 1;
function b() {
  console.log(a); // 报错
  let a = 2;
}
b();
```

函数提升 （函数的声明比变量的声明的优先级要高）

在函数声明之前可以直接访问函数。

```js
// 预编译 b 为函数（函数的声明比变量的声明的优先级要高）
b(); // 2 执行到这时 b为函数
var b = 3; // 执行到这时 b为3
function b() {
  console.log(2);
}
```
