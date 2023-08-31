#### 什么是 async...await

async/await 是 JavaScript 中用于处理异步操作的语法糖。它是基于 Promise 的，可以让我们以更简洁、更类似同步的方式编写异步代码。 

async 关键字用于定义一个异步函数，它会返回一个 Promise 对象。在异步函数内部，我们可以使用 await 关键字来等待一个 Promise 对象的解析结果。

**这样，我们可以按照顺序编写代码，而不需要使用回调函数或者链式调用的方式来处理异步操作**


#### 实现async...await

```js
function* test() {
  let a = yield 1;
  console.log(a);
}

const g = test();
g.next(); // 执行至第一个yield
g.next(5); // 将参数赋值给第一个yield的值，此处会将a赋值为5

// 传入一个generator函数
function myAsyncAwait(generatorFunc) {
  return function () {
    const generator = generatorFunc.apply(this, arguments);
    return new Promise((resolve, reject) => {
      function step(key, result) {
        let generatorResult;
        try {
          generatorResult = generator[key](result);
        } catch (e) {
          return reject(e);
        }

        const { value, done } = generatorResult;

        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then(
            (res) => step("next", res),
            (error) => step("throw", error)
          );
        }
      }

      step("next");
    });
  };
}

function* myGenerator() {
  const result = yield fetch("https://jsonplaceholder.typicode.com/todos/1");
  console.log(result);
  const data = yield result.json();
  console.log(data);
}

const myAsyncFunction = myAsyncAwait(myGenerator);

console.log(myAsyncFunction());
```
