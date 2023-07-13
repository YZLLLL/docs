1. 代码优化

   

- 减少大型不可变数据的响应性开销

不会变化的值，可以使用Object.freeze冻结。

只需浅层次监听的值， vue3中直接使用 shallowRef()或者 shallowReactive ， vue2 使用Vue.util.defineReactive，如：
```js
const shallowReactive = (obj) => {
  const shallowObj = {};

  Object.keys(obj).forEach((key) => {
    // 使用Vue.util.defineReactive定义可监听的属性
    Vue.util.defineReactive(shallowObj, key, obj[key]);
  });

  return shallowObj;
};
```



- 大型虚拟列表

  

通过列表虚拟化来提升性能，这项技术使我们只需要渲染用户视口中能看到的部分。



- 科学使用v-once、v-memo



v-once 是一个内置的指令，可以用来渲染依赖运行时数据但无需再更新的内容。它的整个子树都会在未来的更新中被跳过。



v-memo 是一个内置指令，可以用来有条件地跳过某些大型子树或者 v-for 列表的更新。



- 同一个元素上同时使用v-if、v-for



v-if、v-for在 vue2 和 vue3 优先级不一致。



在 Vue 2 中 v-for 优先于 v-if。



Vue 3 中 v-if 优先于 v-for。



- 减少props变动



在 Vue 之中，一个子组件只会在其至少一个 props 改变时才会更新。

```html
<ListItem
  v-for="item in list"
  :id="item.id"
  :active-id="activeId" 
/>
```
这样如果 activeId 改变，所有 ListItem 都将 更新。



```html
<ListItem
  v-for="item in list"
  :id="item.id"
  :active="item.id === activeId"
/>
```
这样如果 activeId 改变，只有两个 ListItem 更新


- 避免不必要的组件抽象（组件不要分的过于细致，各种嵌套）

组件实例比普通 DOM 节点要昂贵得多，而且为了逻辑抽象创建太多组件实例将会导致性能损失。

在大型列表中。想象一下一个有 100 项的列表，每项的组件都包含许多子组件。在这里去掉一个不必要的组件抽象，可能会减少数百个组件实例的无谓性能消耗。







其他方面同 ***性能优化*** 中文件。
