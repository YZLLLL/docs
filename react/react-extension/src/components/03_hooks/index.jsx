import React, {Fragment,useRef,useState,useEffect } from 'react'
import ReactDOM from 'react-dom'
import {nanoid} from 'nanoid'
import { createRoot } from 'react-dom/client'

export default function Demo(){
  // useState 传入初始值，返回state和操作state的方法
  // 操作state的方法默认传入state
  const [count,setCount] = useState(0)
  const [persons,setPersons] = useState([])

  const increment = ()=>{
    setCount(count=>count+1)
  }

  // useRef
  const nameNode = useRef()
  const ageNode = useRef()

  const addPerson = ()=>{
    const name = nameNode.current.value
    const age = ageNode.current.value
    setPersons(persons=>[{id:nanoid(),name,age},...persons])
    nameNode.current.value = ''
    ageNode.current.value = ''
  }

  const [time,setTime] = useState(new Date().toLocaleTimeString())
  useEffect(() => {
    // 挂载和更新的回调
    let effect = setInterval(()=>{
      setTime(new Date().toLocaleTimeString())
    },1000)
    return () => {
      // 卸载后的回调
      clearInterval(effect)
    };
  },
  // 检测更新的数组，不传为所有state,[]数组代表不检测 
  []
  );

  const unmount= ()=>{
    const root = createRoot(document.getElementById('root'))
    root.unmount()
  }

    return (
      <Fragment>
        <h4>结果为：{count}</h4>
        <button onClick={increment}>+1</button>
        <hr />
        姓名<input type="text" ref={nameNode} />&nbsp;
        年龄<input type="text" ref={ageNode} />&nbsp;
        <button onClick={addPerson}>添加</button>
        {
          persons.map(person=>{
            return <li key={person.id}>{person.name}--{person.age}</li>
          })
        }
        <br />
        <span>现在是北京时间：{time}</span>
        <button onClick={unmount}>销毁组件</button>
      </Fragment>
    )
}
