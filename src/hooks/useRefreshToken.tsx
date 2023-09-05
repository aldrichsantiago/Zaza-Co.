import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";


const useRefreshToken = () => {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState('');
    const [expire, setExpire] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [role, setRole]:any = useState([]);

    const navigate = useNavigate();

    const fetchToken = () => {
        axios.get(import.meta.env.VITE_API_URL + '/token')
        .then((res: AxiosResponse) => {
            setToken(res.data.accessToken);
            const decoded: any = jwt_decode(res.data.accessToken);
            setUsername(decoded.user);
            setExpire(decoded.exp);
            setRole([decoded.role])
        })
        .catch((err: AxiosError) => {
            setError(err.message);
            navigate("/login")
        })
        .finally(() => {
            setLoading(false);
            
        });
    };

    useEffect(() => {
      fetchToken();
    }, [token])
    


    return { token, username, role, expire, loading, error };
}

export default useRefreshToken;