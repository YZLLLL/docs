// function generator() {
//   function Generator() {}
//   Generator.prototype.next = function () {
//     return {};
//   };
//   return new Generator();
// }

function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator(); // "Generator { }"
console.log(gen);
console.log(gen.next()); // 1
console.log(gen);
console.log(gen.next()); // 2
console.log(gen);
console.log(gen.next()); // 3
console.log(gen);
console.log(gen.next());
