import { products } from '@/test_data';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../ProductCard';
import EmblaCarousel from './Carousel/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel-react'
import useAxios from '@/hooks/useAxios';

type CategoryParams = {
    categoryName: string;
}

const CategoryPage: React.FC = () => {

    const { categoryName } = useParams<CategoryParams>();
    console.log(categoryName);
    const OPTIONS: EmblaOptionsType = { loop: true }
    const SLIDE_COUNT = 3
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
    const [data, setData] = useState([]);

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
        <div className='container w-full pt-12'>
            

            <main className="sandbox">
                <section className="sandbox__carousel">
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                </section>
            </main>
            <h1 className="text-4xl font-sans font-medium mt-12 mb-3 ml-8 capitalize">{categoryName === "health-and-fitness" ? "Health & Fitness" : categoryName}</h1>

            <div className="flex flex-wrap justify-center mb-10">
                {data?.map(({id, name, description, price, ratings, images, quantitySold, category})=> (
                    categoryName === category ?
                        <ProductCard key={id}
                        id={id} 
                        name={name} 
                        description={description} 
                        price={price} 
                        ratings={ratings} 
                        images={images}
                        quantitySold={quantitySold}/>
                    : ``
            ))}

            </div>

        </div>
    )
}

export default CategoryPage