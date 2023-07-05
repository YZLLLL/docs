var Stack = /** @class */ (function () {
    function Stack() {
        this.items = [];
    }
    Stack.prototype.push = function (item) {
        this.items.push(item);
        return this;
    };
    Stack.prototype.pop = function () {
        if (this.isEmpty) {
            return "stack is empty";
        }
        return this.items.pop();
    };
    Stack.prototype.clear = function () {
        this.items = [];
    };
    Object.defineProperty(Stack.prototype, "size", {
        get: function () {
            return this.items.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Stack.prototype, "isEmpty", {
        get: function () {
            return this.size === 0;
        },
        enumerable: false,
        configurable: true
    });
    return Stack;
}());
