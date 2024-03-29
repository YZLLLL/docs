Vite 是一个基于 ES 模块的快速开发工具，用于构建现代化的前端应用程序。

#### Vite 的优点：

1. 快速的冷启动：Vite 使用 ES 模块的原生浏览器支持，无需打包和构建即可直接运行代码。这使得冷启动速度非常快，加快了开发者的反馈循环。

2. 按需编译：Vite 只编译正在被请求的模块，而不是整个应用程序。这种按需编译的方式减少了构建时间和资源消耗。

3. 开发服务器：Vite 内置了一个开发服务器，支持热模块替换（HMR），可以实时更新修改的代码，加快开发效率。

4. 简化的配置：Vite 采用约定大于配置的原则，提供了一组合理的默认配置，减少了项目的配置复杂性。

与 Webpack 的对比：

1. 构建速度：Vite 在开发环境下具有更快的冷启动和热更新速度，而 Webpack 在大型项目和生产环境下的构建速度更快。

2. 生态系统：由于 Webpack 的广泛应用，它有一个庞大的生态系统和丰富的插件支持。相比之下，Vite 相对较新，插件生态系统相对较小，但正在迅速发展。

3. 功能和灵活性：Webpack 是一个功能强大且灵活的构建工具，可以处理各种复杂的场景和需求。Vite 则更专注于开发体验和快速构建，对于简单的项目更加轻量和易用。

#### Vite 为什么快

webpack 打包过程以及原理:

- Webpack 叫做 bundler ，将所有文件打包成一个文件。
- Webpack 先识别入口文件，启动服务器后，最后直接给出打包结果。Webpack 做的是分析代码，转换代码，最后形成打包后的代码。

vite 打包过程以及原理:

- Vite 又叫做 no bundler ，顾名思义，就是不用打包，支持 ES moudle 加载。
- Vite 启动服务器后，会按需加载，当请求哪个模块时才会对该模块进行编译。按需加载的方式，极大的缩减了编译时间。

Webpack 是基于 Node.js 实现的，而 Vite 是使用 Esbuild 预构建依赖，Esbuild 使用 Go 语言编写，比以 Node.js 编写的打包器预构建依赖快 10-100 倍。

#### vite 首屏渲染问题

在首次启动 vite 时，首屏渲染时间会更长。
这是因为 Vite 并没有在 dev Server 启动期间进行代码转换，而是在浏览器请求模块（浏览器请求还会有并发限制，导致更慢）时进行编译转换，这就能做到用到哪个模块就编译哪个模块。这也是 Vite Server 启动快的原因，但这同时也会带来更长的首屏时间。（之后的首屏不会那么慢，编译的文件的有缓存）

总结： webpack 的启动时间较长是因为启动时就会将所有依赖文件编译处理完成，而 vite 则是直接启动，依赖预构建则异步执行，导致首次启动首屏时间更长。

#### 常用的 Vite 配置项包括：

- mode：指定应用程序的模式，可以是开发模式（'development'）或生产模式（'production'）。在开发模式下，Vite 会启用一些调试工具和优化，而在生产模式下，会进行代码压缩和优化。

- resolve：用于配置模块解析行为的选项。可以指定别名（alias）来简化导入路径，指定扩展名（extensions）来处理不同类型的模块，还可以配置模块的查找顺序（mainFields）等。

- root：指定项目的根目录，默认为当前工作目录。

- base：指定在构建生产版本时，HTML 文件所在的基础路径。默认情况下，它是一个相对路径（'./'），可以根据实际需求进行更改。

- publicDir：指定公共资源文件夹的路径，默认为 'public'。在构建过程中，该文件夹中的内容将被复制到输出目录。

- build：构建相关的配置选项。

- target：指定构建的目标浏览器环境，默认为 'modules'，表示构建为支持原生 ES 模块的浏览器。可以设置为 'esnext' 或 'browserslist'，以根据项目需求选择构建目标。

- outDir：指定构建输出目录，默认为 'dist'。

- assetsDir：指定静态资源的输出目录，默认为 'assets'。在构建过程中，这些资源将被复制到输出目录。

- sourcemap：控制是否生成源映射文件，默认为 true。

- rollupOptions：通过该选项可以自定义 Rollup 打包的配置。可以配置 Rollup 的插件、模块解析方式、代码拆分等。

- plugins：配置插件。Vite 使用插件系统来扩展其功能。可以通过该选项引入各种插件，如编译 TypeScript、处理 CSS、压缩代码等

- server：开发服务器相关的配置选项。

- host：指定服务器绑定的主机名，默认为 'localhost'。

- port：指定服务器监听的端口，默认为 3000。

- proxy：配置代理服务器，用于解决开发过程中的跨域问题。

- open：控制是否在启动开发服务器时自动打开浏览器，默认为 true。

需要注意的是，Vite 的配置项相对较少，大部分情况下可以使用默认配置即可，这也是 Vite 的一个优点之一。
