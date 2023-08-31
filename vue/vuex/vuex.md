#### 什么是 Vuex
Vuex是一个专为Vue.js应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的数
据，并以相应的规则保证数据以一种可预测的方式发生变化。Vuex也集成到Vue的官方调试工具
devtools中，提供了诸如零配置的time-travel调试、状态快照导入／导出等高级调试功能。

Vuex是一个专为Vue.js应用程序开发的状态管理模式。状态管理模式其实就是数据管理模式，它集
中式存储、管理项目所有组件的数据。

使用Vuex统一管理数据有以下3个好处：
1. 能够在Vuex中集中管理共享的数据，易于开发和后期维护。
2. 能够高效地实现组件之间的数据共享，提高开发效率。
3. 存储在Vuex中的数据是响应式的，能够实时保持数据与页面的同步。

这个状态自管理应用包含以下3个部分：
1. state：驱动应用的数据源。
2. view：以声明方式将state映射到视图。
3. actions：响应在view上的用户输入导致的状态变化。

使用示例：
```js
import { createApp } from 'vue'
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  // 保存状态
  state () {
    return {
      count: 0
    }
  },
  // 通过 dispatch 调用，执行异步，后通过 commit 调用 mutations 的方法改变 state
  actions: {},
  // 类似 computed
  getters: {},
  // 通过 commit 调用，同步改变 state
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

const app = createApp({ /* 根组件 */ })

// 将 store 实例作为插件安装
app.use(store)
```

你可以通过 store.state 来获取状态对象，并通过 store.commit 方法触发状态变更：
```js
store.commit('increment')

console.log(store.state.count) // -> 1
```

在 Vue 组件中， 可以通过 this.$store 访问store实例。现在我们可以从组件的方法提交一个变更：
```js
methods: {
  increment() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
```

通过提交 mutation 的方式，而非直接改变 store.state.count，是因为更明确地追踪到状态的变化。这个简单的约定能够让你的意图更加明显，这样你在阅读代码的时候能更容易地解读应用内部的状态改变。


#### 简易版 Vuex

```ts
declare class MyVuexStore {
  commit(eventName: string, data:any): void;
  dispatch(eventName: string, data:any): void;
}

declare function myUseStore<T extends object>(options: {
  state: T,
  mutations: {
    [name: string]: (state: T, payload: any) => void;
  },
  actions?: {
    [name: string]: (state: T, payload: any) => void;
  }
  getters?: {
    [name: string]: (state: T) => any;
  }
}): Store;

type MyVuexStoreOption<T extends object> = {
  state: T,
  mutations: {
    [name: string]: (state: T, payload: any) => void;
  },
  actions?: FnObject,
  getters?: FnObject
}

type FnObject = {
  [name: string]: Function
}

class Store implements MyVuexStore {
  public state: object;
  private mutations: FnObject;
  private actions: FnObject;
  public getters: FnObject;
  constructor(options: MyVuexStoreOption) {
    this.state = options.state;
    this.mutations = options.mutations;
    this.actions = options.actions;
    this.getters = options.getters;
  }
  commit(eventName:string, data:any) {
    if (this.mutations[eventName]) {
      this.mutations[eventName](this.state, data);
    }
  }
  dispatch(eventName:string, data:any): Promise<any> {
    if (this.actions[eventName]) {
      return this.actions[eventName](this.state, data);
    }
  }
  getState() {
    return this.state;
  }
}


function myUseStore(option: MyVuexStoreOption) {
  return new Store(option)
}



const store = myUseStore({
  state: {
    name: "张三",
    age: 18,
  },
  mutations: {
    changeName(state: object, payload: any) {
      state.name = payload;
    }
  },
  actions: {},
  getters: {}
});

store.commit("changeName", "李四");

```