import React from 'react'
import { Separator } from "@/components/ui/separator"
import { UseCartProps } from '@/contexts/CartProvider'
import useCart from '@/hooks/useCart'

interface QuantityProps {
    id?: number
    itemCount: number
    handleIncrement?: (e: React.FormEvent) => void
    handleDecrement?: (e: React.FormEvent) => void
}

const QuantityCounter = ({ id, itemCount=0 }:QuantityProps) => {

  const { handleDecrement, handleIncrement }: UseCartProps = useCart();

  return (
    <span className='w-36 my-2 flex items-center justify-between rounded-3xl bg-slate-100'>
        <button className='text-lg py-2 px-6 rounded-l-3xl font-semibold hover:bg-slate-300'  type="button" onClick={()=>handleDecrement?handleDecrement(id?id:0):""}>-</button>
        <Separator orientation='vertical'/>
        <span className='my-2 text-lg font-semibold'>{itemCount}</span>
        <Separator orientation='vertical'/>
        <button className='text-lg py-2 px-6 rounded-r-3xl font-semibold hover:bg-slate-300'  type="button" onClick={()=>handleIncrement?handleIncrement(id?id:0):""}>+</button>
    </span>
  )
}

export default QuantityCounter


export const ProductQuantityCounter = ({ itemCount=0, handleDecrement, handleIncrement }: QuantityProps) => {
  return (
    <span className='w-36 my-2 flex items-center justify-between rounded-3xl bg-slate-100'>
        <button className='text-lg py-2 px-6 rounded-l-3xl font-semibold hover:bg-slate-300'  type="button" onClick={handleDecrement}>-</button>
        <Separator orientation='vertical'/>
        <span className='my-2 text-lg font-semibold'>{itemCount}</span>
        <Separator orientation='vertical'/>
        <button className='text-lg py-2 px-6 rounded-r-3xl font-semibold hover:bg-slate-300'  type="button" onClick={handleIncrement}>+</button>
    </span>
  )
}

