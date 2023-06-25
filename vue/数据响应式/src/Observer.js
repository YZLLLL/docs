import defineReactive from "./defineReactive";
import { def } from "./utils";
import Dep from "./Dep";
import newArrayPrototype from "./arrayMethods";
import observe from "./observe";

export default class Observer {
  constructor(value) {
    // this.value = value;
    this.dep = new Dep();
    def(value, "__ob__", this, false);
    if (Array.isArray(value)) {
      Object.setPrototypeOf(value, newArrayPrototype);
      this.observeArray(value);
    } else {
      this.walk(value);
    }
    
  }
  walk(object) {
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        defineReactive(object, key, element);
      }
    }
  }

  observeArray(value) {
    for (const item of value) {
      observe(item);
    }
  }
}