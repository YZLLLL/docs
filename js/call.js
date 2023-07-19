Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  const uniqueKey = symbol();
  context[uniqueKey] = this; // this 就是调用者，就是调用call的函数
  const result = context[symbol](...args);
  delete context[uniqueKey];
  return result;
};

Function.prototype.myApply = function (context, args) {
  return this.myCall(context, ...args);
};

Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function (...nextArgs) {
    return fn.myApply(context, args.concat(nextArgs));
  };
};
