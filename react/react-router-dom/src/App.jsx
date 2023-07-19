import React from 'react'
// import {NavLink,Routes,Route,Navigate} from 'react-router-dom';
import {NavLink, useNavigate, useRoutes} from 'react-router-dom';

import {Suspense} from 'react'
// import About from './pages/About'
// import Home from './pages/Home'
import routes from './routes'
import './App.css'

export default function App() {
  const element = useRoutes(routes)

  function computeClassName(c){
    const {isActive} = c
    return isActive ? 'menu bgc' : 'menu'
  }

  const navigate = useNavigate()
  function goback(){
    navigate(-1)
  }
  function forward(){
    navigate(1)
  }
  function goDetail(){
    navigate('about/message/detail',{
      replace:false,
      state:{id:123,title:'编程式路由导航',text:'编程式路由导航'}
    })
  }
  return (
    <div>
      <div>
        <button onClick={goback}>后退</button>
        <button onClick={forward}>前进</button>
        <button onClick={goDetail}>去/about/message/detail</button>
      </div>
      <div>
        导航：
        {/* 不使用函数，当前显示的类名会多一个active */}
        {/* 为函数时，类名则为返还的字符串 */}
        <NavLink className={computeClassName} to="/about">about</NavLink>
        <NavLink className={computeClassName} to="/home">home</NavLink>
      </div>
      <hr />
      组件：
      {/* <Routes>
        <Route path='/about' element={<About />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/' element={<Navigate to="/home" />}></Route>
      </Routes> */}
      {/* 使用路由表 */}
      <Suspense fallback={<h1>loading</h1>}>
        {element}
      </Suspense>
    </div>
  )
}
