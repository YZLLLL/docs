function myNew(fn, ...args) {
  let obj = Object.create(Person.prototype);
  let result = fn.apply(obj, args);
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
