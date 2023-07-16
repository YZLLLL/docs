// compose  函数可以用于将多个函数组合成一个函数，依次执行这些函数并将结果传递给下一个函数
function compose(...functions) {
  return function (input) {
    return functions.reduceRight(function (acc, fn) {
      return fn(acc);
    }, input);
  };
}

// 这里使用了 rest 参数  ...functions  来接收传入的函数列表。然后返回了一个新的函数，该函数接收一个输入值  input 。在这个新函数内部，使用  reduceRight  方法对函数列表进行迭代，从最后一个函数开始依次执行，并将结果传递给下一个函数。最终返回最后一个函数的执行结果。 
function addTwo(x) {
  return x + 2;
}

function multiplyByThree(x) {
  return x * 3;
}

function subtractTen(x) {
  return x - 10;
}

const composedFunction = compose(addTwo, multiplyByThree, subtractTen);

console.log(composedFunction(5)); // 输出：7