import { def } from "./utils";

const arrMethods = [
  "push",
  "pop",
  "unshift",
  "shift",
  "splice",
  "reserve",
  "sort",
];

let oldPrototype = Array.prototype;
const newArrayPrototype = Object.create(oldPrototype);
arrMethods.forEach(name => {
  let oldMethod = oldPrototype[name];
  def(newArrayPrototype, name, function(...args) {
    const result = oldMethod.apply(this, args);
    let insert = [];
    const ob = this.__ob__;
    ob.dep.notify();
    switch (name) {
      case "push":
      case "unshift": 
        insert = args;
        break;
      case "splice":
        insert = args.slice(2);
        break;
      default:
        break;
    }
    if (insert.length) {
      ob.observeArray(insert)
    }
    return result
  }, false)
})
export default newArrayPrototype
