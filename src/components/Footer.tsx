import React from 'react'
import Visa from '../assets/visa-logo.png'
import Mastercard from '../assets/mastercard-logo.jpg'
import Maya from '../assets/maya-logo.jpg'
import Gcash from '../assets/gcash-logo.png'
import Paypal from '../assets/paypal-logo.png'
import Fedex from '../assets/fedex-logo.png'
import Ninjavan from '../assets/ninjavan-logo.png'
import Lbc from '../assets/lbc-logo.png'
import Jt from '../assets/jt-logo.png'
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <>
        <footer className='bg-slate-100 w-full h-auto mt-2'>
            <div className="container flex justify-between w-full h-full">

                <div>
                    <div className="p-6">
                        <h1 className="text-md font-medium">Accepted Payments</h1>
                        <div className="flex items-center flex-wrap">
                            <img className='m-1 rounded-lg' src={Visa} width={75}/>
                            <img className='m-1 rounded-lg' src={Mastercard} width={65}/>
                            <img className='m-1 rounded-lg h-12' src={Paypal} width={75}/>
                            <img className='m-1 rounded-lg h-12' src={Maya} width={75}/>
                            <img className='m-1 rounded-lg h-12' src={Gcash} width={75}/>
                        </div>
                    </div>
                    <div className="p-6">
                        <h1 className="text-md font-medium">Delivery Partners</h1>
                        <div className="flex items-center flex-wrap">
                            <img className='m-1 rounded-lg' src={Fedex} width={75}/>
                            <img className='m-1 rounded-lg' src={Jt} width={75}/>
                            <img className='m-1 rounded-lg' src={Lbc} width={60}/>
                            <img className='m-1 rounded-lg h-12' src={Ninjavan} width={75}/>
                        </div>
                    </div>
                </div>

                <div className='p-6'>
                    <h1 className="text-md font-medium ml-5 mb-2">Socials</h1>
                    <div className='flex flex-wrap mb-20'>
                        <Button className="hover:text-blue-800" variant="link">
                            <Link to="https:\\www.facebook.com"><Facebook /></Link>
                        </Button>
                        <Button className="hover:text-blue-400" variant="link">
                            <Link to="https:\\www.twitter.com"><Twitter /></Link>
                        </Button>
                        <Button className="hover:text-fuchsia-800" variant="link">
                            <Link to="https:\\www.instagram.com"><Instagram /></Link>
                        </Button>
                        <Button className="hover:text-red-700" variant="link">
                            <Link to="https:\\www.youtube.com"><Youtube /></Link>
                        </Button>
                    </div>
                    <div className='flex flex-wrap'>
                        <Button variant="link">
                            <Link to="/about-us">About Us</Link>           
                        </Button>
                        <Button variant="link">
                            <Link to="/careers">Careers</Link>
                        </Button>
                        <Button variant="link">
                            <Link to="/help-center">Help Center</Link>
                        </Button>
                        <Button variant="link">
                            <Link to="/faqs">FAQs</Link>

                        </Button>
                    </div>
                    <h1 className='text-md mx-4'>© Zaza Co. 2023. All Rights Reserved</h1>
                </div>

            </div>
        </footer>
    </>
  )
}

export default Footer