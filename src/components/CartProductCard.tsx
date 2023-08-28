import QuantityCounter from "./QuantityCounter"
import { Trash } from 'lucide-react';


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
    <div className="w-full h-44 my-2 bg-slate-200 flex items-center justify-center relative" key={id}>
        <img src={images?images[0]:""} className="w-2/6 h-3/6 absolute left-5"/>
        <div className="w-2/4 flex flex-col absolute right-5 truncate">
          <p className="text-md font-bold text-ellipsis">{name}</p>
          <p className="text-sm font-medium">${price}</p>
          <QuantityCounter id={id} itemCount={itemCountCart} handleDecrement={handleDecrement} handleIncrement={handleIncrement}/>
          <span className="text-slate-400"><Trash width={20}/></span>
        </div>
        


    </div>
  )
}

export default CartProductCard