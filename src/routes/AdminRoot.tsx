import Sidebar from '@/components/admin/Sidebar'
import React from 'react'
import { Toaster } from "@/components/ui/toaster"
import { Outlet } from 'react-router-dom'

const AdminRoot:React.FC = () => {
  return (
    <>
    <div className="flex">
      <Sidebar></Sidebar>
      <Outlet></Outlet>

    </div>
    <Toaster />

    </>
  )
}

export default AdminRoot