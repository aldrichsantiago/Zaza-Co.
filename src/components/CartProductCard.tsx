import QuantityCounter from "./QuantityCounter"
import { Heart, Trash } from 'lucide-react';
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "./ui/button";
import useCart from "@/hooks/useCart";
import { UseCartProps } from "@/contexts/CartProvider";
import { useNavigate } from "react-router-dom";


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
    addToWishlist: (id: number) => void;
}


const CartProductCard = ({ id, name, price, images, itemCountCart, handleDecrement, handleIncrement, addToWishlist }: CartCardProps) => {
  const { removeFromCart }: UseCartProps = useCart();
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-44 my-2 flex items-center justify-center relative" key={id}>
        <img src={images?`${import.meta.env.VITE_API_URL}/uploads/`+images[0]:""} className="w-2/6 h-3/6 absolute left-5" onClick={()=>navigate(`/products/${id}`)}/>
        <div className="w-2/4 flex flex-col absolute right-5 truncate">
          <p className="text-md font-bold text-ellipsis" onClick={()=>navigate(`/products/${id}`)}>{name}</p>
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
                {removeFromCart?
                <Button onClick={()=>removeFromCart(id)} variant={"destructive"}>Remove</Button>
                : ""
                }
                
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