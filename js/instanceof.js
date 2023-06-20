function myInstanceof(a, b) {
  if (typeof b !== "function" || typeof a !== "object") return false;
  let p = Object.getPrototypeOf(a);
  if (p === null) return false;
  if (p.constructor === b) {
    return true;
  } else {
    return myInstanceof(p, b);
  }
}

let p = new Promise((res) => {});
console.log(myInstanceof(p, Promise));
