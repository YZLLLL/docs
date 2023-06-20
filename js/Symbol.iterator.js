let obj = {
  name: 1,
  age: 2
}
/**
 * 可迭代对象：实现了[Symbol.iterator]方法，（本身或原型链上有都行）
 * 需要返回一个next方法，next方法返回形式 {value?: any, done: boolean}
 * @returns 
 */
Object.prototype[Symbol.iterator] = function() {
  let keys = Object.keys(this);
  let index = 0;
  return {
    next() {
      if(index < keys.length) {
        return {value: keys[index++], done: false}
      } else {
        return {done: true}
      }
    }
  }
}

for (const key of obj) {
  console.log(key)
}