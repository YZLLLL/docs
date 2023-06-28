/**
 * 观察者模式（Observer Pattern）是一种行为设计模式。
 * 它定义了对象之间的一对多依赖关系，使得当一个对象状态发生变化时，其相关依赖对象都能够得到通知并自动更新。
 */
class Subject {
  public observers: Observer[] = [];
  constructor() {}

  addObserver(observer: Observer): this {
    this.observers.push(observer);
    return this;
  }

  removeObserver(observer: Observer): this {
    this.observers = this.observers.filter(o => o !== observer);
    return this;
  }

  notify(message: string): void {
    for (const observer of this.observers) {
      observer.update(message);
    }
    
  }
}

class Observer {
  constructor(public name: string) {}

  update(message: string) {
    console.log(`${this.name}收到消息：${message}`);
  }
}

const subject = new Subject();

const observer1 = new Observer("张三");
const observer2 = new Observer("李四");
const observer3 = new Observer("王五");

subject.addObserver(observer1).addObserver(observer2).addObserver(observer3);
subject.removeObserver(observer2);
subject.notify("上课了");