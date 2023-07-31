##### 什么是 Flex 布局

Flex 布局是一种用于创建灵活的、自适应的布局的 CSS 属性。它可以帮助我们更轻松地实现元素的水平和垂直居中、均匀分布和自适应宽度等效果。

##### 常用属性

以下是 Flex 布局的一些常用属性：

1.  display: flex; ：将元素的显示方式设置为 Flex 布局。

2.  flex-direction: row|column; ：指定 Flex 容器中子元素的排列方向，可以是水平方向（row）或垂直方向（column）。

3.  justify-content: flex-start|flex-end|center|space-between|space-around; ：定义 Flex 容器中子元素在主轴上的对齐方式，可以让子元素居中、两端对齐或者等间距分布。

> **主轴**是 flex 项目布局的主要方向。它可以是水平方向或垂直方向，取决于 flex-direction 属性的值。默认情况下，当 flex-direction 设置为 row 时，主轴是水平方向（从左到右），当 flex-direction 设置为 column 时，主轴是垂直方向（从上到下）。

4.  align-items: flex-start|flex-end|center|baseline|stretch; ：定义 Flex 容器中子元素在交叉轴上的对齐方式，可以让子元素垂直居中、顶部对齐、底部对齐或者基线对齐。

> **交叉轴**是与主轴垂直的轴线。它与主轴的方向相交。如果主轴是水平方向，则交叉轴是垂直方向；如果主轴是垂直方向，则交叉轴是水平方向。

5.  flex-grow: number; ：定义子元素的放大比例，用于分配剩余空间。默认值为 0，表示不放大。

> 分配规则： 计算 flex-grow 份数，按照 flex-grow 大小分配。

例如： 剩余空间 300px, flex-grow 分别为 1、2、3，那么分别放大 50px、100px、150px

6.  flex-shrink: number; ：定义子元素的缩小比例，用于收缩超出容器空间的元素。默认值为 1，表示可以缩小。

> 分配规则：
>
> 1. 计算 flex-shrink 的权重;flex-shrink 的权重 等于 flex-shrink\*元素宽度只和；
> 2. 计算需要收缩的宽度（及超出部分宽度）
> 3. 计算弹性元素的收缩宽度。 弹性元素需要收缩的宽度 = （（弹性元素宽度 \* shrink 比例） / 权重） \* 收缩宽度

例如： 总宽度 900px，三个盒子宽度、flex-shrink 分别为 300px,1、400px,2、500px,3

```tex
权重： 300 * 1 + 400 * 2 + 500 * 3 = 2600
需要收缩的宽度： 300 + 400 + 500 - 800 = 400
盒子1收缩宽度： ((300 * 1) / 2600) * 100 = 300 / 26
盒子2收缩宽度： ((400 * 2) / 2600) * 100 = 800 / 26
盒子3收缩宽度： ((500 * 3) / 2600) * 100 = 1500 / 26
总结： flex-shrink 按照 元素宽度 * flex-shrink 的比值来分配彼此需要缩小的比例
```

7.  flex-basis: length|auto; ：定义子元素在主轴上的初始大小。可以设置具体的长度值或者使用 auto 自适应大小。

8.  flex: flex-grow flex-shrink flex-basis; ： flex 是一个简写属性，用于同时设置 flex-grow 、 flex-shrink 和 flex-basis 。

##### Flex 布局使用例子

1. 水平垂直居中布局

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

2. 等宽的多列布局

```css
.container {
  display: flex;
}

.column {
  flex: 1;
}
```

3. 两栏布局
   左侧宽度固定，右侧自适应

```css
.container {
  display: flex;
}

.left {
  width: 200px;
}

.right {
  flex: 1;
}
```
