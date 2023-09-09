class LRUCache {
  private map: Map<any, any>;
  constructor(private length: number) {
    this.map = new Map();
  }

  has(key: any) {
    return this.map.has(key);
  }

  get(key: any) {
    // 没有就返回undefined
    if (!this.has(key)) {
      return
    }
    // 有就重新设置一遍
    const value =  this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  set(key: any, value: any) {
    // 有就先删除
    if (this.has(key)) {
      this.map.delete(key);
    }
    this.map.set(key, value);
    // 设置完新的值之后如果超出缓存长度限制则删除第一个（最近最久未使用）
    if (this.map.size > this.length) {
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey); 
    }
  }
}