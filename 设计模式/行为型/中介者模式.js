/**
 * 中介者模式（Mediator Pattern）是一种行为型设计模式。
 * 它允许对象之间进行通信，而不需要直接引用彼此。
 * 它通过引入一个中介者对象来封装对象之间的通信逻辑，从而促进了松耦合。
 */
var Mediator = /** @class */ (function () {
    function Mediator() {
    }
    Mediator.prototype.setColleague1 = function (colleague) {
        this.colleague1 = colleague;
    };
    Mediator.prototype.setColleague2 = function (colleague) {
        this.colleague2 = colleague;
    };
    Mediator.prototype.send = function (sender, message) {
        if (sender === this.colleague1) {
            this.colleague2.receive(sender, message);
        }
        else if (sender === this.colleague2) {
            this.colleague1.receive(sender, message);
        }
    };
    return Mediator;
}());
var Colleague = /** @class */ (function () {
    function Colleague(mediator, name) {
        this.mediator = mediator;
        this.name = name;
    }
    Colleague.prototype.send = function (message) {
        this.mediator.send(this, message);
    };
    Colleague.prototype.receive = function (sender, message) {
        console.log("".concat(this.name, "\u6536\u5230\u4E86").concat(sender.name, "\u7684\u6D88\u606F\uFF1A").concat(message));
    };
    return Colleague;
}());
// 创建中介和需要中介的双方，进行绑定
var mediator = new Mediator();
var colleague1 = new Colleague(mediator, "房东");
var colleague2 = new Colleague(mediator, "租客");
mediator.setColleague1(colleague1);
mediator.setColleague2(colleague2);
colleague1.send("请问什么时候来看房子");
colleague2.send("下周六");
