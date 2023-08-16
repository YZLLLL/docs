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
for (let i = 0; i < 100; i++) {
  list.push({
    id: i,
    text: i,
    height: Math.floor(Math.random() * 100), // 给个随机高度
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
  // 这样没有复用之前的元素，如果使用vue或者react就可以复用了
  dom.list.innerHTML = "";
  list.forEach((item, index) => {
    if (index >= startIndex && index <= endIndex) {
      dom.list.append(itemCreator(item.text, index));
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

function itemCreator(str, index) {
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

  return () => resizeObserver.disconnect();
}

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

onScroll();

dom.container.addEventListener("scroll", onScroll);
