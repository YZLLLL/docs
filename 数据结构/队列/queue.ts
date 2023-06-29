// 先进先出
// 一个自动执行的队列
class Queue {
  private tasks: Task[] = [];
  private doing: boolean;
  constructor() {}
  enqueue(task: Task) {
    this.tasks.push(task);
    this.init();
  }
  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.tasks.shift();
  }
  isEmpty() {
    return this.tasks.length === 0;
  }
  size() {
    return this.tasks.length;
  }
  init() {
    if (this.doing === true) return;
    if (!this.isEmpty()) {
      this.doing = true;
      Promise.resolve()
        .then(() => this.tasks[0].do())
        .finally(() => {
          this.dequeue();
          this.doing = false;
          this.init();
        })
    }
  }

}

class Task {
  constructor(public fn: Function) {}
  do(): any {
    return this.fn();
  }
}


class TaskFactory {
  createTask(time: number, cb: Function) {
    return new Task(function(){
      return new Promise(res=>{
        setTimeout(function(){
          res(cb())
        }, time);
      })
    })
  }
}

const taskFactory = new TaskFactory();
const task1 = taskFactory.createTask(3000, () => {console.log("任务1完成")});
const task2 = taskFactory.createTask(5000, () => {console.log("任务2完成")});
const task3 = taskFactory.createTask(7000, () => {
  console.log("任务3完成");
  setTimeout(() => {
    const task4 = taskFactory.createTask(10000, () => {console.log("任务4完成")});
    queue.enqueue(task4);
  }, 2000);
  return;
});

const queue = new Queue();
queue.enqueue(task1);
queue.enqueue(task2);
queue.enqueue(task3);