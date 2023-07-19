import React from 'react'
import {NavLink, Outlet} from 'react-router-dom';

export default function Message() {
  const messageList = [
    {id:1,title:'message1',text:'text1'},
    {id:2,title:'message2',text:'text2'},
    {id:3,title:'message3',text:'text3'}
  ]
  return (
    <div>
      <h5>Message</h5>
      {
        messageList.map(m=>{
          // 提供params传参,路由需要接受 detail/:id/:title/:text
          // return <NavLink key={m.id} to={`detail/${m.id}/${m.title}/${m.text}`}>{m.title}</NavLink>

          // search传参
          // return <NavLink key={m.id} to={`detail?id=${m.id}&title=${m.title}&text=${m.text}`}>{m.title}</NavLink>
        
          // state传参
          return <NavLink key={m.id} to='detail' state={{id:m.id,title:m.title,text:m.text}}>{m.title}</NavLink>
        })
      }
      <hr />
      <Outlet />
    </div>
  )
}
