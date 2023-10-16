import React, { useEffect, useState } from 'react'
import EmblaCarousel from './Carousel/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel-react'
import useAxios from '@/hooks/useAxios';
import CardList from '../CardList';

const DealsPage:React.FC = () => {
  const [data, setData]: any= useState([]);

  const OPTIONS: EmblaOptionsType = { loop: true }
  const SLIDE_COUNT = 3
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  const { response } = useAxios({
    method: 'get',
    url: '/deals/products',
    headers: JSON.stringify({ accept: '*/*' }),
  });

  useEffect(() => {
    if (response !== null) {
        setData(response);
    }
  }, [response]);
    
  return (
    <>
        <div className='container w-full pt-12'>

        <main className="sandbox">
          <section className="sandbox__carousel">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          </section>
        </main>

        <h1 className="text-4xl font-sans font-medium mt-12 mb-3 ml-8">Hot Deals 🔥</h1>
        <div className="flex flex-wrap justify-center">
          <CardList data={data}/>

        </div>

        </div>
    </>
  )
}

export default DealsPage