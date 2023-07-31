// 防抖
function debounce(fn, duration = 500) {
  let timeId;
  return function (...args) {
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      fn.apply(this, args);
    }, duration);
  };
}

// 节流
// 定时器方式
function throttle(fn, duration = 500) {
  let timeId;
  return function (...args) {
    if (!timeId) {
      timeId = setTimeout(() => {
        timeId = null;
        fn.apply(this, args);
      }, duration);
    }
  };
}
// 时间戳方式
function throttle(fn, duration = 500) {
  let pre = Date.now();
  return function (...args) {
    const cur = Date.now();
    if (cur - pre >= duration) {
      fn.apply(this, args);
      pre = cur;
    }
  };
}
