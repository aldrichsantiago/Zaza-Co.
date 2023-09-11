import { products } from '@/test_data';
import React from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../ProductCard';
import EmblaCarousel from './Carousel/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel-react'

type CategoryParams = {
    categoryName: string;
}

const CategoryPage: React.FC = () => {

    const { categoryName } = useParams<CategoryParams>();
    console.log(categoryName);
    const OPTIONS: EmblaOptionsType = { loop: true }
    const SLIDE_COUNT = 3
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


    return (
        <div className='container w-full'>
            <p className='mt-10'>{categoryName?.toUpperCase()}</p>

            <main className="sandbox">
                <section className="sandbox__carousel">
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                </section>
            </main>

            <div className="flex flex-wrap justify-center mb-10">
                {products.map(({id, name, description, price, ratings, images, quantitySold, category})=> (
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