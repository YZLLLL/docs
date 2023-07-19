// import React, { Component} from 'react'
import React, { PureComponent} from 'react'

// component的问题
// 只要调用setState()，就算没有改变state也会重新渲染
// 父组件重新渲染，传给子组件的props没有发送改变也会导致子组件重新渲染

// 解决方法（让组件只有在改变state或者传入的props时才会重新渲染）
// 自己调用shouldComponentUpdate，判断state或者传入的props是否改变（比较麻烦）
// 使用prueComponent（内部封装了shouldComponentUpdate，一样的原理）



// 优化前
// export default class index extends Component {
//   state = {
//     count:0
//   }

//   nothing = ()=>{
//     // 并没有改变state也会重新渲染组件
//     this.setState({})
//   }

//   increment = ()=>{
//     this.setState({count:this.state.count+1})
//   }

//   render() {
//     const {count} = this.state
//     console.log('parent组件重新render');
//     return (
//       <div>
//         <h4>结果为：{count}</h4>
//         <button onClick={this.nothing}>nothing</button>
//         <button onClick={this.increment}>+1</button>
//         <br />
//         {/* 父组件重新渲染，传递的props没有改变也会导致子组件重新渲染 */}
//         <Child count={count} name='张三' age='李四' />
//       </div>
//     )
//   }
// }


// class Child extends Component{
//   render(){
//     console.log('子组件重新渲染');
//     return (
//       <div>
//         <h5>子组件</h5>
//         <span>props:{Object.keys(this.props).map((prop,index)=><li key={index}>{`${prop}:${this.props[prop]}`}</li>)}</span>
//       </div>
//     )
//   }
// }



// // 使用shouldComponentUpdate手动优化
// export default class index extends Component {
//   state = {
//     count:0,
//     other:1
//   }
//   // 判断props和state是否改变
//   // 没改变就不胡重新渲染
//   shouldComponentUpdate(nextProps,nextState){
//     if(nextState.count === this.state.count&&nextState.other === this.state.other) return false
//     return true
//   }

//   nothing = ()=>{
//     this.setState({})
//   }

//   other = ()=>{
//     this.setState({other:this.state.other+1})
//   }

//   increment = ()=>{
//     this.setState({count:this.state.count+1})
//   }

//   render() {
//     const {count,other} = this.state
//     console.log('parent组件重新render');
//     return (
//       <div>
//         <h4>结果为：{count}</h4>
//         <h4>other为：{other}</h4>
//         <button onClick={this.nothing}>nothing</button>
//         <button onClick={this.other}>修改other</button>
//         <button onClick={this.increment}>+1</button>
//         <br />
//         {/* props不改变就不会重新渲染 */}
//         <Child count={count} name='张三' age='李四' />
//       </div>
//     )
//   }
// }


// class Child extends Component{

//   // 判断props和state是否改变
//   // 没改变就不胡重新渲染
//   shouldComponentUpdate(nextProps,nextState){
//     if(nextProps.count === this.props.count) return false
//     return true
//   }

//   render(){
//     console.log('子组件重新渲染');
//     return (
//       <div>
//         <h5>子组件</h5>
//         <span>props:{Object.keys(this.props).map((prop,index)=><li key={index}>{`${prop}:${this.props[prop]}`}</li>)}</span>
//       </div>
//     )
//   }
// }


// 使用prueComponent，自动检查props和state是否改变
export default class index extends PureComponent {
  state = {
    count:0,
    other:1
  }

  nothing = ()=>{
    this.setState({})
  }

  other = ()=>{
    this.setState({other:this.state.other+1})
  }

  increment = ()=>{
    this.setState({count:this.state.count+1})
  }

  render() {
    const {count,other} = this.state
    console.log('parent组件重新render');
    return (
      <div>
        <h4>结果为：{count}</h4>
        <h4>其他为：{other}</h4>
        <button onClick={this.nothing}>nothing</button>
        <button onClick={this.other}>修改other</button>
        <button onClick={this.increment}>+1</button>
        <br />
        <Child count={count} name='张三' age='李四' />
      </div>
    )
  }
}


class Child extends PureComponent{
  render(){
    console.log('子组件重新渲染');
    return (
      <div>
        <h5>子组件</h5>
        <span>props:{Object.keys(this.props).map((prop,index)=><li key={index}>{`${prop}:${this.props[prop]}`}</li>)}</span>
      </div>
    )
  }
}
