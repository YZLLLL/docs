import React, { Component,createContext } from 'react'
import './index.css'

const MyContext = createContext()
// 父组件
export default class Demo extends Component {
  state = {
    name:'张三',
    age:18
  }
  render() {
    const {name,age} = this.state
    return (
      <div className='parent'>
        {/* 传入的props必须是 value */}
        <MyContext.Provider value={{name,age}}>
          <h4>parent</h4>
          <Child />
        </MyContext.Provider>
      </div>
    )
  }
}

// 子组件
 class Child extends Component {
  render() {
    return (
      <div className='child'>
        <h5>child</h5>
        <Grand />
      </div>
    )
  }
}

// 孙组件
// 第一种方式
 class Grand extends Component {
  // 声明contextType之后就可以在this.context拿到MyContext.Provider传入的value
  static contextType = MyContext
  render() {
    const {name,age} = this.context
    return (
      <div className='grand'>
        <h6>grand</h6>
        {name}---{age}
        </div>
    )
  }
}

// 第二种方式
// class Grand extends Component {
//   render() {
//     return (
//       <div className='grand'>
//         <h6>grand</h6>
//         {/* 使用MyContext.Consumer，方法传入的就是MyContext.Provider传入的value */}
//         <MyContext.Consumer>
//           {
//             value => {
//               return <div>{value.name}-----{value.age}</div>
//             }
//           }
//         </MyContext.Consumer>
//         </div>
//     )
//   }
// }
