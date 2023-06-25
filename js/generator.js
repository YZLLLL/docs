// 其实没有暂停方法，只是使用switch case，控制执行某段函数
// 怎么保存之前的状态 例如下面的a

const DONE = Symbol("generator-done");

function generator(cb) {
  return new Generator(cb);
}

class Generator {
  constructor(cb) {
    this.prev = 0;
    this.nextStep = 0;
    this.done = false;
    this.cb = cb;
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

// function* generator() {
//   let a = 1;
//   yield undefined;
//   a++;
//   yield a;
//   a++;
//   yield a;
// }

const gen = generator(cb); // "Generator { }"
console.log(gen.next()); // undefined
console.log(gen.next()); // 2
console.log(gen.next()); // 3
console.log(gen.next()); // done: true
