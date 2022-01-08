import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:1000';

interface IUseAxiosArguments {
    url: string,
    method: string,
    body?: string|null,
    headers?: string|null
}

interface IUseAxiosResponse {
    response: AxiosResponse|null,
    error: string,
    loading: boolean
}

const UseAxios = ({ url, method, body = null, headers = null }: IUseAxiosArguments):IUseAxiosResponse => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        switch(method) {
            case 'get':
                setLoading(true)
                axios.get(url)
                .then((res) => {
                    setResponse(res.data);
                })
                .catch((err) => {
                    setError(err);
                })
                .finally(() => {
                    setLoading(false);
                });
                break;
            case 'post':
                if (headers !== null && body !== null) {
                    setLoading(true)
                    axios.post(url, JSON.parse(headers), JSON.parse(body))
                        .then((res) => {
                            setResponse(res.data);
                        })
                        .catch((err) => {
                            setError(err);
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                }
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        fetchData();
    }, [method, url, body, headers]);

    return { response, error, loading };
};

export default UseAxios;
