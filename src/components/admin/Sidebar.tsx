import React from 'react'
import { LayoutDashboard, Settings, Users, ScrollText, ShoppingBasket, LogOut, LogOutIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../ui/use-toast';
import axios from "axios"

import { UseAuthProps } from '@/contexts/AuthProvider';
import useAuth from '@/hooks/useAuth';
import useCart from '@/hooks/useCart';
import { UseCartProps } from '@/contexts/CartProvider';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const {toast} = useToast();
    const {setAuth}:UseAuthProps = useAuth();
    const {cart, setCart}:UseCartProps = useCart();


    const Logout = () => {
        try {
            axios.delete(`${import.meta.env.VITE_API_URL}/logout`)
            .then(() => {
                localStorage.setItem('cart', JSON.stringify([]))
                setAuth? setAuth({}) : ""
                setCart? setCart([]) : ""
                navigate("/login");
                toast({
                    description: "You've logged out",
                    variant: "destructive"
                });


            })
            
            .catch (error => {
                console.log(error.response.data.message)
            });
            localStorage.setItem('cart', JSON.stringify([]))
            setAuth? setAuth({}) : ""
            setCart? setCart([]) : ""
            navigate("/login");
            toast({
                description: "You've logged out",
                variant: "destructive"
            });

            


        } catch (error) {   
            console.log(error);
        }
    }
    console.log(cart)


  return (
    <>
        <div className='w-full sm:w-1/6 h-screen py-8 bg-slate-50 flex flex-col items-center justify-between'>
            <div>

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
                    
                    <Link to={"/admin/orders"} className='mx-1 w-full text-2xl py-6 hover:bg-slate-100'>
                        <div className='w-full flex items-center justify-left'>
                            <ScrollText className='mx-5'/>
                            <p>Orders</p>
                        </div>
                    </Link>
                    <Link to={"/admin/users"} className='mx-1 w-full text-2xl py-6 hover:bg-slate-100'>
                        <div className='w-full flex items-center justify-left'>
                            <Users className='mx-5'/>
                            <p>Users</p>
                        </div>
                    </Link>
                    <Link to={"/admin/products"} className='mx-1 w-full text-2xl py-6 hover:bg-slate-100'>
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

            <div>
                <div className='mx-1 w-full text-2xl py-6 hover:bg-slate-100 hover:cursor-pointer' onClick={Logout}>
                    <div className='w-full flex items-center justify-left'>
                        <LogOutIcon className='mx-5'/>
                        <p>Logout</p>
                    </div>
                </div>
            </div>
            
            
            


        </div>
    </>

  )
}

export default Sidebar