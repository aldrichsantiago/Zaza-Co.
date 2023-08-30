import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

const useAxios = ({ url, method, body = null, headers = null }: { url: string, method: Methods, body: string | null, headers: string | null,  }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios[method](url, JSON.parse(headers || '{}'), JSON.parse(body || '{}'))
            .then((res: AxiosResponse) => {
                setResponse(res.data);
            })
            .catch((err: AxiosError) => {
                setError(err.message);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [method, url, body, headers]);

    return { response, error, loading };
};

export default useAxios;