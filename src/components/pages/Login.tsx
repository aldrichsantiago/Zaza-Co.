import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})


const Login: React.FC = () => {

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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

                  <div>
                    <h1 className='text-3xl font-medium'>Login to your account</h1>
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
                          <FormMessage />
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