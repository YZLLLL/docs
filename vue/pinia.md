Pinia 是一个由 Vue.js 社区维护的新一代状态管理库，它借鉴了 Vuex 的设计思想，并提供了更简洁、类型安全的 API。与 Vuex 不同的是，Pinia 使用了 Vue 3 Composition API 来定义状态和操作。Pinia 还支持 TypeScript，并且能够更好地与 Vue 3 生态系统中的其他库和工具进行集成。

#### 基本示例

```js
// stores/counter.js
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return { count: 0 };
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

#### state

1. 重置 state

你可以通过调用 store 的 `$reset()` 方法将 `state` 重置为初始值

```js
const store = useStore();
store.$reset();
```

2. 变更 state

调用 `$patch` 方法。它允许您对 `state` 对象，同时更改多个属性.

```js
store.$patch({
  count: store.count + 1,
  age: 120,
  name: "DIO",
});
```

但是，使用这种语法变更，很难实现或者很耗时：任何集合修改（例如，从数组中推送、删除、拼接元素）都需要您创建一个新集合。正因为如此，该$patch 方法还接受一个函数，来组合这种难以用补丁对象实现的变更。

```js
cartStore.$patch((state) => {
  state.items.push({ name: "shoes", quantity: 1 });
  state.hasChanged = true;
});
```

两种变更 store 方法的主要区别是，`$patch()`允许你将多个变更归入 devtools 的同一个条目中。同时请注意，直接修改 state，$patch()也会出现在 devtools 中，而且可以进行 time travel（在 Vue 3 中还没有）。

3. 订阅 state

你可以通过 store 的$subscribe()方法侦听 state 及其变化，类似于 Vuex 的subscribe方法。$subscribe()与常规 watch()相比使用的优点是：subscriptions 在 patch 后只触发一次（例如，使用上面的函数版本时）。

```js
const store = useStore();
const subscribe = store.$subscribe(
  (mutation, state) => {
    // 我们就可以在此处监听 store 中值的变化，当变化为某个值的时候，去做一些业务操作之类的
    console.log(mutation);
    console.log(state);
  },
  { detached: false }
);

// 停止订阅。调用上方声明的变量值，示例（subscribe），即可以停止订阅
subscribe();
```

$subscribe` 第一个参数是箭头函数，其参数 mutation：检测 store 值的改变，包含三个属性值：

- events：当前 state 改变的具体数据，包括改变前的值和改变后的值等等数据
- storeId：是当前 store 的 id
- type：用于记录这次数据变化是通过什么途径，主要有三个分别是
  - direct：通过 action 变化的
  - patch object：通过$patch 传递对象的方式改变的
  - patch function：通过$patch 传递函数的方式改变的

$subscribe 第二个参数是 options 对象，是各种配置参数，和 vue3 watch 的参数是一样的。

- detached：布尔值，默认是 false，正常情况下，当订阅所在的组件被卸载时，订阅将被停止删除，如果设置 detached 值为 true 时，即使所在组件被卸载，订阅依然在生效。
- deep：如果源是对象，则强制深度遍历源，以便回调触发深度突变。请参阅深度观察者。
- immediate：在观察者创建时立即触发回调。旧值将 undefined 在第一次调用时出现。
- flush：调整回调的刷新时间。

#### Actions

Action 相当于组件中的 method。它们可以通过 defineStore()中的 actions 属性来定义，并且它们也是定义业务逻辑的完美选择。

1. 调用 action

```js
// store
export const useStore = defineStore("main", {
  state: () => ({
    count: 0,
  }),
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    increment() {
      this.count++;
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random());
    },
  },
});
```

```js
<script>
export default {
  setup() {
    const store = useCounterStore()
    store.randomizeCounter() // 调用 action
  },
}
</script>
```

2. 订阅 action

这里有一个例子，在运行 action 之前以及 action resolve/reject 之后打印日志记录。

```js
const unsubscribe = someStore.$onAction(
  ({
    name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
  }) => {
    // 为这个特定的 action 调用提供一个共享变量
    const startTime = Date.now();
    // 这将在执行 "store "的 action 之前触发。
    console.log(`Start "${name}" with params [${args.join(", ")}].`);

    // 这将在 action 成功并完全运行后触发.
    // 它等待着任何返回的 promise
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      );
    });

    // 如果 action 抛出或返回一个拒绝的 promise，这将触发
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      );
    });
  }
);

// 手动删除监听器
unsubscribe();
```

可以使用 store.$onAction() 订阅 action 及其结果。 传递给它的回调在 action 之前执行。 after 处理 Promise 并允许您在 action 完成后执行函数。

也可以使用一个函数来定义：

```js
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  function increment() {
    count.value++;
  }

  return { count, increment };
});
```

组件中使用它：

```js
import { useCounterStore } from "@/stores/counter";

export default {
  setup() {
    const counter = useCounterStore();

    counter.count++;
    // 带有自动补全
    counter.$patch({ count: counter.count + 1 });
    // 或者使用 action 代替
    counter.increment();
  },
};
```

#### pinia 和 vuex 的区别

Vuex 的核心概念包括：

State：存储应用程序的状态数据。
Mutations：用于修改状态的方法，必须是同步函数。
Actions：类似于 Mutations，但可以执行异步操作。
Getters：用于从状态中派生出其他数据。

Pinia 的核心概念包括：

State：与 Vuex 的 State 相同，用于存储状态。
Actions：用于执行操作或异步任务。
Getters：类似于 Vuex 的 Getters，用于派生状态。
