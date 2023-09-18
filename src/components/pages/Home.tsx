import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard'
import EmblaCarousel from './Carousel/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel-react'
import './Carousel/css/sanbox.css'
import './Carousel/css/embla.css'

import useAxios from '@/hooks/useAxios';

const Home: React.FC = () => {
  const [data, setData] = useState([]);


  const OPTIONS: EmblaOptionsType = { loop: true }
  const SLIDE_COUNT = 3
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  const { response, loading, error } = useAxios({
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
  


  return (
    <>
      <div className="container pt-12">
      <main className="sandbox">
        <section className="sandbox__carousel">
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </section>
      </main>
        <h1 className="text-4xl font-sans font-medium mt-12 mb-3 ml-8">Featured Products</h1>
        <div className="flex flex-wrap justify-center">
          {data.map(({id, name, description, price, ratings, images, quantitySold})=> (
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