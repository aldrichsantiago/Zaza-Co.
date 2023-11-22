import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useToast } from "@/components/ui/use-toast"
import useAuth from '@/hooks/useAuth'
import { UseAuthProps } from '@/contexts/AuthProvider'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from 'lucide-react'


const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
})




const Login: React.FC = () => {
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { auth, setAuth }: UseAuthProps = useAuth();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, values, {withCredentials: true, headers: {"Content-Type": 'application/json'}})
      

      setAuth? setAuth({
        accessToken: response?.data.token, 
        roles: [response?.data.role], 
        username: response?.data.username, 
        cart: response.data.cart, 
        wishlist: response.data.wishlist
      })
        :
        ""

      toast({
        description: "Logged in successfully",
        variant: "default",
        duration: 1500 
      })


      const cart = response.data.cart;
      const localStorageCart = [];
      for (const product of cart){
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/${product.id}`)
        localStorageCart.push({...res.data[0], itemCountCart: product.itemCountCart})
      }
      console.log(localStorageCart);
      console.log(cart);

      localStorage.setItem('cart', JSON.stringify(localStorageCart))

      console.log({accessToken: response.data.token, roles: response?.data?.role, username: response?.data.username})
      console.log(auth)
      if (response?.data?.role === "admin"){
        navigate("/admin/dashboard")
      } else{
        navigate("/")
      }
    } catch (error) {
      toast({
        description: "Something Went Wrong",
        variant: "destructive"
      })
      console.log(error)
    }

     
  }

  
  return (
    <>
    
        <div className='container'>
            <div className="container flex flex-wrap justify-center p-1 lg:p-8 lg:m-8 rounded-xl bg-slate-200">
                <div className="w-full md:w-2/3 h-[600px] p-2 md:p-8 bg-gradient-to-r from-green-600 to-emerald-800 lg:rounded-l-xl rounded-none flex flex-col justify-center">
                    <h1 className='text-white text-5xl my-2 mx-10'>Welcome to ZAZA Co.</h1>
                    <p className='text-white text-xl w-1/2 my-2 mx-10'>You can sign in to access with your existing account </p>
                </div>
                <div className="w-full md:w-1/3 h-[600px] p-8 py-24 bg-slate-50 lg:rounded-r-xl rounded-none">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                  <div className='flex flex-wrap items-center'>
                    <h1 className='mr-3 text-3xl font-medium'>Login to your account</h1>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info/>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className='scroll-m-20 text-xl font-semibold tracking-tight'>Sample Users</p>
                          <p>username: admin</p>
                          <p>password: admin</p>
                          <p>---------------------</p>
                          <p>username: sample</p>
                          <p>password: sample</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Username" {...field}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="Password" {...field} type='password'/>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Login</Button>
                  </form>
                </Form>


                </div>
            </div>
        </div>

    </>

  )
}

export default Login