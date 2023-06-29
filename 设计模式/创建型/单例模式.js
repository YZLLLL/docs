function Singleton(fn) {
  let instance = null;
  return function (...arg) {
    if (!instance) {
      instance = new fn(...arg);
    }
    return instance;
  };
}

// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const createPerson = Singleton(Person);

const p1 = createPerson("张三", 18);
const p2 = createPerson("李四", 19);

console.log(p1, p2, p1 === p2);
