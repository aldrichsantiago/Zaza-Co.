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
  firstName: z.string().min(2, {message: "First name must be at least 2 characters.",}),
  lastName: z.string().min(2, {message: "Last name must be at least 2 characters.",}),
  email: z.string().email({message: "Please enter a valid email",}),
  username: z.string().min(4, {message: "Username must be at least 4 characters.",}).max(16, {message: "Username should not exceed 16 characters."}),
  password: z.string().min(8, {message: "Password must be at least 8 characters.",}),
  confirmPassword: z.string().min(8, {message: "Password must be at least 8 characters.",}),
})


const Register: React.FC = () => {

      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
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
                <div className="w-full md:w-1/3 h-[600px] p-5 py-7 bg-slate-50 lg:rounded-r-xl rounded-none">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 ">

                    <div>
                        <h1 className='text-3xl font-medium'>Create your account</h1>
                    </div>

                    <div className="flex flex-wrap justify-between">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className='w-1/2 px-1'>
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input placeholder="First name" {...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className='w-1/2 px-1'>
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input placeholder="Last name" {...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" {...field} type='email'/>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Username" {...field}/>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-wrap justify-between">

                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className='w-1/2 px-1'>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" {...field} type='password'/>
                            </FormControl>
                            <FormMessage/>
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className='w-1/2 px-1'>
                            <FormLabel>&nbsp;</FormLabel>
                            <FormControl>
                                <Input placeholder="Confirm password" {...field} type='password'/>
                            </FormControl>
                            <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>

                    
                    <Button type="submit" className='w-full my-72'>Register</Button>
                  </form>
                </Form>


                </div>
            </div>
        </div>

    </>
  )
}

export default Register