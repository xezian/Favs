import { useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:1000';

interface IUseAxiosResponse {
    response: AxiosResponse|null,
    error: string,
    loading: boolean,
    fetchData: (params: AxiosRequestConfig) => Promise<void>
}

const UseAxios = ():IUseAxiosResponse => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async (params: AxiosRequestConfig) => {
        try {
            setLoading(true)
            const result = await axios.request(params);
            setResponse(result.data);
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        }
    };

    return { response, error, loading, fetchData };
};

export default UseAxios;
