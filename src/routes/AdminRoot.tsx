import Sidebar from '@/components/admin/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminRoot:React.FC = () => {
  return (
    <>
    <div className="flex">
      <Sidebar></Sidebar>
      <Outlet></Outlet>
    </div>
    </>
  )
}

export default AdminRoot