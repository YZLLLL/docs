const path = require("path");
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/index.js",
    clean: true,
  },
  plugins: [
    new HtmlPlugin({
      // 以根目录下的public/index.html 为模板，不会丢失原本结构
      template: path.resolve(__dirname, './public/index.html')
    })
  ],
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    hot: true,
  },
  mode: 'development',
  devtool: "cheap-module-source-map",
}