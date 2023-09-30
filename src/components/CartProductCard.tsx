import QuantityCounter from "./QuantityCounter"
import { Heart, Trash } from 'lucide-react';
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useContext } from "react";
import CartContext from "@/contexts/CartContext";
import { Button } from "./ui/button";
import { UseAuthProps } from "@/contexts/AuthProvider";
import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";


export interface CartCardProps {
    id: number
    name: string
    price: number
    ratings: number
    images: string
    category?: string 
    itemCountCart: number
    handleIncrement: (e:  React.FormEvent)=> void;
    handleDecrement: (e:  React.FormEvent)=> void;
}


const CartProductCard = ({ id, name, price, images, itemCountCart, handleDecrement, handleIncrement }: CartCardProps) => {
  const { auth }: UseAuthProps = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast()
  const cart:any = useContext(CartContext);
  
  const addToWishlist = async(id:number) => {
    if (auth) {
      try {
        console.log(auth.wishlist);
        if(auth){
          const res = await axios.post("/wishlist/user/" + auth.username + "/" + id, id)
          console.log(id);
          toast({
            variant: "default",
            title: res.data.message
          })
        }
      } catch (error) {
        console.log(error);
        return;
      }
    } else{
      navigate("/login");
    }
  }

  return (
    <>
      <div className="w-full h-44 my-2 flex items-center justify-center relative" key={id}>
        <img src={images?`${import.meta.env.VITE_API_URL}/uploads/`+images[0]:""} className="w-2/6 h-3/6 absolute left-5"/>
        <div className="w-2/4 flex flex-col absolute right-5 truncate">
          <p className="text-md font-bold text-ellipsis">{name}</p>
          <p className="text-sm font-medium">${price}</p>
          <QuantityCounter id={id} itemCount={itemCountCart} handleDecrement={handleDecrement} handleIncrement={handleIncrement}/>
          <span className="flex justify-around">

          <Dialog>
            <DialogTrigger>
              <span  className="flex justify-center items-center w-7 h-7 rounded-full bg-slate-300 hover:bg-slate-400 hover:cursor-pointer active:text-white"><Trash width={18}/></span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Remove from your cart</DialogTitle>
                <DialogDescription>
                  This item(s) will be removed from your cart
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={()=>cart.removeFromCart(id)} variant={"destructive"}>Remove</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
            <span onClick={()=>addToWishlist(id)} className="flex justify-center items-center w-7 h-7 rounded-full bg-slate-300 hover:bg-slate-400 hover:cursor-pointer active:text-white"><Heart width={18}/></span>
          </span>
        </div>
      </div>
    <Separator></Separator>
    </>
    
  )
}

export default CartProductCard