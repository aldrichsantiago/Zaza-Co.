import React, { useEffect, useState } from 'react'
import { Separator } from '../ui/separator'
import axios from '@/api/axios'
import { useNavigate } from 'react-router-dom'


const DashboardCard = ({title, data, link}:{title:string, data:string, link:string}) => {
  const navigate = useNavigate()

  return (
    <div onClick={()=>navigate(link)} className='w-full md:w-1/5 h-36 p-3 rounded-xl shadow-lg hover:scale-105 hover:cursor-pointer transition-transform'>
      <h1 className='scroll-m-20 text-2xl font-semibold tracking-tight'>{title}</h1>
      <div className='w-full h-3/4 flex flex-col items-center justify-center'>
        <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight'>
          {data}
        </h2>
      </div>
    </div>

  )
}
interface DataProps {
  orderCount: string 
  productCount: string
  userCount: string 
  totalSales: string 
}

const Dashboard = () => {
  const [data, setData] = useState<DataProps[]>([])

  useEffect(() => {
    const controller = new AbortController();
    axios.get("/all", { signal: controller.signal })
    .then(res => setData(res.data))
    .catch(e => console.log(e))
    return () => {
      controller.abort();
    };
  }, [])
  console.log(data);
  
    return (
      <div className='container py-24'>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Dashboard
        </h2>
        <Separator className='my-6'/>

        <div className="px-3 py-6 flex flex-wrap gap-6 justify-between">
          <DashboardCard title={"💵 Profits"} data={data?"$"+ data[3]?.totalSales:""} link=''/>
          <DashboardCard title={"📈 Orders"} data={data?data[0]?.orderCount:""} link={`/admin/orders`}/>
          <DashboardCard title={"🛍️ Products"} data={data?data[1]?.productCount:""} link={`/admin/products`}/>
          <DashboardCard title={"👤 Users"} data={data?data[2]?.userCount:""} link={`/admin/users`}/>
        </div> 
      </div> 
      )
    
    
}

export default Dashboard