#### 什么是 instanceof

在JavaScript中， instanceof 运算符用于检查一个对象是否属于特定的类或构造函数。它会检查对象的原型链，以确定对象的原型是否存在于指定的构造函数的原型链上。 

 
 instanceof 的语法如下：
 ```js
 对象 instanceof 构造函数
 ```
 这里， 对象 是你要检查的对象实例， 构造函数 是你要检查的构造函数或类。 
 
 instanceof 运算符返回 true ，如果对象是指定构造函数的实例；否则返回 false 。 
 
 instanceof 的原理是检查构造函数的原型是否存在于对象的原型链上。它会遍历原型链，直到找到匹配的原型或到达链的末尾。 


#### 手写 instanceof

**递归查找原型上的 constructor**

```js
function myInstanceof(a, b) {
  if (typeof b !== "function" || typeof a !== "object") return false;
  let p = Object.getPrototypeOf(a);
  if (p === null) return false;
  if (p.constructor === b) {
    return true;
  } else {
    return myInstanceof(p, b);
  }
}

let p = new Promise((res) => {});
console.log(myInstanceof(p, Promise)); // true
```
