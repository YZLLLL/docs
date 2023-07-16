var Store = /** @class */ (function () {
    function Store(options) {
        this.state = options.state;
        this.mutations = options.mutations;
        this.actions = options.actions;
        this.getters = options.getters;
    }
    Store.prototype.commit = function (eventName, data) {
        if (this.mutations[eventName]) {
            this.mutations[eventName](this.state, data);
        }
    };
    Store.prototype.dispatch = function (eventName, data) {
        if (this.actions[eventName]) {
            return this.actions[eventName](this.state, data);
        }
    };
    Store.prototype.getState = function () {
        return this.state;
    };
    return Store;
}());
function myUseStore(option) {
    return new Store(option);
}
var store = myUseStore({
    state: {
        name: "张三",
        age: 18
    },
    mutations: {
        changeName: function (state, payload) {
            state.name = payload;
        }
    },
    actions: {},
    getters: {}
});
store.commit("changeName", "李四");
