import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { AspectRatio } from "@/components/ui/aspect-ratio"

 
const FormSchema = z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
})

const Settings: React.FC = () => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          security_emails: true,
        },
      })
     
      function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
      }

  return (
    <div className='container py-12'>
        <div className="container p-1 flex gap-5 flex-wrap">
            <div className="border p-6 rounded-lg shadow-md w-full md:w-1/3 h-max md:h-96">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <div>
                        <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
                        <div className="space-y-4">
                            <FormField
                            control={form.control}
                            name="marketing_emails"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                    Marketing emails
                                    </FormLabel>
                                    <FormDescription>
                                    Receive emails about new products, features, and more.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="security_emails"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Security emails</FormLabel>
                                    <FormDescription>
                                    Receive emails about your account security.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled
                                    aria-readonly
                                    />
                                </FormControl>
                                </FormItem>
                            )}
                            />
                        </div>
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
            <div className="border p-6 rounded-lg shadow-md w-full md:w-1/3 h-max md:h-96 flex flex-col items-center">
                <form action={`${import.meta.env.VITE_API_URL}`} method="post">
                    <div className="grid w-full max-w-sm items-center gap-1.5 my-6 grid-cols-3 mx-2 justify-center">
                    <div className="w-[100px]">
                        <AspectRatio ratio={4/3}>
                            <img src="..." alt="Image" className="rounded-md object-cover" />
                        </AspectRatio>
                    </div>
                        <Input id="picture" type="file" className='col-span-2'/>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 grid-cols-2 m-2">
                        <Input id="firstName" type="text" placeholder='First Name'/>
                        <Input id="lastName" type="text" placeholder='Last Name'/>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 m-2">
                        <Input id="email" type="text" placeholder='Email'/>
                    </div>

                    <div className='w-full mx-2 mt-8'>
                        <Button type="submit">Submit</Button>

                    </div>
                </form>
            </div>

            

        </div>
    </div>
  )
}

export default Settings