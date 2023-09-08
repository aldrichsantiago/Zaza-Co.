import useRefreshToken from "@/hooks/useRefreshToken";
import { FC } from "react"
import ProductCard from '../ProductCard'
import { products } from '@/test_data'

const Wishlist:FC = () => {

    useRefreshToken();

    
  return (
    <div className="container py-12 w-full">
        <h1 className="font-medium text-2xl">My Wishlist</h1>
        <div className="flex flex-wrap justify-between">
        {products.map(({id, name, description, price, ratings, images, quantitySold})=> (
            <ProductCard key={id}
            id={id} 
            name={name} 
            description={description} 
            price={price} 
            ratings={ratings} 
            images={images}
            quantitySold={quantitySold}
          />
        ))}
        </div>
    </div>
  )
}

export default Wishlist