class VueRouter {
  constructor(options) {
    this.mode = options.mode || "hash";
    this.routes = options.routes;
  }
}
