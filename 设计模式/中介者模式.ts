/**
 * 中介者模式（Mediator Pattern）是一种行为型设计模式。
 * 它允许对象之间进行通信，而不需要直接引用彼此。
 * 它通过引入一个中介者对象来封装对象之间的通信逻辑，从而促进了松耦合。
 */
class Mediator {
  public colleague1: Colleague;
  public colleague2: Colleague;
  constructor() {}
  setColleague1(colleague: Colleague) {
    this.colleague1 = colleague;
  }
  setColleague2(colleague: Colleague) {
    this.colleague2 = colleague;
  }
  send(sender: Colleague, message: string) {
    if (sender === this.colleague1) {
      this.colleague2.receive(sender, message);
    } else if (sender === this.colleague2) {
      this.colleague1.receive(sender, message);
    }
  }
}

class Colleague {
  constructor(public mediator: Mediator, public name: string) {}
  send(message: string) {
    this.mediator.send(this, message);
  }
  receive(sender: Colleague,message: string) {
    console.log(`${this.name}收到了${sender.name}的消息：${message}`)
  }
}

// 创建中介和需要中介的双方，进行绑定
const mediator = new Mediator();
const colleague1 = new Colleague(mediator, "房东");
const colleague2 = new Colleague(mediator, "租客");
mediator.setColleague1(colleague1);
mediator.setColleague2(colleague2);

colleague1.send("请问什么时候来看房子");

colleague2.send("下周六");

/**
 * 在上面的示例中，中介者对象充当了同事对象（Colleague1和Colleague2）之间通信的中心枢纽。
 * 每个同事对象都有一个对中介者的引用，并可以通过中介者的 send() 方法向其他同事发送消息。
 * 中介者对象根据发送者的身份将消息路由到适当的同事对象上。
 * 
 * 中介者模式有助于减少对象之间的依赖关系，并简化它们之间的交互。
 * 它通常在对象之间存在复杂的通信网络的场景中使用，例如聊天应用程序或事件驱动系统。
 */
