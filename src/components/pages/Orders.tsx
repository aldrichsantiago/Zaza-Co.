import useRefreshToken from "@/hooks/useRefreshToken";
import OrderCard from "../OrderCard";
import useAxios from "@/hooks/useAxios";
import useAuth from "@/hooks/useAuth";
import { UseAuthProps } from "@/contexts/AuthProvider";
import { useEffect, useState } from "react";


const Orders = () => {
  const { auth }: UseAuthProps = useAuth();
  useRefreshToken();
  const { response, loading }: any = useAxios({
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

  const uniqueIds: any = [];

  const unique = data.filter((element:any) => {
    const isDuplicate = uniqueIds.includes(element.orderId);
  
    if (!isDuplicate) {
      uniqueIds.push(element.orderId);
  
      return true;
    }
  
    return false;
  });
  console.log(unique);
  
  return (
    <>
      <div className="container">
        <p className="leading-7 [&:not(:first-child)]:mt-6 font-medium text-slate-700 mx-8 my-4">My Account / Orders</p>
      </div>
        {loading ? (
          <p>loading...</p>
        ) : (
          unique?.map(({orders, orderId}:any) => {
            
            return(
            <div key={orderId}>
              <OrderCard orders={orders}/>
            </div>
            )
            

          })
        )}
        


    </>
  )
}

export default Orders