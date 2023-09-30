import useRefreshToken from "@/hooks/useRefreshToken";
import { FC, useEffect, useState } from "react"
import ProductCard from '../ProductCard'
import useAxios from "@/hooks/useAxios";
import useAuth from "@/hooks/useAuth";
import { UseAuthProps } from "@/contexts/AuthProvider";

  interface WishlistProductsInterface {
    id: number
    name: string
    description: string
    price: number
    ratings: number
    images: string[]
    quantitySold: number
  }

const Wishlist:FC = () => {
  const { auth }:UseAuthProps = useAuth();
  const [data, setData] = useState([]);
  const wishlistIds: number[] = auth?.wishlist;
  const wishlistProducts:any = [];

  useRefreshToken();
  const { response  } = useAxios({
    method: 'get',
    url: '/products',
    headers: JSON.stringify({ accept: '*/*' }),
  });

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);
  console.log(data);

  for (const w of wishlistIds) {
    const product = data.find((p:{id:number}) => p.id === w);
    if (product === undefined) {
      return;
    } else {
      wishlistProducts.push(product)
    }
  }


  
  return (
    <div className="container py-12 w-full">
        <h1 className="font-medium text-2xl">My Wishlist</h1>
        <div className="flex flex-wrap justify-between">
        {wishlistProducts?.map(({id, name, description, price, ratings, images, quantitySold}:WishlistProductsInterface)=> (
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