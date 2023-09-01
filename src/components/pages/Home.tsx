import React from 'react'
import ProductCard from '../ProductCard'
import { products } from '@/test_data'
import useRefreshToken from '@/hooks/useRefreshToken'

const Home: React.FC = () => {
  const  { token, username, expire, loading, error }  = useRefreshToken();
  console.log(token);



  return (
    <>
      <div className="container pt-12">
        <div className="bg-slate-200 w-full h-96 my-5">
        </div>
        <h1 className="text-4xl font-sans font-medium mt-12 mb-3 ml-8">Featured Products</h1>
        <div className="flex flex-wrap justify-center">
          {products.map(({id, name, description, price, ratings, images, quantitySold})=> (
            <ProductCard key={id}
             id={id} 
             name={name} 
             description={description} 
             price={price} 
             ratings={ratings} 
             images={images}
             quantitySold={quantitySold}/>
          ))}

        </div>
      </div>

    </>
  )
}

export default Home