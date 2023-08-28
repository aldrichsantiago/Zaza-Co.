import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Settings, Users, ScrollText  } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <>
        <div className='w-full sm:w-1/6 h-screen px-6 py-8 bg-slate-50'>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl text-green-900 mb-12">
            Zaza Co.
        </h1>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className='border-none'>
                    <AccordionTrigger className='hover:no-underline hover:text-slate-700 flex justify-start'><LayoutDashboard className='m-3'/><p className='mx-1'>Dashboard</p></AccordionTrigger>
                    <AccordionContent className='px-1 flex justify-center items-center'>
                        <Button variant="ghost" className='w-full'>Overview</Button>
                        <Button variant="ghost" className='w-full'>Analytics</Button>
                        <Button variant="ghost" className='w-full'>Report</Button>
                        
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="flex flex-col gap-2 text-left m-auto">
                <div className='w-full flex items-center'>
                    <ScrollText className='mx-3'/>
                    <Button variant="ghost" className='mx-1 w-full'>Logs</Button>
                </div>
                <div className='w-full flex items-center justify-start'>
                    
                    <Users className='mx-3'/>
                    <Button variant="ghost" className='mx-1 w-full'>Users</Button>
                </div>
                <div className='w-full flex items-center justify-start'>
                    
                    <Settings className='mx-3'/>
                    <Button variant="ghost" className='mx-1 w-full'>Settings</Button>
                </div>
                
            </div>


        </div>
    </>

  )
}

export default Sidebar