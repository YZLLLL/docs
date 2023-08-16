#### 为什么需要虚拟列表

在前端的业务开发中，经常会碰到列表项，如果列表项数量过多，一般则会采用分页的方式来处理，而分页的形式也有 2 种：

- 分页器
- 滚动分页

分页器一般用于后台管理系统中；而在保证较好用户体验时，会采用上下无限滚动的方式，我们一般把这种列表叫做**长列表**

#### 长列表的问题

当用户滚动的屏数过多时，就会出现页面滑动卡顿、数据渲染较慢、白屏的问题，究其原因是列表项过多，**渲染了大量 dom 节点**

#### 虚拟列表的优势

只对可见区域进行渲染，对非可见区域中的数据**不渲染**或**部分渲染**

其组成一般包含 3 部分：

- **可视区**：**滚动容器元素**的视觉可见区域。
- **列表渲染区**：**真实渲染列表元素的区域**，
- **真实列表区**：又叫可滚动区，滚动容器元素的内部内容区域。**用来撑起可视区域**

结构如下：

- container 可视区
- phantom 容器内的占位，高度为真实列表区域的高度，用于形成滚动条
- list 列表项的渲染区域

```html
<div id="container">
  <div class="phantom"></div>
  <div class="list"></div>
</div>
```

#### 代码思路

1. 计算出所有元素的高度之和，并赋值给 phantom 元素的高度
2. 根据用户滚动的 scrollTop 计算出该显示的元素的范围， 这里我们可视区第一个元素下标记为 startIndex，可视区最后一个元素下标记为 endIndex
3. 计算出 startIndex 之前的元素高度之和，这里记为 startOffset，改变 list 的 translateY 属性，让 list 向下平移至可视区域

#### 完整代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #container {
        position: relative;
        height: 100vh;
        overflow: scroll;
      }
      .phantom {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
      .list-item {
        border-bottom: 1px solid #000;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div id="container">
      <div class="phantom"></div>
      <div class="list"></div>
    </div>
    <script>
      const dom = {
        container: document.querySelector("#container"),
        phantom: document.querySelector(".phantom"),
        list: document.querySelector(".list"),
      };

      let startIndex = 0; // 第一个可视元素的下标
      let endIndex = 0; // 最后一个可视元素的下标
      let startOffset = 0; // 第一个可视元素的偏移量
      const itemSize = 100; // 假设每个 item 高度 100px
      const viewCount = 10; // 渲染数量
      const buffered = 10; // 列表前后缓存条数
      let phantomHeight = 0; // 列表总高度

      const list = []; // 渲染的数据
      // 模拟数据
      for (let i = 0; i < 100; i++) {
        list.push({
          id: i,
          text: i,
        });
      }

      // 计算startIndex
      function setStartIndex(scrollTop) {
        startIndex = Math.floor(scrollTop / itemSize);
      }

      // 计算endIndex，并重新渲染item
      function setEndIndex() {
        endIndex = Math.min(startIndex + viewCount + buffered, list.length);
        // 清空子元素
        dom.list.innerHTML = "";
        list.forEach((item, index) => {
          if (index >= startIndex && index <= endIndex) {
            dom.list.append(itemCreator(item.text));
          }
        });
      }

      // 计算startOffset，并修改dom.list的translateY的值
      function getStartOffset() {
        startOffset = startIndex * itemSize;
        dom.list.style.transform = `translateY(${startOffset}px)`;
      }

      // 计算phantomHeight，并修改dom.phantom高度
      function setPhantomHeight() {
        phantomHeight = list.length * itemSize;
        dom.phantom.style.height = phantomHeight + "px";
        console.log(`
          startIndex: ${startIndex}
          endIndex: ${endIndex}
          startOffset: ${startOffset}
          phantomHeight: ${phantomHeight}
        `);
      }

      function itemCreator(str) {
        const item = document.createElement("div");
        item.classList.add("list-item");
        item.textContent = str;
        item.style.height = itemSize + "px";
        return item;
      }

      function onScroll() {
        const scrollTop = dom.container.scrollTop;
        setStartIndex(scrollTop);
        setEndIndex();
        getStartOffset();
        setPhantomHeight();
      }

      onScroll();

      dom.container.addEventListener("scroll", onScroll);
    </script>
  </body>
</html>
```

这里采用的是原生 js，对于 vue 或者 react 来说，代码思路是不变的，实现起来还会更加简单。

#### 动态高度

实际上在业务开发中，基本很少碰到高度项列表固定的情况，大部分是文本、图片、富文本等不定的高度，对于这类不定的高度那我们该如何处理呢？

使用 **ResizeObserver**

核心代码：

```js
// 记录每个元素的位置信息
const positions = list.map((item, index) => {
  return {
    index,
    height: itemSize,
    top: index * itemSize,
    bottom: (index + 1) * itemSize,
  };
});
// 监控元素的大小变化
function observe(el, index) {
  const resizeObserver = new ResizeObserver(() => {
    // 获取当前列表项的高度
    if (el && el.offsetHeight) {
      // 触发更新
      measure(index, el.offsetHeight);
    }
  });
  resizeObserver.observe(el);

  return () => resizeObserver.disconnect(); // 取消监听
}

// 重新计算 positions
function measure(index, height) {
  const target = positions[index];
  let diffHeight = height - target.height;
  if (diffHeight) {
    target.height = height;
    target.bottom = diffHeight;
  }
  // 后续元素全部更新
  for (let i = index + 1; i < positions.length; i++) {
    positions[i].top = positions[i - 1].bottom;
    positions[i].bottom = positions[i].bottom - diffHeight;
  }
}
```

将 setStartIndex 逻辑变一下

```js
// 找到第一个bottom大于scrollTop的元素下标
function setStartIndex(scrollTop) {
  startIndex = positions.findIndex((i) => i && i.bottom > scrollTop);
}
```

当元素的高度改变时，我们只需要改变对应 positions 的内容就行了

#### 可能会出现的问题

1. 滚动过快，可能会出现白屏

滚动过快导致还未来得及渲染内容导致白屏

补救措施：

- 在可视区外设置缓存区，额外渲染合适的列表项。
- 加载骨架屏来代替原有的不渲染部分，这样当滚动过快时，白屏也就替换为了加载屏。

2. 优化计算

positions 的 bottom 是升序排列的
查找 setStartIndex 可以使用二分查找，时间复杂度从 O(n) 变为了 O(log n)

参考文章:[长列表优化之虚拟列表](https://zhuanlan.zhihu.com/p/444778554)
