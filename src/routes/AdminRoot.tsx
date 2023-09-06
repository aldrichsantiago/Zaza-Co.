import Sidebar from '@/components/admin/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminRoot:React.FC = () => {
  return (
    <>
      <Sidebar></Sidebar>
      <Outlet></Outlet>

    </>
  )
}

export default AdminRoot