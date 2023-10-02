import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Separator } from "@/components/ui/separator"
import { ProductQuantityCounter } from '../QuantityCounter';
import { Button } from '../ui/button';
import { ShoppingBag, Truck } from 'lucide-react';
import { Rating } from '@smastrom/react-rating';
import { useToast } from "@/components/ui/use-toast"
import { EmblaOptionsType } from 'embla-carousel-react';
import ProductCarousel from './Carousel/ProductCarousel';
import './Carousel/css/productCaroursel/embla.css'
import useAxios from '@/hooks/useAxios';
import CartContext from '@/contexts/CartContext';

type ProductParams = {
  productId: string;
};


const ProductPage:React.FC = () => {
  const { productId } = useParams<ProductParams>();
  const [itemCount, setItemCount] = useState<number>(1);
  const { toast } = useToast()
  const [data, setData]:any = useState([]);
  const { response }:any = useAxios({
    method: 'get',
    url: '/product/'+ productId,
    headers: JSON.stringify({ accept: '*/*' }),
    
  });

  useEffect(() => {
    if (response !== null || response !== undefined) {
      setData(response);
    }
  }, [response]);
  

  const selectedProduct: any = response?.find((p:any)=>{return p.id === Number(productId)})  


  const OPTIONS: EmblaOptionsType = {}
  const SLIDE_COUNT = selectedProduct?.images.length
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


    const handleIncrement = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedProduct = data.find((product: { id: string | undefined; })=> product.id == productId)
        
        if(itemCount === selectedProduct.stocks){
            setItemCount(selectedProduct.stocks);
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "We only have "+ selectedProduct.stocks+ " of this product left.",
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

    const cart:any = useContext(CartContext);

    console.log(data)
  return (
    <>
      <div className="container pt-20">
      <p className='text-slate-500'>
        {/* {data?.map(({category, name}:any) => {
        <>
          <Link to={`/category/${category.toLowerCase()}`} className='text-black hover:underline'>
            {category.toUpperCase()}
          </Link> / {name} 
        </>
        })} */}

        {data ? 
        <>
          <Link to={`/category/${data[0]?.category.toLowerCase()}`} className='text-black hover:underline'>
            {data[0]?.category.toUpperCase()}
          </Link> / {data[0]?.name}
        </>
        :
        <></>}
      </p>

      </div>
      <div className='h-screen pt-10 container flex flex-wrap mb-[300px] sm:mb-[100px]'>
        <div className='md:h-3/5 md:w-3/5 h-auto w-full p-5 rounded-xl '>
            <div className='max-w-5/6 flex justify-center items-start'>
              {/* <img src={images[0]} alt="Image goes here" className='w-3/5'/> */}
              <main className="sandbox">
                <section className="sandbox__carousel">
                  {response ? <ProductCarousel slides={SLIDES} options={OPTIONS} images={response[0].images}/> : ""}
                </section>
              </main>
            </div>
        </div>
        <div className='md:w-2/5 w-full h-4/6 px-5'>
          {data?.map(({id, name, description, price, ratings, stocks, quantitySold}:{id:number, name:string, description:string, price:number, ratings:number, stocks:number, quantitySold:number}) => (
            Number(productId) === id ? 
            <div className='container' key={id}>
              <p className='mb-2 text-4xl font-semibold'>{name}</p>
              <p className='text-slate-600 mb-2 max-w-prose'>{description}</p>
              <span className="flex items-center">
                <Rating style={{ maxWidth: 100 }} value={ratings? ratings: 0} readOnly />
                <p className='font-semibold mx-2'>({quantitySold})</p>
              </span>
              
              <Separator className='my-6'/>
              <p className='mb-2 text-2xl font-semibold'>${price} or ${(price/6).toFixed(2)}/month</p>
              <p className='mb-4 text-xs font-medium text-gray-600'>Suggested payments with 6 months special financing</p>
              <Separator className='my-6'/>


              <div className=" w-5/6 flex flex-wrap items-center justify-between">
                <ProductQuantityCounter itemCount={itemCount} handleIncrement={handleIncrement} handleDecrement={handleDecrement}/>
                <span className='font-medium text-sm flex'>Only <p className='text-orange-400 mx-1'>{stocks} items left</p>  in stock!</span>
              </div>
              <div className="w-full py-3 flex flex-wrap items-center justify-start">
                <Button className='w-44 h-11 sm:mr-3 my-2 mr-0 rounded-3xl bg-green-900 hover:bg-green-950 hover:text-white'>Buy Now</Button>
                <Button 
                  className='w-44 h-11 rounded-3xl hover:bg-green-900 hover:text-white' 
                  variant={'outline'} 
                  onClick={()=>cart.addToCart(id, itemCount)}>
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