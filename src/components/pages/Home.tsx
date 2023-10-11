import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard'
import EmblaCarousel from './Carousel/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel-react'
import './Carousel/css/sanbox.css'
import './Carousel/css/embla.css'

import useAxios from '@/hooks/useAxios';
import { useNavigate } from 'react-router-dom'
import { useToast } from '../ui/use-toast'
import { UseAuthProps } from '@/contexts/AuthProvider'
import useAuth from '@/hooks/useAuth'
import axios from '@/api/axios'

const Home: React.FC = () => {
  const [data, setData] = useState([]);
  const OPTIONS: EmblaOptionsType = { loop: true }
  const SLIDE_COUNT = 3
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  const navigate = useNavigate();
  const { toast } = useToast();
  const { auth }:UseAuthProps = useAuth();

  const addToWishlist = async(id:number) => {
    if (auth.username) {
      try {
        const res = await axios.patch("/wishlist/user/" + auth.username + "/" + id, id);
        toast({ title: res.data.message });
      } catch (error) {

        console.log(error);
        toast({ title: JSON.stringify(error) })
        return;

      }
    } else{
      navigate("/login");
    }
  }

  const { response } = useAxios({
    method: 'get',
    url: '/products',
    headers: JSON.stringify({ accept: '*/*' }),
  });

  useEffect(() => {
    if (response !== null) {
        setData(response);
    }
  }, [response]);


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
          {data?.map(({id, name, description, price, ratings, images, quantitySold})=> (
            <ProductCard key={id}
             id={id} 
             name={name} 
             description={description} 
             price={price} 
             ratings={ratings} 
             images={images}
             quantitySold={quantitySold}
             addToWishlist={addToWishlist}
             />
          ))}

        </div>
      </div>

    </>
  )
}

export default Home