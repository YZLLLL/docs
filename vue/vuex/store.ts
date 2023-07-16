declare class MyVuexStore {
  commit(eventName: string, data:any): void;
  dispatch(eventName: string, data:any): void;
}

declare function myUseStore<T extends object>(options: {
  state: T,
  mutations: {
    [name: string]: (state: T, payload: any) => void;
  },
  actions?: {
    [name: string]: (state: T, payload: any) => void;
  }
  getters?: {
    [name: string]: (state: T) => any;
  }
}): Store;

type MyVuexStoreOption<T extends object> = {
  state: T,
  mutations: {
    [name: string]: (state: T, payload: any) => void;
  },
  actions?: FnObject,
  getters?: FnObject
}

type FnObject = {
  [name: string]: Function
}

class Store implements MyVuexStore {
  public state: object;
  private mutations: FnObject;
  private actions: FnObject;
  public getters: FnObject;
  constructor(options: MyVuexStoreOption) {
    this.state = options.state;
    this.mutations = options.mutations;
    this.actions = options.actions;
    this.getters = options.getters;
  }
  commit(eventName:string, data:any) {
    if (this.mutations[eventName]) {
      this.mutations[eventName](this.state, data);
    }
  }
  dispatch(eventName:string, data:any): Promise<any> {
    if (this.actions[eventName]) {
      return this.actions[eventName](this.state, data);
    }
  }
  getState() {
    return this.state;
  }
}


function myUseStore(option: MyVuexStoreOption) {
  return new Store(option)
}



const store = myUseStore({
  state: {
    name: "张三",
    age: 18,
  },
  mutations: {
    changeName(state: object, payload: any) {
      state.name = payload;
    }
  },
  actions: {},
  getters: {}
});

store.commit("changeName", "李四");
