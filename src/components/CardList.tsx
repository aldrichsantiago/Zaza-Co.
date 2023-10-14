import ProductCard from './ProductCard'
import { UseAuthProps } from '@/contexts/AuthProvider';
import useAuth from '@/hooks/useAuth';
import { useToast } from './ui/use-toast';
import axios from '@/api/axios';
import { useNavigate } from 'react-router-dom';

export interface DataProps {
  id: number,
  name: string,
  description: string,
  price: number,
  ratings: number,
  images: string[],
  quantitySold: number
}

const CardList = ({data}:any) => {
  const { auth }:UseAuthProps = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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
  console.log(data);
  
  return (
    <div className="flex flex-wrap justify-center">
          {data?.map(({id, name, description, price, ratings, images, quantitySold}:any)=> (
            <ProductCard key={id}
             id={id} 
             name={name} 
             description={description} 
             price={price} 
             ratings={ratings} 
             images={images}
             quantitySold={quantitySold}
             addToWishlist={addToWishlist}/>
          ))}
        </div>
  )
}

export default CardList