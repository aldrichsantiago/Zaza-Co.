import useRefreshToken from "@/hooks/useRefreshToken";
import OrderCard from "../OrderCard";
import useAxios from "@/hooks/useAxios";
import useAuth from "@/hooks/useAuth";
import { UseAuthProps } from "@/contexts/AuthProvider";
import { useEffect, useState } from "react";


const Orders = () => {
  const { auth }: UseAuthProps = useAuth();
  useRefreshToken();
  const { response, loading } = useAxios({
    method: 'get',
    url: `/orders/username/${auth.username}`,
    headers: JSON.stringify({ accept: '*/*' }),
  })
  const [data, setData] = useState([]);

    useEffect(() => {
      if (response !== null) {
        setData(response);
      }
    }, [response]);

  const uniqueIds: number[] = [];

  const unique = data.filter((element:{orderId:number}) => {
    const isDuplicate = uniqueIds.includes(element.orderId);
  
    if (!isDuplicate) {
      uniqueIds.push(element.orderId);
  
      return true;
    }
  
    return false;
  });
  
  return (
    <>
      <div className="container">
        <p className="leading-7 [&:not(:first-child)]:mt-6 font-medium text-slate-700 mx-8 my-4">My Account / Orders</p>
      
        {
          loading ? (
            <p>Loading may take a while since I'm using a free tier to host the API</p>
          ) 
          : unique.length !== 0 ?
          (
            unique?.map(({orders, orderId}) => {
              return(
              <div key={orderId}>
                <OrderCard orders={orders}/>
              </div>
              )
            })
          ):
          <h1 className="p-6 my-48 text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              No Orders
          </h1>
        }
        

      </div>
    </>
  )
}

export default Orders