import React, { useContext } from 'react'
import { Separator } from "@/components/ui/separator"
import CartContext from '@/contexts/CartContext'

interface QuantityProps {
    id?: number
    itemCount: number
    handleIncrement: (e: React.FormEvent) => void
    handleDecrement: (e: React.FormEvent) => void
}

const QuantityCounter = ({ id, itemCount=0 }: QuantityProps) => {

  const cart:any = useContext(CartContext);

  return (
    <span className='w-36 my-2 flex items-center justify-between rounded-3xl bg-slate-100'>
        <button className='text-lg py-2 px-6 rounded-l-3xl font-semibold hover:bg-slate-300'  type="button" onClick={()=>cart.handleDecrement(id)}>-</button>
        <Separator orientation='vertical'/>
        <span className='my-2 text-lg font-semibold'>{itemCount}</span>
        <Separator orientation='vertical'/>
        <button className='text-lg py-2 px-6 rounded-r-3xl font-semibold hover:bg-slate-300'  type="button" onClick={()=>cart.handleIncrement(id)}>+</button>
    </span>
  )
}

export default QuantityCounter