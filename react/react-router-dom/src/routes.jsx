import Home from './pages/Home'
import About from './pages/About'
// import News from './components/News'
import Message from './components/Message'
import Detail from './components/Detail'
import { Navigate } from 'react-router-dom'
import {lazy} from 'react'

// 路由懒加载
const News = lazy(()=>import('./components/News.jsx'))

 const routes =[{
  path:'/home',
  element:<Home />
},{
  path:'/about',
  element:<About />,
  children:[{
    path:'news',
    element:<News />
  },{
    path:'message',
    element:<Message />,
    children:[
      {
        // params传参需要写参数
        // path:'detail/:id/:title/:text',
        
        // search和state传参不需要
        path:'detail',
        element:<Detail />
      }
  ]
}]
},{
  path:'/',
  element:<Navigate to='/home' />
}]

export default routes