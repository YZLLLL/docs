在 JavaScript 中，深克隆指的是创建一个独立副本的对象或数组，该副本与原始对象或数组完全独立。这意味着对克隆对象的任何更改都不会影响原始对象，反之亦然。

```js
let n1 = 1;
let obj1 = {
  name: "张三",
};
let n2 = n1;
let obj2 = obj1;
n2 = 2;
obj2.name = "李四";
console.log(n1, n2); // 1 2
console.log(obj1.name, obj2.name); // "李四" "李四"
```

此处将 obj1 赋值给 obj2, 只是让 obj2 和 obj1 都指向同一块内存空间，所有才打印出两个“李四”

##### 方法一 JSON.parse(JSON.stringify())

这种方法适用于简单的对象和数组，但对于某些数据类型（如函数或未定义的值）存在一些限制

```js
let obj1 = {
  name: "张三",
};
let obj2 = JSON.parse(JSON.stringify(obj1));
obj2.name = "李四";
console.log(obj1.name, obj2.name); // "张三" "李四"
```

##### 方法二 使用自定义递归函数

可以创建一个自定义函数，遍历原始对象的属性，并克隆每个属性，包括嵌套的对象或数组。

在实现深克隆时，需要注意以下几点：

- 循环引用：如果对象或数组包含循环引用（即对象引用自身），克隆过程可能导致无限循环。你需要通过跟踪已访问的对象或使用处理循环引用的库来处理这种情况。

- 对象中 key 值为 symbol 类型的无法通过普通遍历拿到，需要使用 Reflect.ownKeys()

```js
function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 解决循环引用
  if (cache.has(obj)) {
    return cache.get(obj);
  }

  if (Array.isArray(obj)) {
    const clone = [];
    cache.set(obj, clone);
    obj.forEach((i) => {
      clone.push(deepClone(i, cache));
    });
    return clone;
  }

  if (obj instanceof Set) {
    const clone = new Set();
    cache.set(obj, clone);
    obj.forEach((i) => {
      clone.add(deepClone(i, cache));
    });
    return clone;
  }

  if (obj instanceof Map) {
    const clone = new Map();
    cache.set(obj, clone);
    obj.forEach((v, k) => {
      clone.set(deepClone(k, cache), deepClone(v, cache));
    });
    return clone;
  }

  // 其他类型这里就不判断了
  // 都不是就是普通对象
  const clone = {};
  cache.set(obj, clone);
  // 使用 Reflect.ownKeys 是为了拿到 symbol 的 key
  Reflect.ownKeys(obj).forEach((k) => {
    clone[k] = deepClone(obj[k], cache);
  });
  return clone;
}

const obj = {
  [Symbol("1")]: { name: 1 },
  address: {
    p: { a: 1 },
  },
  arr: [{ a: 1 }, 2, 3],
  map: new Map([[{ a: 1 }, 2]]),
  set: new Set([1, 2]),
};
obj.self = obj;

const clone = deepClone(obj);
console.log(clone);
```
