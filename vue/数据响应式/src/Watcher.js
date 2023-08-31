import Dep from "./Dep";
export default class Watcher {
  constructor(target, expression, cb) {
    this.target = target;
    this.callback = cb;
    this.getter = parsePath(expression); // 获取 "a.b.c" 对应的值
    this.value = this.get();
  }

  update() {
    console.log("update")
    this.getAndInvoke();
  }

  get() {
    Dep.target = this;
    let value = this.getter(this.target);
    Dep.target = null;
    return value;
  }

  getAndInvoke() {
    const value = this.get();
    if (value !== this.value || typeof value === "object") {
      let oldValue = this.value;
      this.value = value;
      this.callback(value, oldValue);
    }
  }
}

function parsePath(expression) {
  const arr = expression.split('.')
  return function(object) {
    return arr.reduce((pre, cur) => pre = pre[cur], object)
  }
}

