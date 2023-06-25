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
