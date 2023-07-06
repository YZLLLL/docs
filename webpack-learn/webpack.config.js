const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: path.resolve(__dirname, "./src/main.ts"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./index.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: path.resolve(__dirname, "./loaders/addName.js"),
            options: {
              name: '张三'
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env"]
            }
          },
          'ts-loader',
        ],        
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      filename: 'index.html'
    })
  ],
  mode: "development",
  devServer: {
    host: 'localhost',
    port: 8080,
    // hot: true,
  },
  devtool: 'cheap-module-source-map',
}