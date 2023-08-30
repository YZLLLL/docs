class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * 
   * @param {*} fulfilled promise  fulfilled 时成功执行
   * @param {*} rejected promise  rejected 时失败执行
   * @param {*} options options 我们暂且不看
   * @returns 下标，方便之后清除它
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * 清除某个use方法
   * @param {number} id use方法返回的下标 
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * 清空所有handlers
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  forEach(fn) {
    // 没仔细看，这里会循环执行handlers
  }

}

export default InterceptorManager;