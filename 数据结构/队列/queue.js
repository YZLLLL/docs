// 先进先出
// 一个自动执行的队列
var Queue = /** @class */ (function () {
    function Queue() {
        this.tasks = [];
    }
    Queue.prototype.enqueue = function (task) {
        this.tasks.push(task);
        this.init();
    };
    Queue.prototype.dequeue = function () {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.tasks.shift();
    };
    Queue.prototype.isEmpty = function () {
        return this.tasks.length === 0;
    };
    Queue.prototype.size = function () {
        return this.tasks.length;
    };
    Queue.prototype.init = function () {
        var _this = this;
        if (this.doing === true)
            return;
        if (!this.isEmpty()) {
            this.doing = true;
            Promise.resolve()
                .then(function () { return _this.tasks[0]["do"](); })["finally"](function () {
                _this.dequeue();
                _this.doing = false;
                _this.init();
            });
        }
    };
    return Queue;
}());
var Task = /** @class */ (function () {
    function Task(fn) {
        this.fn = fn;
    }
    Task.prototype["do"] = function () {
        return this.fn();
    };
    return Task;
}());
var TaskFactory = /** @class */ (function () {
    function TaskFactory() {
    }
    TaskFactory.prototype.createTask = function (time, cb) {
        return new Task(function () {
            return new Promise(function (res) {
                setTimeout(function () {
                    res(cb());
                }, time);
            });
        });
    };
    return TaskFactory;
}());
var taskFactory = new TaskFactory();
var task1 = taskFactory.createTask(3000, function () { console.log("任务1完成"); });
var task2 = taskFactory.createTask(5000, function () { console.log("任务2完成"); });
var task3 = taskFactory.createTask(7000, function () {
    console.log("任务3完成");
    setTimeout(function () {
        var task4 = taskFactory.createTask(10000, function () { console.log("任务4完成"); });
        queue.enqueue(task4);
    }, 2000);
    return;
});
var queue = new Queue();
queue.enqueue(task1);
queue.enqueue(task2);
queue.enqueue(task3);
