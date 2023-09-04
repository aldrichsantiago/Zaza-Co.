import QuantityCounter from "./QuantityCounter"
import { Heart, Trash } from 'lucide-react';
import { Separator } from "./ui/separator";


export interface CartCardProps {
    id?: number
    name: string
    price: number
    ratings?: number
    images: string[] 
    category?: string 
    itemCountCart: number
    handleIncrement: (e:  React.FormEvent)=> void;
    handleDecrement: (e:  React.FormEvent)=> void;
}


const CartProductCard = ({ id, name, price, images, itemCountCart, handleDecrement, handleIncrement }: CartCardProps) => {


  return (
    <>
      <div className="w-full h-44 my-2 flex items-center justify-center relative" key={id}>
        <img src={images?images[0]:""} className="w-2/6 h-3/6 absolute left-5"/>
        <div className="w-2/4 flex flex-col absolute right-5 truncate">
          <p className="text-md font-bold text-ellipsis">{name}</p>
          <p className="text-sm font-medium">${price}</p>
          <QuantityCounter id={id} itemCount={itemCountCart} handleDecrement={handleDecrement} handleIncrement={handleIncrement}/>
          <span className="flex justify-around">
            <span className="flex justify-center items-center w-7 h-7 rounded-full bg-slate-300 hover:bg-slate-400 hover:cursor-pointer active:text-white"><Trash width={18}/></span>
            <span className="flex justify-center items-center w-7 h-7 rounded-full bg-slate-300 hover:bg-slate-400 hover:cursor-pointer active:text-white"><Heart width={18}/></span>

          </span>
        </div>
      </div>
    <Separator></Separator>
    </>
    
  )
}

export default CartProductCard