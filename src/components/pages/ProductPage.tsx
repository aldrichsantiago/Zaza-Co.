import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products } from '@/test_data';
import { Separator } from "@/components/ui/separator"
import QuantityCounter from '../QuantityCounter';
import { Button } from '../ui/button';
import { ShoppingBag, Truck } from 'lucide-react';
import { Rating } from '@smastrom/react-rating';
import { useToast } from "@/components/ui/use-toast"

type ProductParams = {
  productId: string;
};


const ProductPage:React.FC = () => {
  const { productId } = useParams<ProductParams>();
  const [itemCount, setItemCount] = useState<number>(1);
  const { toast } = useToast()

    const handleIncrement = (e: React.FormEvent) => {
        e.preventDefault();
        if(itemCount === products[Number(productId)-1].stocks){
            setItemCount(products[Number(productId)-1].stocks);
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "We only have "+ products[Number(productId)-1].stocks+ " of this product left.",
            })
        } else {
        setItemCount(itemCount+1);
        }
    }
    
    const handleDecrement = (e: React.FormEvent) => {
        e.preventDefault();
        if(itemCount === 1){
            setItemCount(1);
        } else {
        setItemCount(itemCount-1);
        }
    }

  console.log(productId);
  
  return (
    <>
      <div className="container pt-20">
        <p className='text-slate-500'><Link to={`/category/${products[Number(productId)-1].category.toLowerCase()}`} className='text-black hover:underline'>{products[Number(productId)-1].category.toUpperCase()}</Link> / {products[Number(productId)-1].name} </p>

      </div>
      <div className='h-screen pt-10 container flex flex-wrap mb-[300px] sm:mb-[100px]'>
        <div className='md:h-3/5 md:w-3/5 h-auto w-full p-5 rounded-xl bg-slate-100'>
        {products.map(({id, images}) => (
            Number(productId) === id && images ? 
            <div className='w-full h-full flex justify-center items-start' key={id}>
              <img src={images[0]} alt="Image goes here" className='w-3/5'/>
            </div>
            : ``
            ))}
        </div>
        <div className='md:w-2/5 w-full h-4/6 px-5'>
          {products.map(({id, name, description, price, ratings, stocks, quantitySold}) => (
            Number(productId) === id ? 
            <div className='container' key={id}>
              <p className='mb-2 text-4xl font-semibold'>{name}</p>
              <p className='font-medium mb-2'>{description}</p>
              <span className="flex items-center">
                <Rating style={{ maxWidth: 100 }} value={ratings? ratings: 0} readOnly />
                <p className='font-semibold mx-2'>({quantitySold})</p>
              </span>
              
              <Separator className='my-6'/>
              <p className='mb-2 text-2xl font-semibold'>${price} or ${(price/6).toFixed(2)}/month</p>
              <p className='mb-4 text-xs font-medium text-gray-600'>Suggested payments with 6 months special financing</p>
              <Separator className='my-6'/>


              <div className=" w-5/6 flex flex-wrap items-center justify-between">
                <QuantityCounter itemCount={itemCount} handleIncrement={handleIncrement} handleDecrement={handleDecrement}/>
                <span className='font-medium text-sm flex'>Only <p className='text-orange-400 mx-1'>{stocks} items left</p>  in stock!</span>
              </div>
              <div className="w-full py-3 flex flex-wrap items-center justify-start">
                <Button className='w-44 h-11 sm:mr-3 my-2 mr-0 rounded-3xl bg-green-900 hover:bg-green-950 hover:text-white'>Buy Now</Button>
                <Button 
                  className='w-44 h-11 rounded-3xl hover:bg-green-900 hover:text-white' 
                  variant={'outline'} 
                  onClick={() => {toast({description: "Product(s)  has been added to cart",})}}>
                    Add to Cart
                </Button>
              </div>


              <div className="flex flex-col">
                <div className='container w-full py-3 h-auto my-0.5 rounded-sm border'>
                  <div className="flex">
                    <Truck className='text-orange-300'/>
                    <p className='ml-2'>Free Delivery</p>
                  </div>
                  <p className='text-sm my-0.5'><Link to={`#`} className='underline'>Enter your Postal code for Delivery Availability</Link></p>
                </div>
                <div className='container w-full py-3 h-auto my-0.5 rounded-sm border'>
                  <div className="flex">
                    <ShoppingBag className='text-orange-300'/>
                    <p className='ml-2'>Return Delivery</p>
                  </div>
                  <p className='text-sm my-0.5'>Free 30 days Delivery Returns. <Link to={`#`} className='underline'>Details</Link></p>
                </div>
              </div>
            </div>

            : ``
            ))}

        </div>

      </div>
    </>
  )
}

export default ProductPage