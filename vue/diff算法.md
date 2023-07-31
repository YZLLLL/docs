Vue 的 diff 算法的作用是在组件更新时，通过比较新旧虚拟 DOM 树的差异，只对需要更新的部分进行实际的 DOM 操作，从而提高性能和效率。

具体而言，diff 算法可以帮助 Vue 减少对真实 DOM 的操作次数，避免不必要的 DOM 操作，从而提升应用的性能。当组件的状态发生变化时，Vue 会生成新的虚拟 DOM 树，然后通过 diff 算法与旧的虚拟 DOM 树进行比较，找出两者之间的差异。

通过比较差异，Vue 可以精确地知道哪些部分需要更新，哪些部分保持不变。然后，Vue 只对需要更新的部分进行实际的 DOM 操作，例如插入、删除、移动或更新 DOM 节点。这样可以避免对整个 DOM 树进行重新渲染，从而节省了性能开销

#### vue2 diff 算法

**双端比较**

步骤简述：

所谓双端比较就是新列表和旧列表两个列表的头与尾互相对比，，在对比的过程中指针会逐渐向内靠拢，直到某一个列表的节点全部遍历过，对比停止。

使用四个指针指向两个列表的头尾

使用旧列表的头一个节点 oldStartNode 与新列表的头一个节点 newStartNode 对比
使用旧列表的最后一个节点 oldEndNode 与新列表的最后一个节点 newEndNode 对比
使用旧列表的头一个节点 oldStartNode 与新列表的最后一个节点 newEndNode 对比
使用旧列表的最后一个节点 oldEndNode 与新列表的头一个节点 newStartNode 对比

当旧列表的头一个节点 oldStartNode 与新列表的头一个节点 newStartNode 对比时 key 相同。那么旧列表的头指针 oldStartIndex 与新列表的头指针 newStartIndex 同时向后移动一位。
当旧列表的最后一个节点 oldEndNode 与新列表的最后一个节点 newEndNode 对比时 key 相同。那么旧列表的尾指针 oldEndIndex 与新列表的尾指针 newEndIndex 同时向前移动一位。
当旧列表的头一个节点 oldStartNode 与新列表的最后一个节点 newEndNode 对比时 key 相同。那么旧列表的头指针 oldStartIndex 向后移动一位；新列表的尾指针 newEndIndex 向前移动一位。
当旧列表的最后一个节点 oldEndNode 与新列表的头一个节点 newStartNode 对比时 key 相同。那么旧列表的尾指针 oldEndIndex 向前移动一位；新列表的头指针 newStartIndex 向后移动一位。

如果四次对比都没找到复用节点时，我们只能拿新列表的第一个节点去遍历旧列表中找与其 key 相同的节点。
没找到就是新增节点，找到了将该元素移动，并移动指针。

遍历结束之后，如果新列表还有元素，就是新增元素，生成元素添加到即可；
如果旧列表还有元素，就是删除元素，直接删除即可；

实现代码：

```js
function vue2diff(prevChildren, nextChildren, parent) {
  let oldStartIndex = 0,
    newStartIndex = 0,
    oldStartIndex = prevChildren.length - 1,
    newStartIndex = nextChildren.length - 1,
    oldStartNode = prevChildren[oldStartIndex],
    oldEndNode = prevChildren[oldStartIndex],
    newStartNode = nextChildren[newStartIndex],
    newEndNode = nextChildren[newStartIndex];
  while (oldStartIndex <= oldStartIndex && newStartIndex <= newStartIndex) {
    if (oldStartNode === undefined) {
      oldStartNode = prevChildren[++oldStartIndex];
    } else if (oldEndNode === undefined) {
      oldEndNode = prevChildren[--oldStartIndex];
    } else if (oldStartNode.key === newStartNode.key) {
      patch(oldStartNode, newStartNode, parent);

      oldStartIndex++;
      newStartIndex++;
      oldStartNode = prevChildren[oldStartIndex];
      newStartNode = nextChildren[newStartIndex];
    } else if (oldEndNode.key === newEndNode.key) {
      patch(oldEndNode, newEndNode, parent);

      oldStartIndex--;
      newStartIndex--;
      oldEndNode = prevChildren[oldStartIndex];
      newEndNode = nextChildren[newStartIndex];
    } else if (oldStartNode.key === newEndNode.key) {
      patch(oldStartNode, newEndNode, parent);
      parent.insertBefore(oldStartNode.el, oldEndNode.el.nextSibling);
      oldStartIndex++;
      newStartIndex--;
      oldStartNode = prevChildren[oldStartIndex];
      newEndNode = nextChildren[newStartIndex];
    } else if (oldEndNode.key === newStartNode.key) {
      patch(oldEndNode, newStartNode, parent);
      parent.insertBefore(oldEndNode.el, oldStartNode.el);
      oldStartIndex--;
      newStartIndex++;
      oldEndNode = prevChildren[oldStartIndex];
      newStartNode = nextChildren[newStartIndex];
    } else {
      let newKey = newStartNode.key,
        oldIndex = prevChildren.findIndex(
          (child) => child && child.key === newKey
        );
      if (oldIndex === -1) {
        mount(newStartNode, parent, oldStartNode.el);
      } else {
        let prevNode = prevChildren[oldIndex];
        patch(prevNode, newStartNode, parent);
        parent.insertBefore(prevNode.el, oldStartNode.el);
        prevChildren[oldIndex] = undefined;
      }
      newStartIndex++;
      newStartNode = nextChildren[newStartIndex];
    }
  }
  if (newStartIndex > newStartIndex) {
    while (oldStartIndex <= oldStartIndex) {
      if (!prevChildren[oldStartIndex]) {
        oldStartIndex++;
        continue;
      }
      parent.removeChild(prevChildren[oldStartIndex++].el);
    }
  } else if (oldStartIndex > oldStartIndex) {
    while (newStartIndex <= newStartIndex) {
      mount(nextChildren[newStartIndex++], parent, oldStartNode.el);
    }
  }
}
```

#### vue3 diff 算法

**最长递增子序列**

步骤简述：

先进行前置处理和后置处理，
也是四个指针分别指向新列表和旧列表两个列表的头与尾
如：
新列表：a b d e h f g
旧列表：a b c d e f g

a b f g 直接 patch

剩下的元素:
d e h
c d e

使用[最长递增子序列算法](https://leetcode.cn/problems/longest-increasing-subsequence/solution/zui-chang-shang-sheng-zi-xu-lie-by-leetcode-soluti/)，得到 d e

最后，删除 c ,然后将生成 h 插入到尾部
