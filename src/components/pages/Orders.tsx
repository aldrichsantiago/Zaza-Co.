import useRefreshToken from "@/hooks/useRefreshToken";
import { FC } from "react"

const Orders:FC = () => {

    useRefreshToken();

    
  return (
    <div className="container py-12 w-full bg-slate-300">
        <div className="container">
            Orders
        </div>
    </div>
  )
}

export default Orders