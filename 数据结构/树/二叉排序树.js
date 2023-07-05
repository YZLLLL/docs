var BinaryTree = /** @class */ (function () {
    function BinaryTree() {
        this.root = null;
    }
    BinaryTree.prototype.insert = function (value) {
        var node = new TreeNode(value);
        if (this.root === null) {
            this.root = node;
        }
        else {
            this.insertNode(this.root, node);
        }
    };
    BinaryTree.prototype.insertNode = function (parent, node) {
        if (parent.value > node.value) {
            if (parent.left === null) {
                return parent.left = node;
            }
            this.insertNode(parent.left, node);
        }
        else {
            if (parent.right === null) {
                return parent.right = node;
            }
            this.insertNode(parent.right, node);
        }
    };
    // 中序遍历 左右中
    BinaryTree.prototype.inOrder = function (node) {
        if (node === null) {
            return [];
        }
        var result = [];
        function traverse(node) {
            if (node.left) {
                traverse(node.left);
            }
            result.push(node.value);
            if (node.right) {
                traverse(node.right);
            }
        }
        traverse(node);
        return result;
    };
    return BinaryTree;
}());
var TreeNode = /** @class */ (function () {
    function TreeNode(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    return TreeNode;
}());
var tree = new BinaryTree();
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(50);
tree.insert(11);
tree.insert(21);
console.log(tree);
var arr = tree.inOrder(tree.root);
console.log(arr);
