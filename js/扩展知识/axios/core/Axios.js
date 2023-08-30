import InterceptorManager from "./InterceptorManager.js";
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    }
  }

  // 就是axios可以 url 和 配置 分开传，也可以一起穿，
  // 相当于函数重载
  // request(url: string, config: object)
  // request(config: object)
  request(url, config = {}) {
    if (typeof url === "string") {
      config.url = url
    }

    
  }
}

export default Axios