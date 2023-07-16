class Store {
  constructor(options) {
    this.state = options.state;
    this.mumations = options.mumations;
    this.actions = options.actions;
    this.getters = options.getters;
  }
  commit(name, payload) {
    if (this.mumations[name]) {
      this.mumations[name](this.state, payload);
    }
  }
  dispatch(name, payload) {
    if (this.actions[name]) {
      this.actions[name](this.state, payload);
    }
  }
}
function useStore(options) {
  return new Store(options);
}

const store = useStore({
  state: {
    name: "张三",
    age: 18,
  },
  mutations: {
    changeName(state, payload) {
      state.name = payload;
    }
  },
  actions: {
    // rootState为根节点（有可能这个是一个moudle）状态
    changeAge({ commit, dispatch, state, rootState }) {

    }
  },
  getters: {
    // rootState为根节点（有可能这个是一个moudle）状态
    getName(state, getters, rootState) {
      return state.name;
    }
  }
})