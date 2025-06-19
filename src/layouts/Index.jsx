import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'

const Layout = () => {
  return (
      <div className='flex'>
          <Navbar/>
        <Outlet/>
      </div>
  )
}

export default Layout