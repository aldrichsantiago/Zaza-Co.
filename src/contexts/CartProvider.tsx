import { PropsWithChildren, createContext, useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast';
import useAxios from '@/hooks/useAxios';
import { Product } from '@/components/ProductCard';
import axios from '@/api/axios';

const CartContext = createContext({});


export interface UseCartProps {
    cart?: any[] 
    setCart?: React.Dispatch<React.SetStateAction<{}>>,
    addToCart?: (id: number, ...args: number[]) => void,
    handleDecrement?: (id: number) => void, 
    handleIncrement?: (id: number) => void, 
    removeFromCart?: (id: number) => void 
}

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

export const CartProvider = ({ children }:PropsWithChildren ) => {
    const [cart, setCart] = useState<any[]>(cartFromLocalStorage)
    const [contextCart, setContextCart] = useState<any[]>([])
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
    

    const addToCart = async(id:number, ...args: number[]) => {
        let itemCount = args[0];
        
        // const selectedProduct: any = data.find(product => product.id == id);
        const cartProduct = cart.find((product: { id: number }) => product.id == id);
        const res = await axios.get(`product/${id}`)
        console.log(res.data[0]);

        console.log(cart);
        console.log(cartProduct);
        if (cartProduct?.id === res.data[0].id) {
          let cartFiltered = cart.filter((prod)=> prod.id !== id)
          if (cartProduct.stocks > cartProduct.itemCountCart){
            if(itemCount){
              if(cartProduct.stocks < cartProduct.itemCountCart + itemCount){
                setCart([...cartFiltered, {...cartProduct, itemCountCart: cartProduct.stocks}])
                toast({variant: "destructive", description: "You've achieve the maximum amount of this product!",})
              } else {
                setCart([...cartFiltered, {...cartProduct, itemCountCart: cartProduct.itemCountCart+itemCount }])
                toast({description: "Product(s)  has been added to cart",})
              }
            } else {
              setCart([...cartFiltered, {...cartProduct, itemCountCart: cartProduct.itemCountCart+=1}])
              toast({description: "Product(s)  has been added to cart",})
            }
          } else {
            toast({variant: "destructive", description: "You've achieve the maximum amount of this product!",})
          }
          console.log(cartFiltered);
        } else {
          console.log("this ran");
          setCart([...cart, {...res.data[0], itemCountCart:1}])
        }

        // if(selectedProduct.id === id){
        //   if ( cartProduct?.id  === id ) {
        //     if (cartProduct.stocks > cartProduct.itemCountCart){
        //       if(itemCount){
        //         if(cartProduct.stocks < cartProduct.itemCountCart + itemCount){
        //           cartProduct.itemCountCart = cartProduct.stocks;
        //           toast({variant: "destructive", description: "You've achieve the maximum amount of this product!",})
        //         } else {
        //         cartProduct.itemCountCart += itemCount;
        //         }
        //       } else {
        //         cartProduct.itemCountCart += 1;
        //       }
        //       toast({description: "Product(s)  has been added to cart",})
        //     } else {
        //       cartProduct.itemCountCart = cartProduct.stocks;
        //       toast({variant: "destructive", description: "You've achieve the maximum amount of this product!",})
        //     }
        //     setCart([...cart])
        //   }else {
        //     if(itemCount) {
        //       setCart([...cart, {...selectedProduct, itemCountCart:itemCount}])
        //     }else {
        //       setCart([...cart, {...selectedProduct, itemCountCart:1}])
        //     }
        //   }
        // }



      }


      const handleIncrement = (id: number) => {
        const cartProduct = cart.findIndex((product: { id: number }) => product.id === id);
        if ( cart[cartProduct]?.id  === id ) {
          console.log(cart[cartProduct]);
          if (cart[cartProduct].stocks > cart[cartProduct].itemCountCart){
            cart[cartProduct].itemCountCart += 1;
          } else {
            cart[cartProduct].itemCountCart = cart[cartProduct].stocks;
            toast({variant: "destructive", description: "You've achieve the maximum quantity of this product!",})
          }
          setCart([...cart])
        }
      }
    
      const handleDecrement = (id: number) => {
        const cartProduct = cart.findIndex((product: { id: number }) => product.id === id);
        if ( cart[cartProduct]?.id  === id ) {
          console.log(cart[cartProduct]);
          if (1 < cart[cartProduct].itemCountCart){
            cart[cartProduct].itemCountCart -= 1;
          } else {
            cart[cartProduct].itemCountCart = 1;
          }
          setCart([...cart])
        }
      }
    
      const removeFromCart = (id: number) => {
        const cartProduct = cart.findIndex((product: { id: number }) => product.id === id);
        if ( cart[cartProduct]?.id  === id ) {
          console.log(cart[cartProduct]);
          delete cart[cartProduct]
          const newCartArr = cart.filter((product: object) => product !== undefined)
          setCart([...newCartArr])
          console.log(cart)
        }
      } 

      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])

    
    return(
        <CartContext.Provider 
        value={{ 
            cart, 
            setCart, 
            addToCart, 
            handleDecrement, 
            handleIncrement, 
            removeFromCart 
        }}>
            {children}
        </CartContext.Provider>

    )
}

export default CartContext