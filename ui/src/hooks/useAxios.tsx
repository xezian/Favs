import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:1000';

interface IUseAxiosArguments {
    url: string,
    method: string,
    body?: string|null,
    headers?: string|null
}

const UseAxios = ({ url, method, body = null, headers = null }: IUseAxiosArguments) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        switch(method) {
            case 'get':
                axios.get(url)
                    .then((res) => {
                        setResponse(res.data);
                    })
                    .catch((err) => {
                        setError(err);
                    })
                    .finally(() => {
                        setloading(false);
                    });
                break;
            case 'post':
                if (headers !== null && body !== null) {
                    axios.post(url, JSON.parse(headers), JSON.parse(body))
                        .then((res) => {
                            setResponse(res.data);
                        })
                        .catch((err) => {
                            setError(err);
                        })
                        .finally(() => {
                            setloading(false);
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
