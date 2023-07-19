import React from 'react'
// import { useParams } from 'react-router-dom'
// import { useSearchParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import {useMatch} from 'react-router-dom'
// 是否在路由环境
import {useInRouterContext} from 'react-router-dom'
// 进入路由方式
import {useNavigationType} from 'react-router-dom'
// 是否
import {useOutlet} from 'react-router-dom'
// 解析路由，获得pathname,search,hash
import {useResolvedPath} from 'react-router-dom'


export default function Detail() {
  // 通过useParams获取params参数
  // const {id,title,text} = useParams()

  // 通过useSearchParams获取search参数
  // const [search,setSearch] = useSearchParams()
  // const [id,title,text] = [search.get('id'),search.get('title'),search.get('text')]

  const location = useLocation()
  console.log(location);
  // {"pathname":"/about/message/detail","search":"","hash":"","state":{"id":2,"title":"message2","text":"text2"},"key":"uxu9dfo0"}
  const {state:{id,title,text}} = location
  console.log('useMatch',useMatch('/about/message/detail'));
  console.log('useInRouterContext '+useInRouterContext());
  console.log('useNavigationType '+useNavigationType());
  console.log('useOutlet '+useOutlet());
  console.log('useResolvedPath ',useResolvedPath('/asd?id=1#12'));
  return (
    <div>
      <h5>Detail</h5>
      <h5>{id}--{title}--{text}</h5>

    </div>
  )
}
