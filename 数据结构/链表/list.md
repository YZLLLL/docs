链表（Linked List）是一种常见的数据结构，用于存储和组织数据。它由一系列节点（Node）组成，每个节点包含了数据和指向下一个节点的引用。

在 JavaScript 中，可以使用对象来表示链表的节点。每个节点包含一个存储的值和一个指向下一个节点的指针。链表的头节点是链表的起始点。

##### 链表的特点

1. 非连续性：链表中的节点可以在内存中的任何位置，它们通过指针相互连接，形成一个链式结构。相比于数组等连续存储的数据结构，链表的节点可以在内存中分散存储。

2. 动态性：链表的长度可以根据需要动态地增加或减少。这意味着可以在运行时灵活地插入、删除节点，而无需像数组那样需要重新分配内存空间。

3. 插入和删除操作高效：由于链表中的节点通过指针连接，插入和删除节点的操作相对高效。在链表中插入或删除一个节点只需要修改相邻节点的指针，而不需要像数组那样移动其他元素。

4. 随机访问低效：链表中的节点没有索引，因此无法像数组那样通过索引直接访问元素。要访问链表中的特定节点，需要从头节点开始遍历链表，直到找到目标节点。这使得链表在随机访问时效率较低。

5. 灵活性：链表可以用于实现其他高级数据结构，如队列、栈和图等。通过改变节点之间的连接方式，可以实现不同的数据结构和算法。

总的来说，链表是一种灵活、动态的数据结构，适用于频繁的插入和删除操作，但在随机访问时效率较低。

##### 实现链表

```ts
// 节点对象
class ListNode {
  public next: null | ListNode = null;
  constructor(public value: any) {}
}

// 链表
class List {
  public head: ListNode | null = null;
  public tail: ListNode;
  constructor() {}
  // 向链表末尾添加节点
  append(value: any) {
    const node = new ListNode(value);
    if (this.head === null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
  }
  // 向链表头部添加节点
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
```
