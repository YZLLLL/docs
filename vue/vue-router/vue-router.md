Vue Router 是 Vue.js 官方的路由管理器，它允许我们在 Vue 应用程序中实现客户端路由。它的实现原理是基于浏览器的 History API 或 Hash 模式来管理 URL，并根据 URL 的变化来渲染不同的组件。

#### 配置项

Vue Router 的配置项规则包括路由的路径、组件、重定向等。我们可以使用 routes 配置项来定义路由的规则。

##### routes

下面配置定义了几个路由规则，包括根路径、关于页面、联系页面、用户详情页面和未匹配到的路径。每个路由规则都包含一个 path 和对应的组件。

```js
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/user/:id", component: User },
  { path: "*", component: NotFound },
];
```

##### mode

**history**

- 在 history 模式下，Vue Router 使用浏览器的 History API 来管理路由。它通过修改浏览器的 URL 来实现路由切换，而不会在 URL 中添加任何特殊字符。
- 使用 history 模式时，URL 看起来更加干净，没有#符号，更符合传统的 URL 格式。
- 在使用 history 模式时，需要后端服务器的支持，以确保在刷新页面或直接访问路由时，服务器能够正确地返回对应的页面。

**hash**

- 在 hash 模式下，Vue Router 使用 URL 的哈希部分（#）来管理路由。哈希符号后面的部分被视为路由的路径。
- 使用 hash 模式时，URL 会在#符号后面添加路由路径，例如：http://example.com/#/home。
- Hash 模式不需要后端服务器的特殊配置，因为哈希部分的内容不会被发送到服务器，只在客户端进行路由切换。

#### $route、$router

app.use(router)会为所有组件提供两个对象以便访问路由

$route: 是当前路由信息对象，获取和当前路由有关的信息。 route 为属性是只读的，里面的属性是 immutable (不可变) 的，不过可以通过 watch 监听路由的变化。

$router 是 vueRouter 实例对象，是一个全局路由对象，通过 this.$router 访问路由器, 可以获取整个路由文件或使用路由提供的方法。

#### 路由守卫

##### 全局路由守卫

beforeEach(to,from, next)

beforeResolve(to,from, next)

afterEach(to,from)

##### 独享路由守卫

beforeEnter(to,from, next)

##### 组件路由守卫

beforeRouteEnter(to,from, next) -- 进入前
beforeRouteUpdate(to,from, next) -- 路由变化时
beforeRouteLeave(to,from, next) -- 离开后

#### 路由跳转

- 使用 <router-link> 组件

可以在模板中使用 <router-link> 组件来创建导航链接，它会自动渲染为 <a> 标签，并且会根据配置的路由路径进行跳转。

- 使用 router.push

```js
// 字符串路径
router.push("/users/eduardo");

// 带有路径的对象
router.push({ path: "/users/eduardo" });

// 命名的路由，并加上参数，让路由建立 url
router.push({ name: "user", params: { username: "eduardo" } });

// 带查询参数，结果是 /register?plan=private
router.push({ path: "/register", query: { plan: "private" } });

// 带 hash，结果是 /about#team
router.push({ path: "/about", hash: "#team" });
```

注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path ：

```js
const username = "eduardo";
// 我们可以手动建立 url，但我们必须自己处理编码
router.push(`/user/${username}`); // -> /user/eduardo
// 同样
router.push({ path: `/user/${username}` }); // -> /user/eduardo
// 如果可能的话，使用 `name` 和 `params` 从自动 URL 编码中获益
router.push({ name: "user", params: { username } }); // -> /user/eduardo
// `params` 不能与 `path` 一起使用
router.push({ path: "/user", params: { username } }); // -> /user
```

- router.replace

它的作用类似于 router.push，唯一不同的是，它在导航时不会向 history 添加新记录，正如它的名字所暗示的那样——它取代了当前的条目。

也可以直接在传递给 router.push 的 routeLocation 中增加一个属性 replace: true ：

```js
router.push({ path: "/home", replace: true });
// 相当于
router.replace({ path: "/home" });
```

#### 路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

Vue Router 支持开箱即用的动态导入，这意味着你可以用动态导入代替静态导入：

```js
// 将
// import UserDetails from './views/UserDetails.vue'
// 替换成
const UserDetails = () => import("./views/UserDetails.vue");

const router = createRouter({
  // ...
  routes: [{ path: "/users/:id", component: UserDetails }],
});
```

component (和 components) 配置接收一个返回 Promise 组件的函数，Vue Router 只会在第一次进入页面时才会获取这个函数，然后使用缓存数据。这意味着你也可以使用更复杂的函数，只要它们返回一个 Promise ：

```js
const UserDetails = () =>
  Promise.resolve({
    /* 组件定义 */
  });
```
