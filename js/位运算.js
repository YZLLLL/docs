// 应用
// 权限
const READ = 0b0001;
const ADD = 0b0010;
const EDIT = 0b0100;
const DELETE = 0b1000;

function canRead(n) {
  return (READ & n) === READ;
}

console.log(canRead(0b1111));
