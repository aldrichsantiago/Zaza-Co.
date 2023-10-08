import useAuth from '@/hooks/useAuth';
import { PropsWithChildren, createContext, useState } from 'react'
import { UseAuthProps } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import axios from '@/api/axios';
import { Product } from '@/components/ProductCard';

const WishlistContext = createContext({});


export interface UseWishlistProps {
    wishlist?: Product
    setWishlist?: React.Dispatch<React.SetStateAction<{}>>,
    addToWishlist?: (id: number) => void
}

const wishlistFromLocalStorage = JSON.parse(localStorage.getItem("wishlist") || "[]");

export const WishlistProvider = ({ children }:PropsWithChildren ) => {
    const [wishlist, setWishlist] = useState<UseWishlistProps>(wishlistFromLocalStorage)
    const { auth }: UseAuthProps = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast()
    
    const addToWishlist = async(id:number) => {
      if (auth) {
        try {
          if(auth){
            


            const res = await axios.post("/wishlist/user/" + auth.username + "/" + id, id)
            console.log(id);
            toast({ title: res.data.message })
          }
        } catch (error) {
          console.log(error);
          toast({ title: JSON.stringify(error) })
          return;
        }
      } else{
        navigate("/login");
      }
    }
    
    return(
        <WishlistContext.Provider value={{ wishlist, setWishlist, addToWishlist }}>
            {children}
        </WishlistContext.Provider>

    )
}

export default WishlistContext