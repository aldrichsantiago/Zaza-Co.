import useRefreshToken from "@/hooks/useRefreshToken";
import { FC, useEffect, useState } from "react"
import ProductCard from '../ProductCard'
import useAuth from "@/hooks/useAuth";
import { UseAuthProps } from "@/contexts/AuthProvider";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
interface WishlistProductsInterface {
  id: number
  name: string
  description: string
  price: number
  ratings: number
  images: string[]
  quantitySold: number
}


const Wishlist:FC = () => {
  const { auth }:UseAuthProps = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [data, setData] = useState([]);
  const [wishlistArray, setWishlistArray] = useState(data)
  useRefreshToken();


  useEffect(() => {
    axios.get('/products/wishlist/user/'+auth.username,)
    .then((res) => {
      setData(res.data[0]);
      setWishlistArray(res.data[0])
      console.log(res.data[0]);
    })
    .catch((e)=>console.log(e))
  }, [auth]);


  
  const addToWishlist = async(id:number) => {
    if (auth) {
      try {
        const wishlistProduct = wishlistArray.find((p: { id: number; }) => p.id === id)
        if (wishlistProduct) {
          setWishlistArray(wishlistArray.filter((p: { id: number; }) => p.id !== id));
        }
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
  console.log(wishlistArray);
  

  return (
    <div className="container py-12 w-full">
        <h1 className="font-medium text-2xl">💖 My Wishlist</h1>
        <div className="flex flex-wrap justify-center">
        {
          wishlistArray.length === 0 ?

            <h1 className=" my-44 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              No Products on your wishlist
            </h1>
          :

          wishlistArray?.map(({id, name, description, price, ratings, images, quantitySold}:WishlistProductsInterface)=> (
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
        ))

        }

        {/* {wishlistArray?.map(({id, name, description, price, ratings, images, quantitySold}:WishlistProductsInterface)=> (
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
        ))} */}
        </div>
    </div>
  )
}

export default Wishlist