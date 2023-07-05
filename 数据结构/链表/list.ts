class ListNode {
  public next: null | ListNode = null;
  constructor(public value: any) {}
}

class List {
  public head: ListNode | null = null;
  public tail: ListNode;
  constructor() {}
  append(value: any) {
    const node = new ListNode(value);
    if (this.head === null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
  }
  prepend(value: any) {
    const node = new ListNode(value);
    if (this.head === null) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
  }
}

const list = new List();
list.append(1);
list.append(2);
list.append(3);
console.log(list);