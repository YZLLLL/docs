#### 什么是 Generator

在JavaScript中，生成器（generator）是一种特殊类型的函数，它可以在执行过程中暂停和恢复。它允许您手动控制执行流程，以便随时间生成一系列的值。 

生成器使用 function* 语法来定义，并使用 yield 关键字来暂停执行并返回一个值。当调用生成器时，它会返回一个迭代器对象，用于控制生成器的执行。 
生成器的主要原理是它提供了一种按需生成一系列值的方法，而不是一次性生成所有值。这在处理大型数据集或无限序列时非常有用，因为它可以有效地利用内存并提高性能。 

生成器有几个用途，包括： 
1. 迭代：生成器可以用于在不必一次性生成所有值的情况下迭代一系列值。这在处理大型数据集或需要动态生成值时特别有用。 
2. 异步编程：生成器可以与co或async/await等库一起使用，以一种更类似同步的方式编写异步代码。这简化了处理异步操作的方式，并提高了代码的可读性。 
3. 状态机：生成器可以用于实现状态机，其中每个yield语句表示不同的状态。这提供了一种清晰简洁的方式来管理复杂的状态转换。 

总的来说，生成器为JavaScript中的执行流程控制提供了强大而灵活的机制，使代码更高效和可读。

#### 手写 generator

其实没有暂停方法，只是使用switch case，控制执行某段函数

简单实现
```js

const DONE = Symbol("generator-done");

function generator(cb) {
  return new Generator(cb);
}

class Generator {
  constructor(cb) {
    this.prev = 0;
    this.nextStep = 0; // 保存下一步
    this.done = false; // 是否完成
    this.cb = cb; // 传入的函数
  }
  stop() {
    this.done = true;
  }
  next() {
    let value = this.cb({ next: this.nextStep++, DONE: DONE });
    this.value = value;
    if (value === DONE) {
      this.done = true;
      this.value = void 0;
    }
    return { value: this.value, done: this.done };
  }
}

function cb(obj) {
  let a = 1;
  switch (obj.next) {
    case 0:
      return undefined;
    case 1:
      a++;
      return a;
    case 2:
      a++;
      return a;
    default:
      return obj.DONE;
  }
}


const gen = generator(cb); // "Generator { }"
console.log(gen.next()); // undefined
console.log(gen.next()); // 2
console.log(gen.next()); // 3
console.log(gen.next()); // done: true
```