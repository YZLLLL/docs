#### 什么是 Promise
在JavaScript中，Promise是表示异步操作的最终完成（或失败）及其结果值的对象。它是一种以更有组织和可管理的方式处理异步操作的方法。 

Promise规范定义了一组规则和行为，Promise必须遵守这些规范。规范提供了一个标准的接口，用于创建、链接和处理Promise。它确保了JavaScript中不同Promise实现之间的一致行为。 

Promise规范包括以下关键组成部分： 
1. Promise状态：一个Promise可以处于三种状态之一：pending（进行中）、fulfilled（已完成）或rejected（已拒绝）。初始时，Promise处于pending状态，表示异步操作仍在进行中。当操作成功完成时，Promise转为fulfilled状态，并带有一个结果值。如果操作过程中发生错误，Promise转为rejected状态，并带有失败原因。 
2. Promise方法：Promise规范定义了几种方法，用于与Promise进行交互。这些方法包括 then() 、 catch() 和 finally() 。 then() 方法用于指定当Promise状态变为fulfilled时的处理函数， catch() 方法用于指定当Promise状态变为rejected时的处理函数，而 finally() 方法用于指定无论Promise状态如何都要执行的处理函数。 
3. Promise链式调用：Promise允许通过链式调用的方式处理多个异步操作。通过在 then() 方法中返回新的Promise，可以实现Promise的链式调用。这样可以更好地组织和控制异步操作的顺序和依赖关系。 

#### 手写 Promise

Promise实例的then方法，传入两个函数（如果不是函数会变为预设的函数），返回一个新的promise，如果此时 promise 状态为 PENDING, 将两个函数分别传入 成功、失败 回调函数数组
如果 state 为 REJECTED 或 FULFILLED，则直接执行传入的函数，改变返回的 promise 状态。

catch方法是then方法的简写， 即 then 第一个参数为 null

```js

// 定义状态
const STATE = {
  PENDING: "pending",
  REJECTED: "rejected",
  FULFILLED: "fulfilled",
};

class MyPromise {
  // new Promise传入一个函数，函数有两个参数，调用函数的两个参数会将 Promise 的 state 和 result 改变，并且只能改变一次，只能由 PENDING 变为 REJECTED 或者 FULFILLED
  constructor(executor) {
    // 初始状态: pending
    this.state = STATE.PENDING;
    this.result = undefined;
    // 成功回调函数数组
    this.onFulfilledCallback = [];
    // 失败回调函数数组
    this.onRejectedCallback = [];
    // 传入 onFulfilled 和 onRejected，执行 executor
    // executor 报错， 执行 this.onRejected
    try {
      executor(this.onFulfilled.bind(this), this.onRejected.bind(this));
    } catch (e) {
      this.onRejected.bind(this)(e);
    }
  }

  // 调用 reslove, 如果 state 为 PENDING， 将 state 变为 FULFILLED，并遍历执行 onFulfilledCallback
  onFulfilled(result) {
    if (this.state === STATE.PENDING) {
      this.state = STATE.FULFILLED;
      this.result = result;
      for (const cbOptions of this.onFulfilledCallback) {
        const { onFulfilled, res, rej } = cbOptions;
        try {
          const result = onFulfilled(this.result);
          if (result instanceof MyPromise) {
            result.then(res, rej);
          } else {
            res(result);
          }
        } catch (e) {
          rej(e);
        }
      }
      this.onFulfilledCallback = [];
    }
  }

  // 调用 reject, 如果 state 为 PENDING，将 state 变为 REJECTED，并遍历执行 onRejectedCallback
  onRejected(error) {
    if (this.state === STATE.PENDING) {
      this.state = STATE.REJECTED;
      this.result = error;
      for (const cbOptions of this.onRejectedCallback) {
        const { onRejected, res, rej } = cbOptions;
        try {
          const result = onRejected(this.result);
          if (result instanceof MyPromise) {
            result.then(res, rej);
          } else {
            res(result);
          }
        } catch (e) {
          rej(e);
        }
      }
      this.onRejectedCallback = [];
    }
  }

  // 重点！！！
  // then方法会返回一个新的 Promise
  // 接受两个参数，一个是 成功 执行， 一个是 失败 执行
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (val) => {
            throw new Error(val);
          };
    // 返回一个MyPromise,实现链式调用
    return new MyPromise((res, rej) => {
      // 如果还是 PENDING 状态，将传入的函数分别push到 成功 、失败 回调函数数组中
      if (this.state === STATE.PENDING) {
        this.onFulfilledCallback.push({
          onFulfilled,
          res,
          rej,
        });
        this.onRejectedCallback.push({
          onRejected,
          res,
          rej,
        });
      }
      // 如果不是 PENDING, 直接执行 （此处使用setTimeout，假装是微任务） 
      else if (this.state === STATE.FULFILLED) {
        setTimeout(() => {
          try {
            const result = onFulfilled(this.result);
            if (result instanceof MyPromise) {
              result.then(res, rej);
            } else {
              res(result);
            }
          } catch (e) {
            rej(e);
          }
        });
      } else if (this.state === STATE.REJECTED) {
        setTimeout(() => {
          try {
            const result = onRejected(this.result);
            if (result instanceof MyPromise) {
              result.then(res, rej);
            } else {
              res(result);
            }
          } catch (e) {
            rej(e);
          }
        });
      }
    });
  }

  // then 方法简写形式
  // 之前的函数出错就会返回一个 失败的 promise
  // catch 执行过程中没报错，会返回一个成功的 Promise
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  // 无论 成功 还是 失败 都会执行
  // 类似于调用 then(onFinally, onFinally)。
  // 无参数
  // 返回: 新的 Promise
  finally(onFinally) {
    return new MyPromise((resolve, reject) => {
      this.then(
        (result) => {
          try {
            onFinally();
            resolve(result);
          } catch (e) {
            reject(e);
          }
        },
        (error) => {
          try {
            onFinally();
            reject(result);
          } catch (e) {
            reject(e);
          }
        }
      );
    });
  }

  // 返回一个 成功 的Promise
  static reslove(result) {
    return new MyPromise((res, rej) => {
      res(result);
    });
  }

  // 返回一个 失败 的Promise
  static reject(error) {
    return new MyPromise((res, rej) => {
      rej(error);
    });
  }

  // 传入一个可迭代对象
  // 返回一个 promise, 结果是最快完成的 Promise
  static race(myPromises) {
    return new MyPromise((reslove, reject) => {
      for (const myPromise of myPromises) {
        if (myPromise instanceof MyPromise) {
          myPromise.then(reslove, reject);
        } else {
          reslove(myPromise);
        }
      }
    });
  }

  // 传入一个可迭代对象
  // 返回一个新的 Promise
  // 全部 成功， 则返回的 Promise 状态为 成功，结果是所有 Promise 结果的数组
  // 有一个失败，则返回的 Promise 状态为 失败，结果是e
  static all(myPromises) {
    return new MyPromise((reslove, reject) => {
      const arr = Array.from(myPromises);
      const result = new Array(arr.length);
      const hasDone = new Array(arr.length).fill(false);
      let index = 0;
      for (const myPromise of myPromises) {
        let i = index;
        if (myPromise instanceof MyPromise) {
          myPromise.then(
            (res) => {
              result[i] = res;
              hasDone[i] = true;
              if (hasDone.every(Boolean)) {
                reslove(result);
              }
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          result[i] = myPromise;
          hasDone[i] = true;
        }
        index++;
      }
    });
  }

  // 传入一个可迭代对象
  // 返回一个 Promise
  // 全部的Promise状态确定了，返回的 Promise 将被兑现
  // 返回带有描述每个 Promise 结果的对象数组。
  static allSettled(myPromises) {
    return new MyPromise((reslove, reject) => {
      const arr = Array.from(myPromises);
      let result = new Array(arr.length);
      let index = 0;
      for (const myPromise of myPromises) {
        let i = index;
        if (myPromise instanceof MyPromise) {
          myPromise.then(
            (res) => {
              result[i] = { status: STATE.FULFILLED, value: res };
              if (result.every(Boolean)) {
                reslove(result);
              }
            },
            (e) => {
              result[i] = { status: STATE.REJECTED, reason: e };
              if (result.every(Boolean)) {
                reslove(result);
              }
            }
          );
        } else {
          result[i] = { status: STATE.FULFILLED, value: myPromise };
        }
        index++;
      }
    });
  }

  // 返回一个MyPromise,result是第一个onFulfilled的返回值，全部拒绝才是拒绝
  static any(myPromises) {
    return new MyPromise((reslove, reject) => {
      const arr = Array.from(myPromises);
      const errorArray = new Array(arr.length);
      let index = 0;
      for (const myPromise of myPromises) {
        let i = index;
        if (myPromise instanceof MyPromise) {
          myPromise.then(reslove, (e) => {
            errorArray[i] = new Error(e);
            if (errorArray.every(Boolean)) {
              reject(
                new AggregateError(errorArray, "All promises were rejected")
              );
            }
          });
        } else {
          reslove(myPromise);
        }
        index++;
      }
    });
  }
}

const p = new MyPromise((resolve, reject) => {
  reject(123);
});
console.log(p);
p.then((res) => {
  console.log(res);
}).catch((e) => {
  console.log(e);
});
```