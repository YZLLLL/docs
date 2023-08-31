/**
 * 在JavaScript中， new 操作符用于创建一个对象实例。它的逻辑如下： 
 
1. 创建一个空对象。 
2. 将新创建的对象的原型链接到构造函数的原型对象上。 
3. 将构造函数的作用域赋给新对象（因此 this 关键字将指向新对象）。 
4. 执行构造函数的代码块，为新对象添加属性和方法。 
5. 如果构造函数没有显式返回一个对象，则返回新创建的对象。 
 */
function myNew(fn, ...args) {
  // 创建一个以 fn.prototype 为原型的空对象
  let obj = Object.create(fn.prototype);
  // 执行 fn ,把 this 绑定到 obj 上，fn 中对 this 进行操作就是对 obj 进行操作，并保存结果 result
  let result = fn.apply(obj, args);
  // 如果 fn 有返回结果，并且为 function 或者 object（不为null）,则返回 result
  // 否则返回 obj
  if (
    typeof result === "function" ||
    (result !== null && typeof result === "object")
  ) {
    return result;
  }
  return obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.say = function () {
  console.log("hi");
};

const p1 = myNew(Person, "张三", 18);
const p2 = new Person("张三", 18);
console.log(p1, p2);
