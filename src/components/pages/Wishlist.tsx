import useRefreshToken from "@/hooks/useRefreshToken";
import { FC } from "react"

const Wishlist:FC = () => {

    useRefreshToken();

    
  return (
    <div className="container py-12 w-full bg-slate-300">
        <div className="container">
            Wishlist
        </div>
    </div>
  )
}

export default Wishlist