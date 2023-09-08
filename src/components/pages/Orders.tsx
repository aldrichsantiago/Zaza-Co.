import useRefreshToken from "@/hooks/useRefreshToken";
import OrderCard from "../OrderCard";


const Orders = () => {

  useRefreshToken();

  return (
    <>
    <div className="container">
      <p className="leading-7 [&:not(:first-child)]:mt-6 font-medium text-slate-700 mx-8 my-4">My Account / Orders</p>
    </div>

      <OrderCard></OrderCard>
      <OrderCard></OrderCard>
      <OrderCard></OrderCard>
    </>
  )
}

export default Orders