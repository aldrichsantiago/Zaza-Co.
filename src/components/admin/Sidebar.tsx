import React from 'react'
import { LayoutDashboard, Settings, Users, ScrollText, ShoppingBasket } from 'lucide-react';
import { Link } from 'react-router-dom';
// import useAuth from '@/hooks/useAuth';
// import { UseAuthProps } from '@/contexts/AuthProvider';
import useRefreshToken from '@/hooks/useRefreshToken';

const Sidebar: React.FC = () => {
    // const refresh = useRefreshToken();
    // const { auth, setAuth }: UseAuthProps = useAuth();

    // useEffect(()=>{
    //     setAuth? setAuth({token, username, roles:[...role]}): console.log("setAuth is null")
    //     console.log(auth);
    // },[token])

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
                <Link to={"/admin/analytics"} className='mx-1 w-full text-2xl py-6 hover:bg-slate-100'>
                    <div className='w-full flex items-center justify-left'>
                        <ShoppingBasket className='mx-5'/>
                        <p>Products</p>
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