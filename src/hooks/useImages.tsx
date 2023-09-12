import { useEffect, useState } from "react";
import { products } from "@/test_data";


const useImages = (id: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [images, setImages]:any = useState([]);
    const product = products.find((p)=>{p.id === Number(id)})


    const fetchImages = () => {
        try {
            setLoading(true)
            product? 
                setImages(product.images)
                :
                ""
            setLoading(false);

        } catch (error:any ) {
            setError(error)
            setLoading(false);

        }
        
    };

    useEffect(() => {
      fetchImages();
    }, [images])
    


    return { images, loading, error };
}

export default useImages;