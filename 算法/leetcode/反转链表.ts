function reverseList(head: ListNode) {
  let pre: null | ListNode = null;
  let cur: null | ListNode = head
  while (cur) {
    let temp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = temp;
  }
  return pre;
}