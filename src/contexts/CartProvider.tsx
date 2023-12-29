/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren, createContext, useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast';
import axios from '@/api/axios';
import { UseAuthProps } from './AuthProvider';
import useAuth from '@/hooks/useAuth';


const CartContext = createContext({});


export interface UseCartProps {
    cart?: any[] 
    setCart?: React.Dispatch<React.SetStateAction<object>>,
    addToCart?: (id: number, ...args: number[]) => void,
    handleDecrement?: (id: number) => void, 
    handleIncrement?: (id: number) => void, 
    removeFromCart?: (id: number) => void 
}

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

export const CartProvider = ({ children }:PropsWithChildren ) => {
    const [cart, setCart] = useState<any[]>(cartFromLocalStorage)
    const { auth }: UseAuthProps = useAuth();
    const { toast } = useToast()
    

    const addToCart = async(id:number, ...args: number[]) => {
        const itemCount = args[0];
        const contextCart:{ id: number, itemCountCart: number }[] = [];

        console.log("AUTH " + auth.cart)
        
        // const selectedProduct: any = data.find(product => product.id == id);
        const cartProduct = cart.find((product: { id: number }) => product.id == id);
        const res = await axios.get(`product/${id}`)

        console.log(cart);
        console.log(cartProduct);
        if (cartProduct?.id === res.data[0].id) {
          const cartFiltered = cart.filter( prod => prod.id !== id)
          cart.forEach( element => {
            contextCart.push({id: element.id, itemCountCart: element.itemCountCart})
          });
          const contextCartFiltered = contextCart.filter(( prod: {id:number} )=> prod.id !== id)
          console.log(contextCartFiltered);
          
          if (cartProduct.stocks > cartProduct.itemCountCart) {
            if(itemCount){
              if(cartProduct.stocks < cartProduct.itemCountCart + itemCount){
                const cartToPost = {cart: [...contextCartFiltered, {id: cartProduct.id, itemCountCart: cartProduct.stocks}]}
                axios.post(`/username/${auth.username}/cart`, cartToPost)
                .then( res => console.log(res.data.message) )
                .catch( e => console.error(e) )
                setCart([...cartFiltered, {...cartProduct, itemCountCart: cartProduct.stocks}])
                toast({ variant: "destructive", description: "You've achieve the maximum amount of this product!" })
              } else {

                const cartToPost = {cart: [...contextCartFiltered, {id: cartProduct.id, itemCountCart: itemCount + cartProduct.itemCountCart}]}
                axios.post(`/username/${auth.username}/cart`, cartToPost)
                .then(res=> console.log(res.data.message))
                .catch(e=> console.error(e))
                setCart([...cartFiltered, {...cartProduct, itemCountCart:itemCount + cartProduct.itemCountCart}])
                toast({description: "Product(s)  has been added to cart",})
              }
            } else {

              const cartToPost = {cart: [...contextCartFiltered, {id: cartProduct.id, itemCountCart: cartProduct.itemCountCart+1}]}
              axios.post(`/username/${auth.username}/cart`, cartToPost)
              .then(res=> console.log(res.data.message))
              .catch(e=> console.error(e))
              setCart([...cartFiltered, {...cartProduct, itemCountCart: cartProduct.itemCountCart+=1}])

              toast({description: "Product(s)  has been added to cart",})
            }
          } else {
            toast({variant: "destructive", description: "You've achieve the maximum amount of this product!",})
          }
        } else {

          if (itemCount) {
            cart.forEach(element => {
              contextCart.push({id: element.id, itemCountCart: element.itemCountCart})
            });
            const contextCartFiltered = contextCart.filter((prod: {id:number})=> prod.id !== id)
            const cartToPost = {cart: [...contextCartFiltered, {id: id, itemCountCart: itemCount}]}
  
            axios.post(`/username/${auth.username}/cart`, cartToPost)
            .then(res=> console.log(res.data.message))
            .catch(e=> console.error(e))
  
            setCart([...cart, {...res.data[0], itemCountCart:itemCount}])
            toast({description: "Product(s)  has been added to cart",});

          } else {
            cart.forEach(element => {
              contextCart.push({id: element.id, itemCountCart: element.itemCountCart})
            });
            const contextCartFiltered = contextCart.filter((prod: {id:number})=> prod.id !== id)
            const cartToPost = {cart: [...contextCartFiltered, {id: id, itemCountCart: 1}]}

            axios.post(`/username/${auth.username}/cart`, cartToPost)
            .then(res=> console.log(res.data.message))
            .catch(e=> console.error(e))

            setCart([...cart, {...res.data[0], itemCountCart:1}])
            toast({description: "Product(s)  has been added to cart",}) 
          }
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
        // navigate(0)

      }


      const handleIncrement = (id: number) => {
        const contextCart:{id: number, itemCountCart: number}[] = [];
        const cartProduct = cart.find((product: { id: number }) => product.id == id);
        if (cartProduct.id  === id) {
          const cartFiltered = cart.filter((prod)=> prod.id !== id)
          cart.forEach(element => {
            contextCart.push({id: element.id, itemCountCart: element.itemCountCart})
          });
          const contextCartFiltered = contextCart.filter((prod: {id:number})=> prod.id !== id)
          if (cartProduct.stocks > cartProduct.itemCountCart){
            const cartToPost = {cart: [...contextCartFiltered, {id: cartProduct.id, itemCountCart: cartProduct.itemCountCart+1}]}
            axios.post(`/username/${auth.username}/cart`, cartToPost)
            .then(res=> console.log(res.data.message))
            .catch(e=> console.error(e))
            setCart([...cartFiltered, {...cartProduct, itemCountCart: cartProduct.itemCountCart+1}].sort((p1, p2) => (p1.id < p2.id) ? 1 : (p1.id > p2.id) ? -1 : 0))
          } else {
            setCart([...cartFiltered, {...cartProduct, itemCountCart: cartProduct.stocks}].sort((p1, p2) => (p1.id < p2.id) ? 1 : (p1.id > p2.id) ? -1 : 0))
            toast({variant: "destructive", description: "You've achieve the maximum quantity of this product!",})
          }
        }

        // const cartProduct = cart.findIndex((product: { id: number }) => product.id === id);
        // if ( cart[cartProduct]?.id  === id ) {
        //   console.log(cart[cartProduct]);
        //   if (cart[cartProduct].stocks > cart[cartProduct].itemCountCart){
        //     cart[cartProduct].itemCountCart += 1;
        //   } else {
        //     cart[cartProduct].itemCountCart = cart[cartProduct].stocks;
        //     toast({variant: "destructive", description: "You've achieve the maximum quantity of this product!",})
        //   }
        //   setCart([...cart])
        // }
      }
    
      const handleDecrement = (id: number) => {

        const contextCart:{id: number, itemCountCart: number}[] = [];
        const cartProduct = cart.find((product: { id: number }) => product.id == id);
        if (cartProduct.id  === id) {
          const cartFiltered = cart.filter((prod)=> prod.id !== id)
          cart.forEach(element => {
            contextCart.push({id: element.id, itemCountCart: element.itemCountCart})
          });
          const contextCartFiltered = contextCart.filter((prod: {id:number})=> prod.id !== id)
          if (1 < cartProduct.itemCountCart){
            const cartToPost = {cart: [...contextCartFiltered, {id: cartProduct.id, itemCountCart: cartProduct.itemCountCart-1}]}
            axios.post(`/username/${auth.username}/cart`, cartToPost)
            .then(res=> console.log(res.data.message))
            .catch(e=> console.error(e))
            setCart([...cartFiltered, {...cartProduct, itemCountCart: cartProduct.itemCountCart-1}].sort((p1, p2) => (p1.id < p2.id) ? 1 : (p1.id > p2.id) ? -1 : 0))
          } else {
            setCart([...cartFiltered, {...cartProduct, itemCountCart: 1}].sort((p1, p2) => (p1.id < p2.id) ? 1 : (p1.id > p2.id) ? -1 : 0))
          }
        }



        // const cartProduct = cart.findIndex((product: { id: number }) => product.id === id);
        // if ( cart[cartProduct]?.id  === id ) {
        //   console.log(cart[cartProduct]);
        //   if (1 < cart[cartProduct].itemCountCart){
        //     cart[cartProduct].itemCountCart -= 1;
        //   } else {
        //     cart[cartProduct].itemCountCart = 1;
        //   }
        //   setCart([...cart])
        // }
      }
    
      const removeFromCart = (id: number) => {
        const contextCart:{id: number, itemCountCart: number}[] = [];
        cart.forEach(element => {
          contextCart.push({id: element.id, itemCountCart: element.itemCountCart})
        });
        const contextCartFiltered = contextCart.filter((prod: {id:number})=> prod.id !== id)
        const cartFiltered = cart.filter((prod)=> prod.id !== id);

        const cartToPost = {cart: [...contextCartFiltered]}
        axios.post(`/username/${auth.username}/cart`, cartToPost)
        .then(res=> console.log(res.data.message))
        .catch(e=> console.error(e))
        setCart([...cartFiltered])
        toast({variant: "default", description: "Product has been removed from your cart",})





        // const cartProduct = cart.findIndex((product: { id: number }) => product.id === id);
        // if ( cart[cartProduct]?.id  === id ) {
        //   console.log(cart[cartProduct]);
        //   delete cart[cartProduct]
        //   const newCartArr = cart.filter((product: object) => product !== undefined)
        //   setCart([...newCartArr])
        //   console.log(cart)
        // }
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