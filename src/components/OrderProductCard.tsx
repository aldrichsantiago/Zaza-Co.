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
import { Link } from "react-router-dom"

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
  addToWishlist?: (id: number) => void
}

const OrderProductCard = ({ id, name, description, price, images }: Product) => {

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

        }
        <CardFooter className="flex items-start w-full p-2 mt-2">
            <Button className="bg-green-900 px-12">Review</Button>
        </CardFooter>
        </Card>

    </>
  )
}

export default OrderProductCard