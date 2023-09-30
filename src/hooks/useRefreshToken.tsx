// import { useEffect, useState } from "react";
// import jwt_decode from "jwt-decode"
import axios, { AxiosResponse } from "axios";

import useAuth from "./useAuth";
import { UseAuthProps } from "@/contexts/AuthProvider";


const useRefreshToken = () => {

    const { setAuth }:UseAuthProps = useAuth();

    const refresh = async() => {
        const res: AxiosResponse = await axios.get(`${import.meta.env.VITE_API_URL}/token`, { 
            withCredentials: true
        });

        setAuth?
        setAuth(prev => {
            // console.log(JSON.stringify(prev));
            // console.log(res.data.accessToken);
            return {
                ...prev,
                roles: [res.data.role],
                username: res.data.username,
                accessToken: res.data.accessToken,
                cart: res.data.cart, 
                wishlist: res.data.wishlist 
            }
        }) 
        : ()=>{console.log("useRefreshToken Error")}
        return res.data.accessToken
    };
    return refresh;
}
export default useRefreshToken;