const STATE = {
  PENDING: "pending",
  REJECTED: "rejected",
  FULFILLED: "fulfilled",
};

class MyPromise {
  constructor(executor) {
    this.state = STATE.PENDING;
    this.result = void 0;
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];
    executor(this.onFulfilled.bind(this), this.onRejected.bind(this));
  }

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
      } else if (this.state === STATE.FULFILLED) {
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
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  finally(onFinally) {
    return new MyPromise((resolve, reject) => {
      onFinally = function () {
        try {
          onFinally();
        } catch (e) {
          resolve(e);
        }
      };
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
  static reslove(result) {
    return new MyPromise((res, rej) => {
      res(result);
    });
  }
  static reject(error) {
    return new MyPromise((res, rej) => {
      rej(error);
    });
  }
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
  static all(myPromises) {
    // myPromises 可迭代对象 不一定是数组，map,set,array都有forEach
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
              result[i] = { status: "fulfilled", value: res };
              if (result.every(Boolean)) {
                reslove(result);
              }
            },
            (e) => {
              result[i] = { status: "rejected", reason: e };
              if (result.every(Boolean)) {
                reslove(result);
              }
            }
          );
        } else {
          result[i] = { status: "fulfilled", value: myPromise };
        }
        index++;
      }
    });
  }
  // 返回一个MyPromise,result是第一个onFulfilled的返回值，全部拒绝才是拒绝
  // AggregateError: All promises were rejected
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

const p = Promise.any([Promise.reject(1)]);
p.catch((e) => {
  console.dir(e);
});
