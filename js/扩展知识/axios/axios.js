import Axios from "./core/Axios.js";
import bind from "./helpers/bind.js"
function createInstance(defaultConfig) {
  const context = new Axios(defaultConfig);

  // bind 就是 绑定一下this
  const instance = bind(Axios.prototype.request, context);

  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };
}

const axios = createInstance(defaults);

export default axios