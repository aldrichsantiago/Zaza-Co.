import useAxios from '@/hooks/useAxios';
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../ProductCard';

const SearchPage = () => {
    const [data, setData] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const searchProduct = searchParams.get('search')

    const { response } = useAxios({
        method: 'get',
        url: `${import.meta.env.VITE_API_URL}/search/suggestions?search=${searchProduct}`,
        headers: JSON.stringify({ accept: '*/*' }),
        });
    
        useEffect(() => {
        if (response !== null) {
            setData(response[0]);            
        }
        }, [response]);

        console.log(setSearchParams)
  return (
    <div className='container pt-12'>
        <div className="flex items-center">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Searching for "{searchProduct}" 
            </h4>
            <blockquote className="font-light text-sm pl-6 italic">
                {data.length} items
            </blockquote>
        </div>
        
        <div className="flex flex-wrap justify-center">
          {data?.map(({id, name, description, price, ratings, images, quantitySold})=> (
            <ProductCard key={id}
            id={id}
            name={name}
            description={description}
            price={price}
            ratings={ratings}
            images={images}
            quantitySold={quantitySold} addToWishlist={function (_id: number): void {
              throw new Error('Function not implemented.');
            } }/>
          ))}

        </div>
    </div>
  )
}

export default SearchPage