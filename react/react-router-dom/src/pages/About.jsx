import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <h4>About</h4>
      <NavLink to='news'>news</NavLink>
      <NavLink to='message'>message</NavLink>
      <hr />
      <Outlet />
    </div>
  )
}
