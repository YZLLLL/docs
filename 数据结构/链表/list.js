var ListNode = /** @class */ (function () {
    function ListNode(value) {
        this.value = value;
        this.next = null;
    }
    return ListNode;
}());
var List = /** @class */ (function () {
    function List() {
        this.head = null;
    }
    List.prototype.append = function (value) {
        var node = new ListNode(value);
        if (this.head === null) {
            this.head = node;
        }
        else {
            this.tail.next = node;
        }
        this.tail = node;
    };
    List.prototype.prepend = function (value) {
        var node = new ListNode(value);
        if (this.head === null) {
            this.head = this.tail = node;
        }
        else {
            node.next = this.head;
            this.head = node;
        }
    };
    return List;
}());
var list = new List();
list.append(1);
list.append(2);
list.append(3);
console.log(list);
