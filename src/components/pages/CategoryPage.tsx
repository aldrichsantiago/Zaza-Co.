import { products } from '@/test_data';
import React from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../ProductCard';

type CategoryParams = {
    categoryName: string;
}

const CategoryPage: React.FC = () => {

    const { categoryName } = useParams<CategoryParams>();
    console.log(categoryName);


    return (
        <div className='container w-full'>
            <p className='mt-10'>{categoryName?.toUpperCase()}</p>

            <div className="bg-slate-200 w-full h-96 my-5"></div>

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