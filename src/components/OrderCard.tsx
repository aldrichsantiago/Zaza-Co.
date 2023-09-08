import React from 'react'
import { orders } from "@/test_data";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Plane } from "lucide-react";
import ProductCard from "./ProductCard";

const OrderCard = () => {
  return (
    <div className="container py-10 w-full">
        <div className="container">
            <Card className="w-full">
              <CardHeader>
                <span className="flex flex-row justify-between">
                  <CardTitle className="">Order ID: 102937</CardTitle>
                  <Dialog>
                    <DialogTrigger><Button className="w-full bg-green-900">Track Order</Button></DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Where is your parcel?</DialogTitle>
                        <DialogDescription>
                          Your package is currently being shipped
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </span>
                <span className="flex">
                  <CardDescription className="font-medium flex gap-1">Order Date: <p className="font-bold">Oct 20, 2023</p></CardDescription>
                  <Separator orientation="vertical" className="w-px h-5 mx-5"/>
                  <CardDescription className="flex gap-1 text-green-500 font-medium"><Plane /> Estimated delivery: <p className="font-bold">Oct 21, 2023</p> </CardDescription>
                </span>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                    <ScrollArea className="h-[400px] w-full rounded-md border p-4 horizontal" data-orientation="horizontal" type="hover">
                      <div className="flex flex-wrap justify-around">
                      {orders.map(({id, name, description, price, ratings, images, quantitySold})=> (
                        <ProductCard key={id}
                        id={id} 
                        name={name} 
                        description={description} 
                        price={price} 
                        ratings={ratings} 
                        images={images}
                        quantitySold={quantitySold}
                        disp={true}/>
                      ))}
                      </div>
                    </ScrollArea>
                    </div>
                    <div className="flex justify-between px-4">
                      <span className="flex flex-col space-y-1.5">
                        <span className="flex">
                          <Label className="text-slate-600">Payment Method: </Label>
                          <Label className="ml-2 font-bold">{"PayPal"}</Label>
                        </span>
                        <span className="flex">
                          <Label className="text-slate-600">Shipping Address: </Label>
                          <Label className="ml-2 font-bold">{"Manila, Metro Manila PH"}</Label>
                        </span>
                        
                      </span>
                      <span className="w-32 flex flex-col space-y-1.5">
                        <span className="flex justify-between">
                          <Label>Subtotal: </Label>
                          <Label className="text-right">${123}</Label>
                        </span>
                        <span className="flex justify-between">
                          <Label>Shipping: </Label>
                          <Label className="text-right">${123}</Label>
                        </span>
                        <Separator/>
                        <span className="flex justify-between">
                          <Label>Total: </Label>
                          <Label className="text-right">${123}</Label>
                        </span>
                      </span>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
        </div>
    </div>
  )
}

export default OrderCard