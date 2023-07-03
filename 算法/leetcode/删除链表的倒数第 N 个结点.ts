/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
class ListNode {
  constructor(public val: any, public next: ListNode | null) {}
}
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head: ListNode | null , n: any): ListNode | null {
  let arr: ListNode[] = [];
  let node = head;
  while(node) {
    arr.push(node);
    node = node.next;
  }
  if (n >= arr.length) {
    head = head?.next || null;
  } else {
    let pre = arr[arr.length - n - 1];
    let after = arr[arr.length - n + 1] || null;
    pre.next = after;
  }
  return head;
};