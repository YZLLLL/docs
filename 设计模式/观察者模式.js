var Subject = /** @class */ (function () {
    function Subject() {
        this.observers = [];
    }
    Subject.prototype.addObserver = function (observer) {
        this.observers.push(observer);
        return this;
    };
    Subject.prototype.removeObserver = function (observer) {
        this.observers = this.observers.filter(function (o) { return o !== observer; });
        return this;
    };
    Subject.prototype.notify = function (message) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(message);
        }
    };
    return Subject;
}());
var Observer = /** @class */ (function () {
    function Observer(name) {
        this.name = name;
    }
    Observer.prototype.update = function (message) {
        console.log("".concat(this.name, "\u6536\u5230\u6D88\u606F\uFF1A").concat(message));
    };
    return Observer;
}());
var subject = new Subject();
var observer1 = new Observer("张三");
var observer2 = new Observer("李四");
var observer3 = new Observer("王五");
subject.addObserver(observer1).addObserver(observer2).addObserver(observer3);
subject.removeObserver(observer2);
subject.notify("上课了");
