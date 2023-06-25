import observe from "./observe";
import Watcher from "./Watcher";
let data = {
  a: {
    b: {
      c: {
        d: 1
      }
    }
  },
  arr: [1, 2, 3, 4]
};

observe(data);
new Watcher(data, 'a.b.c.d', (value) => {
  console.log('adaad',value)
})
new Watcher(data, 'arr', (value) => {
  console.log('array', value)
})
console.log(data.a.b.c.d)
data.a.b.c.d = 10;
data.arr.push(5);
console.log(data);

