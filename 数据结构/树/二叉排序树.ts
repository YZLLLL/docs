class BinaryTree {
  public root: null | TreeNode = null;
  constructor() {}
  insert(value: number) {
    const node = new TreeNode(value);
    if (this.root === null) {
      this.root = node;
    } else {
      this.insertNode(this.root, node);
    }
  }
  insertNode(parent: TreeNode, node: TreeNode) {

    if (parent.value > node.value) {
      if (parent.left === null) {
        return parent.left = node;
      }
      this.insertNode(parent.left, node);
    } else {
      if (parent.right === null) {
        return parent.right = node;
      }
      this.insertNode(parent.right, node);
    }
  }

  // 中序遍历 左右中
  inOrder(node: TreeNode) {
    if (node === null) {
      return [];
    }
    
    const result: number[] = [];
    
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
  }


}

class TreeNode {
  public left: TreeNode | null = null;
  public right: TreeNode | null = null;
  constructor(public value: number){}
}


const tree = new BinaryTree();
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(50);
tree.insert(11);
tree.insert(21);

console.log(tree);

let arr = tree.inOrder(tree.root);
console.log(arr);
