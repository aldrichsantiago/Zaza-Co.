import useRefreshToken from "@/hooks/useRefreshToken";

const Orders = () => {

  useRefreshToken();

  return (
    <div className="container py-12 w-full bg-slate-300">
        <div className="container">
            Orders
        </div>
    </div>
  )
}

export default Orders