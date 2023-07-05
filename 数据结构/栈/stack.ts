class Stack {
  public items: any[] = [];
  constructor() {}
  push(item: any): this {
    this.items.push(item);
    return this;
  }
  pop(): any {
    if (this.isEmpty) {
      return "stack is empty"
    }
    return this.items.pop();
  }
  clear() {
    this.items = [];
  }
  get size() {
    return this.items.length;
  }
  get isEmpty() {
    return this.size === 0;
  }
}
