console.log(self, this, self === this);
self.onmessage = (event) => {
  console.time('web-worker');
  console.log(event);
  console.log(event.data);
  let result = 0;
  // web worker通信也需要时间，如果 web worker 执行的 不复杂 也不建议使用。
  // 假设这里进行的就是很需要时间的操作
  for (let i = 0; i < event.data; i++) {
    result += i;
  }
  console.timeEnd('web-worker');
  self.postMessage({result});
}