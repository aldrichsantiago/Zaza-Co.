import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import CartContext from "@/contexts/CartContext"
import useAxios from "@/hooks/useAxios"



const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")

function Root() {
  const [cartArray, setCartArray]: any = useState(cartFromLocalStorage);
  const { toast } = useToast()
  const { response } = useAxios({
    method: 'get',
    url: '/products',
    headers: JSON.stringify({ accept: '*/*' })
  });
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    if (response !== null) {
        setData(response);
    }
  }, [response]);

  const addToCart = (id:number, ...args: number[]) => {
    let itemCount = args[0];
    console.log(itemCount);
    
    const selectedProduct: any = data.find(product => product.id == id);
    console.log(selectedProduct)
    const cartProduct = cartArray.find((product: { id: number }) => product.id == id);
    console.log("cartProduct",cartProduct);
    console.log("cartArray",cartArray);

    if(selectedProduct.id === id){
      if ( cartProduct?.id  === id ) {
        if (cartProduct.stocks > cartProduct.itemCountCart){
          if(itemCount){
            if(cartProduct.stocks < cartProduct.itemCountCart + itemCount){
              cartProduct.itemCountCart = cartProduct.stocks;
              toast({variant: "destructive", description: "You've achieve the maximum amount of this product!",})
            } else {
            cartProduct.itemCountCart += itemCount;
            }
          } else {
            cartProduct.itemCountCart += 1;
          }
          toast({description: "Product(s)  has been added to cart",})
        } else {
          cartProduct.itemCountCart = cartProduct.stocks;
          toast({variant: "destructive", description: "You've achieve the maximum amount of this product!",})
        }
        setCartArray([...cartArray])
      }else {
        if(itemCount) {
          setCartArray([...cartArray, {...selectedProduct, itemCountCart:itemCount}])
        }else {
          setCartArray([...cartArray, {...selectedProduct, itemCountCart:1}])
        }
      }
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
