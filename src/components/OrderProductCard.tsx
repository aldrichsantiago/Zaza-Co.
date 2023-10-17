
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Button } from "./ui/button"
import { DialogClose } from "@radix-ui/react-dialog"
import { Rating } from "@smastrom/react-rating"
import { useEffect, useState } from "react"
import axios from "@/api/axios"

export interface Product {
  id: number
  name: string
  description: string
  price: number
  ratings?: number
  quantitySold?: number
  images: string[]
  category?: string 
  disp?: boolean 
  itemCountCart?: number
  isReviewed?: boolean
  userRating: number
  orderId: number
  addToWishlist?: (id: number) => void
}

const OrderProductCard = ({ id, name, description, price, images, isReviewed, userRating, orderId }: Product) => {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const saveRating = () => {
    axios.patch(`/ratings/orders/${orderId}/products/${id}`, {rating})
    .then(res => console.log(res.data))
    .catch(e => console.log(e))

    navigate(0)
  }



  return (
    <>
        <Card className="w-[300px] h-[400px] m-3 flex flex-col items-center border-none shadow-none">
        <CardContent className="w-full h-full p-0 rounded-xl relative hover:cursor-pointer">
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
        </CardHeader>
        {
          isReviewed ?
          <div className="w-full px-3 flex justify-start">
            <Rating style={{ maxWidth: 190 }} value={userRating} readOnly/>
          </div>
          :
          <Dialog>
            <DialogTrigger className="bg-green-900 hover:bg-green-950 py-2 px-8 rounded-sm font-medium text-white transition-colors">Review</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-5">Rate this Product : {name}</DialogTitle>
                <DialogDescription className="flex justify-center">
                  <Rating style={{ maxWidth: 200 }} value={rating} onChange={(value: number)=>{console.log(value); setRating(value)}}/>
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-3 justify-between">
                <DialogClose>
                  <Button type={"button"} variant={"outline"} className="px-6">Close</Button>
                </DialogClose>
                <Button variant={"default"} className="px-6" onClick={saveRating}>Rate</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
        <CardFooter className="flex items-start w-full p-2 mt-2">

        </CardFooter>
        </Card>

    </>
  )
}

export default OrderProductCard