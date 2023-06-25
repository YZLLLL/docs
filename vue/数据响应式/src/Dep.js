export default class Dep {
  constructor() {
    // 去重，不然会死循环
    // watcher.update时也会读取，会再次将这个watcher加入，导致
    // notify时, this.watchers一直增加，for...of循环一直不会结束
    this.watchers = new Set();
  }

  addWatcher(watcher) {
    this.watchers.add(watcher);
  }

  depend() {
    if(Dep.target) {
      this.addWatcher(Dep.target);
    }
  }

  notify() {
    for (const watcher of this.watchers) {
      watcher.update();
    }
  }
}