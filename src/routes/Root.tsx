import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import CartContext from "@/contexts/CartContext"
import {products} from"../test_data"



const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")

function Root() {
  const [cartArray, setCartArray]: any = useState(cartFromLocalStorage);
  const { toast } = useToast()


  const addToCart = (id:number) => {
    const selectedProduct = products.findIndex(product => product.id === id);
    const cartProduct = cartArray.findIndex((product: { id: number }) => product.id === id);

    if ( cartArray[cartProduct]?.id  === id ) {
      console.log(cartArray[cartProduct]);
      if (cartArray[cartProduct].stocks > cartArray[cartProduct].itemCountCart){
        cartArray[cartProduct].itemCountCart += 1;
        toast({description: "Product(s)  has been added to cart",})
      } else {
        cartArray[cartProduct].itemCountCart = cartArray[cartProduct].stocks;
        toast({variant: "destructive", description: "You've achieve the maximum amount of this product!",})
      }
      setCartArray([...cartArray])
    } else{
    setCartArray([...cartArray, {...products[selectedProduct], itemCountCart:1}])
    console.log(cartArray);
    }
  }

  const handleIncrement = (id: number) => {
    const cartProduct = cartArray.findIndex((product: { id: number }) => product.id === id);
    if ( cartArray[cartProduct]?.id  === id ) {
      console.log(cartArray[cartProduct]);
      if (cartArray[cartProduct].stocks > cartArray[cartProduct].itemCountCart){
        cartArray[cartProduct].itemCountCart += 1;
      } else {
        cartArray[cartProduct].itemCountCart = cartArray[cartProduct].stocks;
        toast({variant: "destructive", description: "You've achieve the maximum quantity of this product!",})
      }
      setCartArray([...cartArray])
    }
  }

  const handleDecrement = (id: number) => {
    const cartProduct = cartArray.findIndex((product: { id: number }) => product.id === id);
    if ( cartArray[cartProduct]?.id  === id ) {
      console.log(cartArray[cartProduct]);
      if (1 < cartArray[cartProduct].itemCountCart){
        cartArray[cartProduct].itemCountCart -= 1;
      } else {
        cartArray[cartProduct].itemCountCart = 1;
      }
      setCartArray([...cartArray])
    }
  }

  const removeFromCart = (id: number) => {
    const cartProduct = cartArray.findIndex((product: { id: number }) => product.id === id);
    if ( cartArray[cartProduct]?.id  === id ) {
      console.log(cartArray[cartProduct]);
      delete cartArray[cartProduct]
      const newCartArr = cartArray.filter((product: object) => product !== undefined)
      setCartArray([...newCartArr])
      console.log(cartArray)
    }
  }  

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartArray))
  }, [cartArray])


  const cartContextValues = {
    cartArray,
    addToCart,
    handleIncrement,
    handleDecrement,
    removeFromCart
  }
  

  return (
    <>
      <CartContext.Provider value={cartContextValues}>
        <Navbar/>
        <Outlet/>
        <Footer/>
        <Toaster />
      </CartContext.Provider>      
    </>
  )
}


export default Root
