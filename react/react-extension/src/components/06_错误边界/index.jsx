import React, { Component } from 'react'

export default class Parent extends Component {
  // 可以捕捉后代组件出现的错误
  static getDerivedStateFromError(err){
    // 返回值会被调用setState
    return {hasError:true}
  }

  // 发送错误后执行的钩子
  // 一般用于发送网络请求统计错误信息
  componentDidCatch(err,info){
    console.log(err,info);
  }

  state = {
    hasError:false
  }

  render() {
    return (
      <div>
        <h4>Parent</h4>
        {/* 第一次hasError为false会渲染Child，导致hasError为true，重新渲染后变为h4 */}
        {
          this.state.hasError ? <h4>网络异常，请稍后再试</h4> : <Child />
        }
        
      </div>
    )
  }
}


// 故意让Child组件render方法里出现错误
// 使用错误边界防止错误扩散，导致直接报错
// 给他的父组件加上
class Child extends Component {
  state = {
    data:'qwer'
  }
  render() {
    return (
      <div>
        <h5>child</h5>
        {
          this.state.data.map((d,i)=><li key={i}>{d}</li>)
        }
      </div>
    )
  }
}
