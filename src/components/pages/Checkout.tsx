import React, { useState } from 'react'
import Visa from '../../assets/visa-logo.png'
import Mastercard from '../../assets/mastercard-logo.jpg'
import Maya from '../../assets/maya-logo.jpg'
import Gcash from '../../assets/gcash-logo.png'
import Paypal from '../../assets/paypal-logo.png'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Rating } from '@smastrom/react-rating'




const Checkout: React.FC = () => {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")
  const [cart, setCart] = useState(cartFromLocalStorage)
  const images = JSON.parse(cart[0].images)
  console.log(images);
  
  
  return (
    <ScrollArea  className=" w-full rounded-md p-4">
      <div className='py-5 px-12 flex gap-5 justify-between flex-wrap'>
        <div className="w-full md:w-3/5 flex flex-col gap-5">
          <div className="w-full h-56 flex justify-between bg-slate-100 rounded-lg border">
            <img src={`http://localhost:8000/uploads/${images[0]}`} alt="product1" className='w-1/4'/>
            <div className="flex flex-col pr-12 py-5">
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                {cart[0].name}
              </h2>
              <p className="leading-7 [&:not(:first-child)]:mt-6 max-w-prose truncate text-slate-600">
                {cart[0].description}
              </p>
              <Rating style={{ maxWidth: 100 }} value={cart[0].ratings} readOnly/>
              <div className="w-full flex justify-between items-center">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-2">
                  $ {cart[0].price.toFixed(2)}
                </h3>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Qty. {cart[0].itemCountCart}
                </h4>
              </div>
              
            </div>
            
          </div>


          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
        
        <div className="w-full md:w-2/6 h-full">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <div className='flex flex-col gap-2 justify-center mt-12 pt-2'>
                  <Input type="text" placeholder="Full name" />
                  <div className="flex gap-2">
                    <Input type="email" placeholder="Email" />
                    <Input type="number" placeholder="Phone (e.g. 09xxx)" />
                  </div>
                  <div className="flex items-center space-x-2 mx-3 mb-5 justify-center">
                    <Checkbox id="terms" />
                    <label htmlFor="terms" className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Subscribe to newsletter to keep me up to date on news and exclusive offers 
                    </label>
                  </div>
                </div>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight py-2">
                  Payment Methods
                </h3>
              <Tabs defaultValue="visa" className="px-10">
                <TabsList className='h-16'>
                  <TabsTrigger value="visa"><img className='m-1 rounded-lg' src={Visa} width={75}/></TabsTrigger>
                  <TabsTrigger value="mastercard"><img className='m-1 rounded-lg' src={Mastercard} width={65}/></TabsTrigger>
                  <TabsTrigger value="paypal"><img className='m-1 rounded-lg' src={Paypal} width={75}/></TabsTrigger>
                  <TabsTrigger value="maya"><img className='m-1 rounded-lg' src={Maya} width={75}/></TabsTrigger>
                  <TabsTrigger value="gcash"><img className='m-1 rounded-lg' src={Gcash} width={75}/></TabsTrigger>
                </TabsList>
                <TabsContent className="mt-5" value="visa">
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="Card Number" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="expdate">Expiration Date</Label>
                      <div className="flex justify-between">
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="01">01</SelectItem>
                            <SelectItem value="02">02</SelectItem>
                            <SelectItem value="03">03</SelectItem>
                            <SelectItem value="04">04</SelectItem>
                            <SelectItem value="05">05</SelectItem>
                            <SelectItem value="06">06</SelectItem>
                            <SelectItem value="07">07</SelectItem>
                            <SelectItem value="08">08</SelectItem>
                            <SelectItem value="09">09</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="11">11</SelectItem>
                            <SelectItem value="12">12</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select>
                          <SelectTrigger className="w-[240px]">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2022">2022</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2026">2026</SelectItem>
                            <SelectItem value="2027">2027</SelectItem>
                            <SelectItem value="2028">2028</SelectItem>
                            <SelectItem value="2029">2029</SelectItem>
                            <SelectItem value="2030">2030</SelectItem>
                            <SelectItem value="2032">2032</SelectItem>
                            <SelectItem value="2033">2033</SelectItem>
                            <SelectItem value="2034">2034</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="securityCode">Security Code / CCV</Label>
                      <Input id="securityCode" placeholder="CCV" />
                    </div>
                  </div>

                </TabsContent>
                <TabsContent className="mt-5" value="mastercard">
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="Card Number" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="expdate">Expiration Date</Label>
                      <div className="flex justify-between">
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="01">01</SelectItem>
                            <SelectItem value="02">02</SelectItem>
                            <SelectItem value="03">03</SelectItem>
                            <SelectItem value="04">04</SelectItem>
                            <SelectItem value="05">05</SelectItem>
                            <SelectItem value="06">06</SelectItem>
                            <SelectItem value="07">07</SelectItem>
                            <SelectItem value="08">08</SelectItem>
                            <SelectItem value="09">09</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="11">11</SelectItem>
                            <SelectItem value="12">12</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select>
                          <SelectTrigger className="w-[240px]">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2022">2022</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2026">2026</SelectItem>
                            <SelectItem value="2027">2027</SelectItem>
                            <SelectItem value="2028">2028</SelectItem>
                            <SelectItem value="2029">2029</SelectItem>
                            <SelectItem value="2030">2030</SelectItem>
                            <SelectItem value="2032">2032</SelectItem>
                            <SelectItem value="2033">2033</SelectItem>
                            <SelectItem value="2034">2034</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="securityCode">Security Code / CCV</Label>
                      <Input id="securityCode" placeholder="CCV" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent className="mt-5" value="paypal">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="paypalEmail">Paypal Email</Label>
                  <Input type="email" id="paypalEmail" placeholder="E-mail" />
                </div>
                </TabsContent>
                <TabsContent className="mt-5" value="maya">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="maya">Maya Phone Number</Label>
                  <Input id="maya" type='number' placeholder="Maya Cell no." />
                </div>
                </TabsContent>
                <TabsContent className="mt-5" value="gcash">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="gCash">GCash Phone Number</Label>
                  <Input id="gCash" type='number' placeholder="GCash Cell no." />
                </div>
                </TabsContent>
              </Tabs>

            </CardHeader>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mx-6 my-3">
              Shipping Information
            </h3>

            <CardContent className='flex flex-col gap-3'>

              <Input placeholder='Complete Shipping Address'/>
              <Input placeholder='House#, Apartment, suite, etc.'/>
              <div className="flex gap-3">
                <Input placeholder='City'/>
                <Input placeholder='State'/>
              </div>
              <div className="flex gap-3">
                <Input placeholder='Country'/>
                <Input placeholder='Postal Code'/>
              </div>

            </CardContent>
            <CardFooter>
              <Button className='w-full bg-amber-500 hover:bg-amber-600'>Place Order</Button>
            </CardFooter>
          </Card>
        </div>
          
      </div>
    </ScrollArea>
  )
}

export default Checkout