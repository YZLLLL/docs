import observe from "./observe";
import Dep from "./Dep";

export default function defineReactive(data, key, value) {
  const dep = new Dep();
  let childOb = observe(value);
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();
      if (childOb) {
        childOb.dep.depend();
      }
      
      return value;
    },
    set(newValue) {
      if(value === newValue) return;
      value = newValue;
      childOb = observe(newValue);
      dep.notify();
    }
  })
}