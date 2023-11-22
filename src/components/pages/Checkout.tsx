import React, { useState } from 'react'
import Visa from '../../assets/visa-logo.png'
import Mastercard from '../../assets/mastercard-logo.jpg'
import Maya from '../../assets/maya-logo.jpg'
import Gcash from '../../assets/gcash-logo.png'
import Paypal from '../../assets/paypal-logo.png'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
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
import { Separator } from '../ui/separator'
import useAuth from '@/hooks/useAuth'
import { UseAuthProps } from '@/contexts/AuthProvider'
import useAxios from '@/hooks/useAxios'
import axios from '@/api/axios'
import { useToast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { UseCartProps } from '@/contexts/CartProvider'
import useCart from '@/hooks/useCart'

type PaymentInfoType = { 
  username:string,
   phone:string,
   paymentMethod:string,
   productsArr:[],
   cardNumber:number,
   expMonth:string,
   expYear:string,
   ccv:string,
   paypalEmail:string,
   mayaPhone:string,
   gcashPhone:string,
   shippingAddress:string,
   addressLine1:string,
   city:string,
   state:string,
   country:string,
   zipCode:string, 

  }

const Checkout: React.FC = () => {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")
  const [cart, setCartArray] = useState(cartFromLocalStorage)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const productsArr: any[] = [];
  const navigate = useNavigate();
  const {setCart}:UseCartProps = useCart();

  const checkoutSubtotal:number = cart?.reduce((accumulator: number, object: { itemCountCart: number, price: number }) => {
    return accumulator + (object?.itemCountCart * object?.price);
  }, 0);

  cart?.forEach((product: { id: number; itemCountCart: number }) => {
    const eachProduct = {productId: product.id, productQuantity: product.itemCountCart}
    productsArr.push(eachProduct)
  })

  const { auth }:UseAuthProps = useAuth();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoType>({
    // subtotal: checkoutSubtotal.toFixed(2),
    // shippingAmount: ((checkoutSubtotal/8).toFixed(2)),
    username: auth.username,
    paymentMethod: 'visa',
    productsArr: productsArr
  })
  const { toast } = useToast()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { response }: any|null = useAxios({
    url:`/user/username/${auth.username}`,
    method: 'get'
  })

  const handlePlaceOrder = async(e: React.FormEvent) => {
    e.preventDefault();
    const { username, phone, paymentMethod, productsArr, cardNumber, expMonth, expYear, ccv, paypalEmail, mayaPhone, gcashPhone, shippingAddress, addressLine1, city, state, country, zipCode } = paymentInfo;
    if(!username){
      toast({ title: "User not logged in", variant: "destructive" }); return;
    }
    if(!productsArr){
      toast({ title: "Add some products to cart", variant: "destructive" }); return;
    }
    if(!phone){
      toast({ title: "Please provide your number", variant: "destructive" }); return;
    }
    if(phone.length > 11){
      toast({ title: "Please enter a valid mobile number", variant: "destructive" }); return;
    }
    if(!paymentMethod){
      toast({ title: "Please select a payment method", variant: "destructive" }); return;
    }
    if(paymentMethod === "visa"){
      if(!cardNumber){
        toast({ title: "Please input visa card number", variant: "destructive" }); return;
      }
      if(!expMonth){
        toast({ title: "Please input expiry month of card", variant: "destructive" }); return;
      }
      if(!expYear){
        toast({ title: "Please input expiry year of card", variant: "destructive" }); return;
      }
      if(!ccv){
        toast({ title: "Please input visa card number", variant: "destructive" }); return;
      }
    }
    if(paymentMethod === "mastercard"){
      if(!cardNumber){
        toast({ title: "Please input mastercard card number", variant: "destructive" }); return;
      }
      if(!expMonth){
        toast({ title: "Please input expiry month of card", variant: "destructive" }); return;
      }
      if(!expYear){
        toast({ title: "Please input expiry year of card", variant: "destructive" }); return;
      }
      if(!ccv){
        toast({ title: "Please input visa card number", variant: "destructive" }); return;
      }
    }
    if(paymentMethod === "paypal"){
      if(!paypalEmail){
        toast({ title: "Please input your paypal email", variant: "destructive" }); return;
      }
    }
    if(paymentMethod === "maya"){
      if(!mayaPhone){
        toast({ title: "Please input your maya account number", variant: "destructive" }); return;
      }
    }
    if(paymentMethod === "gcash"){
      if(!gcashPhone){
        toast({ title: "Please input your gcash number", variant: "destructive" }); return;
      }
    }
    if(!shippingAddress){
      toast({ title: "Please input your complete address", variant: "destructive" }); return;
    }
    if(!addressLine1){
      toast({ title: "Please input your address line 1", variant: "destructive" }); return;
    }
    if(!city){
      toast({ title: "Please input your city", variant: "destructive" }); return;
    }
    if(!state){
      toast({ title: "Please input your state", variant: "destructive" }); return;
    }
    if(!country){
      toast({ title: "Please input your country", variant: "destructive" }); return;
    }
    if(!zipCode){
      toast({ title: "Please input your zipcode", variant: "destructive" }); return;
    }
    console.log(paymentInfo)
    try {
      const response = await axios.post('/create/order', paymentInfo, 
        {
          headers:{
            'Content-Type': 'application/json'
          }
        })
        console.log(response);
        setCart? setCart([]) : "";
        setCartArray([])
    } catch (error) {
      console.log(error);
    }finally{
      navigate("/orders")

    }

  }


  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newFormData:any = { ...paymentInfo };
    fieldName ? newFormData[fieldName] = fieldValue : ""
    setPaymentInfo(newFormData)
    console.log(paymentInfo)
  }
  
  
  return (
    
    <>
      <div className='py-5 px-12 flex flex-row gap-5 justify-between flex-wrap'>
        <div className='w-3/5 flex flex-col gap-5'>
          {cart?.map((product: { id: number; images: string[]; name: string, description:string, ratings:number, price:number , itemCountCart:number}) => {
            // const images = JSON.parse(product.images)
            return(
            <div className="w-full flex flex-col gap-5" key={product.id}>
              <div className="w-full h-56 flex justify-between bg-slate-50 rounded-lg border">
                <img src={`http://localhost:8000/uploads/${product.images[0]}`} alt="product1" className='w-1/5 ml-8 m-3 rounded-3xl'/>
                <div className="w-2/3 flex flex-col flex-wrap px-5 py-5">
                  <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    {product.name}
                  </h2>
                  <p className="leading-7 [&:not(:first-child)]:mt-6 w-1/2 truncate text-slate-600">
                    {product.description}
                  </p>
                  <Rating style={{ maxWidth: 100 }} value={product.ratings} readOnly/>
                  <div className="w-2/3 flex justify-between items-center">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-2">
                      $ {product.price.toFixed(2)}
                    </h3>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Qty. {product.itemCountCart}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          )})}
        </div>

        <div className="w-full md:w-2/6 h-full">
          <form >

          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <div className='flex flex-col gap-2 justify-center mt-12 pt-2'>
                  <Input type="text" placeholder="Full name" value={response? response[0]?.firstName + " " + response[0]?.lastName: ""} disabled/>
                  <div className="flex gap-2">
                    <Input type="email" placeholder="Email" value={response? response[0]?.email : ""} disabled/>
                    <Input type="number" placeholder="Phone (e.g. 09xxx)" name='phone' onChange={handlePaymentInfoChange}/>
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
              <Tabs defaultValue="visa" className="px-10" onValueChange={(value:string )=>setPaymentInfo({...paymentInfo, paymentMethod: value})}>
                <TabsList className='h-16'>
                  <TabsTrigger value="visa"><img className='m-1 rounded-lg' src={Visa} width={75}/></TabsTrigger>
                  <TabsTrigger value="mastercard"><img className='m-1 rounded-lg' src={Mastercard} width={65}/></TabsTrigger>
                  <TabsTrigger value="paypal"><img className='m-1 rounded-lg' src={Paypal} width={75}/></TabsTrigger>
                  <TabsTrigger value="maya"><img className='m-1 rounded-lg' src={Maya} width={75}/></TabsTrigger>
                  <TabsTrigger value="gcash"><img className='m-1 rounded-lg' src={Gcash} width={75}/></TabsTrigger>
                </TabsList>
                <TabsContent className="mt-5" value="visa">
                  <div className="grid items-center space-y-1.5">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="cardNumber">Visa Card Number</Label>
                      <Input type="number" id="cardNumber" name="cardNumber" placeholder="Card Number" onChange={handlePaymentInfoChange}/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="expdate">Expiration Date</Label>
                      <div className="flex justify-between">
                        <Select onValueChange={(value:string )=>setPaymentInfo({...paymentInfo, expMonth: value})}>
                          <SelectTrigger className="w-full lg:w-[180px]">
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

                        <Select onValueChange={(value:string )=>setPaymentInfo({...paymentInfo, expYear: value})}>
                          <SelectTrigger className="w-full lg:w-[240px]">
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
                      <Input type="number" max={999} id="securityCode" placeholder="CCV" name='ccv' onChange={handlePaymentInfoChange}/>
                    </div>
                  </div>

                </TabsContent>
                <TabsContent className="mt-5" value="mastercard">
                <div className="grid items-center space-y-1.5">
                    <div className="flex flex-col space-y-1.5 flex-wrap">
                      <Label htmlFor="cardNumber">Mastercard Card Number</Label>
                      <Input type="number" id="cardNumber" name="cardNumber" placeholder="Card Number" onChange={handlePaymentInfoChange}/>
                    </div>
                    <div className="flex flex-col space-y-1.5 flex-wrap">
                      <Label htmlFor="expdate">Expiration Date</Label>
                      <div className="flex justify-between w-full">
                        <Select onValueChange={(value:string )=>setPaymentInfo({...paymentInfo, expMonth: value})}>
                          <SelectTrigger className="w-full xl:w-[180px]">
                            <SelectValue placeholder="Month"/>
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

                        <Select onValueChange={(value:string )=>setPaymentInfo({...paymentInfo, expYear: value})}>
                          <SelectTrigger className="w-full xl:w-[240px]">
                            <SelectValue placeholder="Year"/>
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
                      <Input type="number" max={999} id="securityCode" placeholder="CCV" name='ccv' onChange={handlePaymentInfoChange} />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent className="mt-5" value="paypal">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="paypalEmail">Paypal Email</Label>
                  <Input type="email" id="paypalEmail" placeholder="E-mail" name='paypalEmail' onChange={handlePaymentInfoChange}/>
                </div>
                </TabsContent>
                <TabsContent className="mt-5" value="maya">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="maya">Maya Phone Number</Label>
                  <Input id="maya" type='number' placeholder="Maya Cell no." name='mayaPhone' onChange={handlePaymentInfoChange}/>
                </div>
                </TabsContent>
                <TabsContent className="mt-5" value="gcash">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="gCash">GCash Phone Number</Label>
                  <Input id="gCash" type='number' placeholder="GCash Cell no." name='gcashPhone' onChange={handlePaymentInfoChange}/>
                </div>
                </TabsContent>
              </Tabs>

            </CardHeader>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mx-6 my-3">
              Shipping Information
            </h3>

            <CardContent className='flex flex-col gap-3'>

              <Input placeholder='Complete Shipping Address'name="shippingAddress" onChange={handlePaymentInfoChange}/>
              <Input placeholder='House#, Apartment, suite, etc.'name="addressLine1" onChange={handlePaymentInfoChange}/>
              <div className="flex gap-3">
                <Input placeholder='City' name='city' onChange={handlePaymentInfoChange}/>
                <Input placeholder='State' name='state' onChange={handlePaymentInfoChange}/>
              </div>
              <div className="flex gap-3">
                <Input placeholder='Country'  name="country" onChange={handlePaymentInfoChange}/>
                <Input placeholder='Postal Code' name="zipCode"  onChange={handlePaymentInfoChange}/>
              </div>
              <div className="flex justify-between mt-6">
                <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                  Subtotal: 
                </h4>
                <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                  ${checkoutSubtotal.toFixed(2)} 
                </h4>
              </div>
              <div className="flex justify-between">
                <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                  Shipping: 
                </h4>
                <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                  ${(checkoutSubtotal/8).toFixed(2)} 
                </h4>
              </div>
              <Separator className='mt-3'/>

              <div className="flex justify-between">
                <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                  Total: 
                </h4>
                <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                  ${(checkoutSubtotal + (checkoutSubtotal/8)).toFixed(2)} 
                </h4>
              </div>

            </CardContent>
            <CardFooter>
              <Button className='w-full bg-amber-500 hover:bg-amber-600' onClick={handlePlaceOrder}>Place Order</Button>
            </CardFooter>
          </Card>
          </form>
        </div>
      </div>
    </>
  )
}

export default Checkout