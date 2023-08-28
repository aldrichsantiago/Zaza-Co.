
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, User2, Settings, LogOut, Heart, ShoppingCart, Package, LogIn, UserPlus, Menu   } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from 'react-router-dom'
import CartProductCard, { CartCardProps } from './CartProductCard'
import { useContext } from "react"
import { Separator } from "./ui/separator"
import CartContext from "@/contexts/CartContext"


const Navbar:React.FC = () => {
    const cart:any = useContext(CartContext);
    let subtotal = 0;
    let cartCount = cart.cartArray.reduce((accumulator: any, object: { itemCountCart: any }) => {
        return accumulator + object.itemCountCart;
      }, 0);
    function isAuth() {
        return false;
    }



  return (
    <>
        <div className='sm:block hidden bg-green-900'>
            <div className="container flex justify-between items-center flex-wrap">
                <div>
                    <h1 className='text-xs p-2 font-sans font-medium text-white'>+63 9123456789</h1>
                </div>
                <div className='flex items-center'>
                    <h1 className='text-xs p-2 font-sans font-medium text-white'>Get 50% Off on Selected Items</h1>
                    <h1 className='text-xs p-2 font-sans font-medium text-white'>|</h1>
                    <Button className="text-white text-xs" variant="link">
                    <Link to="/deals">Shop Now</Link>
                    </Button>
                </div>
                <div className='flex'>
                    <select className='border-transparent bg-transparent text-xs p-2 font-medium font-sans text-white' placeholder='ENG'>
                        <option className='text-black text-xs font-medium' value="ENG">ENG</option>
                        <option className='text-black text-xs font-medium' value="TAG">TAG</option>
                        <option className='text-black text-xs font-medium' value="MAL">MAL</option>
                        <option className='text-black text-xs font-medium' value="CHN">CHN</option>
                    </select>
                    <select className='border-transparent bg-transparent text-xs p-2 font-medium font-sans text-white' placeholder='Location'>
                        <option className='text-black text-xs font-medium' value="PH">PH</option>
                        <option className='text-black text-xs font-medium' value="SG">SG</option>
                        <option className='text-black text-xs font-medium' value="MA">MA</option>
                        <option className='text-black text-xs font-medium' value="CH">CH</option>
                    </select>
                </div>
            </div>
        </div>


        <div className='bg-white shadow-lg sticky top-0 z-30'>
            <div className="container py-6 flex justify-between items-center flex-wrap">
                <div>
                    <Link to={`/`}><h1 className="text-green-900 text-5xl font-sans font-bold">ZAZA</h1></Link>
                </div>
                <div className="block sm:hidden">
                    <Sheet >
                        <SheetTrigger><Menu width={24} height={24} className='hover:bg-slate-100'/></SheetTrigger>
                        <SheetContent className="w-full py-20 block sm:hidden">
                            <SheetHeader className='mb-8'>

                            <div className='flex sm:hidden items-center justify-center'>
                                <div className='my-1 mx-4'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger name='avatar-button'>
                                            <Avatar className='mb-1 w-8 h-8'>
                                                <AvatarImage src="https://github.com/shadcn.png" />
                                                <AvatarFallback><User2 /></AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        {
                                            isAuth() ? 
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem><Package width={20}/> &nbsp; Orders</DropdownMenuItem>
                                                <DropdownMenuItem><Heart width={20}/> &nbsp; My Wishlist</DropdownMenuItem>
                                                <DropdownMenuItem><Settings width={20}/> &nbsp; Settings</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem><LogOut width={20}/> &nbsp; Logout</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        :
                                            <DropdownMenuContent>
                                                <Link to={"/login"}>
                                                    <DropdownMenuItem className='cursor-pointer'><LogIn width={20}/> &nbsp; Login</DropdownMenuItem>
                                                </Link>
                                                <Link to={"/register"}>
                                                    <DropdownMenuItem className='cursor-pointer'><UserPlus width={20}/> &nbsp; Register</DropdownMenuItem>
                                                </Link>

                                            </DropdownMenuContent>
                                        }
                                    </DropdownMenu>
                                </div>
                                <div className='my-1 mx-4'>
                                    <div className="w-full relative">
                                        <span className="bg-red-600 w-4 h-4 text-xs font-mono font-bold rounded-full flex justify-center items-center absolute -right-2 -top-1 text-white">{cart.cartArray.length}</span>
                                        <ShoppingCart width={24} height={24} className=' rounded-md hover:bg-slate-100'/>
                                    </div>
                                </div>
                            </div>

                                <SheetTitle>
                                <div className="flex sm:hidden">
                                    <form className="flex w-full max-w-sm items-center justify-center space-x-2 focus:border-none">
                                        <Input type="text" placeholder="Search Product" className='w-fit text-sm font-medium border-x'/>
                                        <Button type="button" className='w-fit w-100 h-9 bg-green-900 hover:bg-green-950' name='search'><Search width={15} height={15}/></Button>
                                    </form>
                                </div>
                                </SheetTitle>
                            </SheetHeader>
                            <div className='flex flex-col sm:hidden items-center w-full'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center justify-center w-full text-sm font-semibold py-5">Categories<ChevronDown width={15} height={15} className="m-1"/></DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-screen text-center">
                                        <DropdownMenuItem className="w-screen">
                                            <Link className='w-full' to="category/electronics">Electronics</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="w-screen">
                                            <Link className='w-full' to="category/health-and-fitness">Health & Fitness</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="w-screen">
                                            <Link className='w-full' to="category/furnitures">Furnitures</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="w-screen">
                                            <Link className='w-full' to="category/accessories">Accessories</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="w-screen">
                                            <Link className='w-full' to="category/clothing">Clothing</Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Button variant="ghost" className="w-full py-6">
                                    <Link className="w-full" to="/deals">Deals</Link>
                                </Button>
                                <Button variant="ghost" className="w-full py-6">
                                    <Link className="w-full" to="/new-products">What's New</Link>   
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className=' hidden sm:flex items-center'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center text-sm font-semibold py-1 px-3">Categories<ChevronDown width={15} height={15} className="m-1"/></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Link className='w-full' to="category/electronics">Electronics</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link className='w-full' to="category/health-and-fitness">Health & Fitness</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link className='w-full' to="category/furnitures">Furnitures</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link className='w-full' to="category/accessories">Accessories</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link className='w-full' to="category/clothing">Clothing</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="ghost">
                        <Link className="w-full" to="/deals">Deals</Link>
                    </Button>
                    <Button variant="ghost">
                        <Link className="w-full" to="/new-products">What's New</Link>   
                    </Button>
                </div>
                <div className="hidden sm:flex">
                    <form className="flex w-full max-w-sm items-center space-x-2 focus:border-none">
                        <Input type="text" placeholder="Search Product" className='rounded-3xl w-fit text-sm font-medium border-x'/>
                        <Button type="button" className='w-fit w-100 h-9 rounded-3xl bg-green-900 hover:bg-green-950' name='search'><Search width={15} height={15}/></Button>
                    </form>
                </div>
                <div className=' hidden sm:flex items-center justify-center'>
                    <div className='my-1 mx-4'>
                    <DropdownMenu>
                        <DropdownMenuTrigger name='avatar-button'>
                            <Avatar className='mb-1 w-8 h-8'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback><User2 /></AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        {
                            isAuth() ? 
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><Package width={20}/> &nbsp; Orders</DropdownMenuItem>
                                <DropdownMenuItem><Heart width={20}/> &nbsp; My Wishlist</DropdownMenuItem>
                                <DropdownMenuItem><Settings width={20}/> &nbsp; Settings</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><LogOut width={20}/> &nbsp; Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        :
                            <DropdownMenuContent>
                                <Link to={"/login"}>
                                    <DropdownMenuItem className='cursor-pointer'><LogIn width={20}/> &nbsp; Login</DropdownMenuItem>
                                </Link>
                                <Link to={"/register"}>
                                    <DropdownMenuItem className='cursor-pointer'><UserPlus width={20}/> &nbsp; Register</DropdownMenuItem>
                                </Link>

                            </DropdownMenuContent>
                        }
                    </DropdownMenu>
                    </div>
                    <div className='my-1 mx-4'>
                    <Sheet>
                        <SheetTrigger>
                            <div className="w-full relative">
                                { cart.cartArray.length !== 0 ? 
                                <span className="bg-red-600 w-4 h-4 text-xs font-mono font-bold rounded-full flex justify-center items-center absolute -right-2 -top-1 text-white">{cartCount}</span>
                                 : "" }
                            
                            <ShoppingCart width={24} height={24} className=' rounded-md hover:bg-slate-100'/>
                            </div>
                            
                        </SheetTrigger>
                        <SheetContent className="md:w-[1000px]">
                            <SheetHeader className='mb-8'>
                            <SheetTitle>Shopping Cart ({cartCount})</SheetTitle>
                            </SheetHeader>
                            <ScrollArea className="h-[600px] w-full rounded-md border-none p-4">
                                {cart.cartArray.map(({id, name, price, images, ratings, itemCountCart, handleIncrement, handleDecrement}: CartCardProps) => (
                                        <CartProductCard 
                                        key={id}
                                        id={id}
                                        name={name}
                                        price={price}
                                        images={images}
                                        ratings={ratings}
                                        itemCountCart={itemCountCart}
                                        handleIncrement={handleIncrement}
                                        handleDecrement={handleDecrement}/>
                                        
                                ))}
                            </ScrollArea>
                            <div>
                                <div className="flex justify-between">
                                    <h2 className="m-3">Subtotal: </h2>
                                    <h2 className="m-3 font-extrabold">{cart.cartArray?.forEach((element: { price: number, itemCountCart: number }) => {
                                         subtotal += element.price * element.itemCountCart                                         
                                    })} ${subtotal.toFixed(2)}</h2>
                                </div>
                                <div className="flex justify-between">
                                    <h2 className="m-3">Shipping: </h2>
                                    <h2 className="m-3 font-extrabold"> ${(subtotal/4).toFixed(2)}</h2>
                                </div>
                                <Separator/>
                                <div className="flex justify-between">
                                    <h2 className="m-3">Total: </h2>
                                    <h2 className="m-3 font-extrabold">${(subtotal+subtotal/4).toFixed(2)}</h2>
                                    
                                </div>
                                
                            </div>
                            <div className='container flex justify-between py-4'>
                                <Button variant="outline" className='rounded-3xl w-50'>Cancel</Button>
                                <Button className='rounded-3xl w-50'>Checkout</Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                    </div>
                </div>
            </div>
        </div>
    </>

  )
}

export default Navbar