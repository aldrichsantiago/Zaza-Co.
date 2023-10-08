import { useContext } from 'react'
import WishlistContext from '@/contexts/WishlistProvider'

const useWishlist = () => {
  return useContext(WishlistContext);
}

export default useWishlist;