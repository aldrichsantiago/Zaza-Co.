import { PropsWithChildren, createContext, useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast';
import useAxios from '@/hooks/useAxios';

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
        
        const selectedProduct: any = data.find(product => product.id == id);
        const cartProduct = cart.find((product: { id: number }) => product.id == id);
    
    
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
            setCart([...cart])
          }else {
            if(itemCount) {
              setCart([...cart, {...selectedProduct, itemCountCart:itemCount}])
            }else {
              setCart([...cart, {...selectedProduct, itemCountCart:1}])
            }
          }
        }
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