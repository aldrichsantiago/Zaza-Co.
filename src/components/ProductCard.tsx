import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link, useNavigate } from "react-router-dom"
import { Rating } from '@smastrom/react-rating'
import useAuth from "@/hooks/useAuth"
import { UseAuthProps } from "@/contexts/AuthProvider"
import { UseCartProps } from "@/contexts/CartProvider"
import useCart from "@/hooks/useCart"
import axios from "@/api/axios"
import { useEffect, useState } from "react"


export interface Product {
  id: number
  name: string
  description: string
  price: number
  ratings?: number
  quantitySold?: number
  stocks?: number
  images: string[]
  category?: string 
  disp?: boolean 
  itemCountCart?: number
  addToWishlist: (id: number) => void
}

const ProductCard = ({ id, name, description, price, images, quantitySold, ratings, disp, addToWishlist }: Product) => {

  const { auth }: UseAuthProps = useAuth();
  const { addToCart }: UseCartProps = useCart();
  const wishlistIds: number[] = auth?.wishlist;
  const idExists = wishlistIds?.find(w => w === id);
  const [noOfReviewers, setNoOfReviewers] = useState(0);

  useEffect(()=>{
    axios.get(`/ratings/products/${id}`)
    .then(res => setNoOfReviewers(res.data[0].count))
    .catch(e => console.log(e))
  },[]);

  

  return (
    <>
        <Card className="w-[300px] h-[400px] m-3 flex flex-col items-center border-none shadow-none">
        <CardContent className="w-full h-full p-0 rounded-xl relative hover:cursor-pointer">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {
                  idExists? 
                  <span onClick={()=>{addToWishlist(id)}} className="bg-slate-100 w-10 h-10 absolute z-20 top-5 right-5 flex items-center justify-center rounded-3xl cursor-pointer hover:bg-slate-200 hover:text-black transition-colors">
                    <Heart size={20}/>
                  </span>
                  :
                  <span onClick={()=>{addToWishlist(id)}} className="bg-slate-100 w-10 h-10 absolute z-20 top-5 right-5 flex items-center justify-center rounded-3xl cursor-pointer hover:bg-slate-200 hover:text-black transition-colors">
                    <Heart size={20}/>
                  </span>
                }
               
              </TooltipTrigger>
              <TooltipContent side="right" align="end" sideOffset={270}>
                  <p className="w-24 h-5 block z-50">Add to Wishlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          
          <Link className="w-full h-full absolute z-10 flex justify-center p-3" to={`/products/${id}`}>
            <img src={images? `${import.meta.env.VITE_API_URL}/uploads/${images[0]}`: ""} alt="Image here" className="hover:scale-105 transition-transform max-w-full rounded-2xl"/>
          </Link>
        </CardContent>
        <CardHeader className="w-full p-3">

            <CardTitle className="my-1 flex justify-between text-xl hover:cursor-pointer">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-ellipsis truncate m-0 max-w-fit">
                    <p className="text-ellipsis truncate mr-2 max-w-fit">{name}</p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p>${price}</p>
            </CardTitle>
            <CardDescription>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-ellipsis truncate max-w-[280px]">
                    <p className="truncate p-0">{description}</p>
                  </TooltipTrigger>
                  <TooltipContent className="w-56">
                    <p>{description}</p>
                  </TooltipContent>
                </Tooltip>
                
              </TooltipProvider>
                
            </CardDescription>
            


            <span className="mt-5 flex items-center font-semibold">
            <Rating style={{ maxWidth: 100 }} value={ratings? ratings/noOfReviewers: 0} readOnly />
            <p className="mx-3">({quantitySold})</p>
            </span>
        </CardHeader>
        { disp?
        ""
        :
        <CardFooter className="w-full p-2">
            <Button variant="outline" 
            className="rounded-3xl hover:bg-green-900 hover:text-white"
            onClick={()=>addToCart?addToCart(id):""}>Add to cart</Button>
        </CardFooter>
        }
        
        </Card>

    </>
  )
}

export default ProductCard