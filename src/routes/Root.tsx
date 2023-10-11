import { Outlet } from "react-router-dom"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/contexts/CartProvider"


function Root() {
  

  return (
    <>
      <CartProvider>
        <Navbar/>
        <Outlet/>
        <Footer/>
        <Toaster />
      </CartProvider>  
    </>
  )
}


export default Root
