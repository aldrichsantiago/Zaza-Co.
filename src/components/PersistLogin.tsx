import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { UseAuthProps } from "@/contexts/AuthProvider";
import LoadingScreen from "./LoadingScreen";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth }: UseAuthProps = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => {isMounted = false;}
    }, [])

    useEffect(() => {
        // console.log(`isLoading: ${isLoading}`)
        // console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            { isLoading
                    ? <LoadingScreen/>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin