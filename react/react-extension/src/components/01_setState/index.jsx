import React, { Component,Fragment } from 'react'

export default class Demo extends Component {
  state = {
    count:0,
    number:1
  }

  increment = ()=>{
    // state可以传两个参数，第二个时修改state并且重新render之后的回调
    // 第一个参数可以是一个对象（回调函数的语法糖）
    // this.setState({count:this.state.count+1})
    // console.log(this.state.count); // 此处还是原来的count，因为setState的操作时异步的

    // 第一个参数可以是一个回调函数，返回一个对象
    this.setState(state=>({count:state.count+1}))
  }
  render() {
    return (
      // Fragment不会被渲染，和vue的template一样，解决了jsx只能有一个根元素的问题
      <Fragment>
        <h4>结果为：{this.state.count}</h4>
        <button onClick={this.increment}>+1</button>
      </Fragment>
    )
  }
}
