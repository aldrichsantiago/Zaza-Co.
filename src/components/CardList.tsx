import React from 'react'
import ProductCard from './ProductCard'

interface DataProps {
  id: number,
  name: string,
  description: string,
  price: number,
  ratings: number,
  images: string[],
  quantitySold: number
}

const CardList = (data:DataProps[]) => {
  return (
    <div className="flex flex-wrap justify-center">
          {data.map(({id, name, description, price, ratings, images, quantitySold}:any)=> (
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
  )
}

export default CardList