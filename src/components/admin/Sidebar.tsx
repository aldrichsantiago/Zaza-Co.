import React from 'react'
import { LayoutDashboard, Settings, Users, ScrollText, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <>
        <div className='w-full sm:w-1/6 h-screen py-8 bg-slate-50 flex flex-col items-center justify-start'>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl text-green-900 mb-12">
            Zaza Co.
        </h1>
            
            <div className="w-full flex flex-col text-left">
                <Link to={"/admin/dashboard"} className='mx-1 w-full text-2xl py-6 hover:bg-slate-100'>
                    <div className='w-full flex items-center justify-left'>
                        <LayoutDashboard className='mx-5'/>
                        <p>Dashboard</p>
                    </div>
                </Link>
                <Link to={"/admin/analytics"} className='mx-1 w-full text-2xl py-6 hover:bg-slate-100'>
                    <div className='w-full flex items-center justify-left'>
                        <BarChart3 className='mx-5'/>
                        <p>Analytics</p>
                    </div>
                </Link>
                <Link to={"/admin/logs"} className='mx-1 w-full text-2xl py-6 hover:bg-slate-100'>
                    <div className='w-full flex items-center justify-left'>
                        <ScrollText className='mx-5'/>
                        <p>Logs</p>
                    </div>
                </Link>
                <Link to={"/admin/users"} className='mx-1 w-full text-2xl py-6 hover:bg-slate-100'>
                    <div className='w-full flex items-center justify-left'>
                        <Users className='mx-5'/>
                        <p>Users</p>
                    </div>
                </Link>
                <Link to={"/admin/settings"} className='mx-1 w-full text-2xl py-6 hover:bg-slate-100'>
                    <div className='w-full flex items-center justify-left'>
                        <Settings className='mx-5'/>
                        <p>Settings</p>
                    </div>
                </Link>
                
            </div>


        </div>
    </>

  )
}

export default Sidebar