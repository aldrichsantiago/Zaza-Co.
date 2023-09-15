import React from 'react'
import ProductCard from '../ProductCard'
import { products } from '@/test_data'
import useAuth from '@/hooks/useAuth';
import { UseAuthProps } from '@/contexts/AuthProvider';
import EmblaCarousel from './Carousel/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel-react'
import './Carousel/css/sanbox.css'
import './Carousel/css/embla.css'
import { Button } from '../ui/button';
import useRefreshToken from '@/hooks/useRefreshToken';

const Home: React.FC = () => {
  const { auth }: UseAuthProps = useAuth();
  const refresh = useRefreshToken();

  const OPTIONS: EmblaOptionsType = { loop: true }
  const SLIDE_COUNT = 3
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
    


  return (
    <>
      <div className="container pt-12">
      <main className="sandbox">
        <section className="sandbox__carousel">
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </section>
        <Button onClick={()=>refresh()}>Refresh</Button>
      </main>
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