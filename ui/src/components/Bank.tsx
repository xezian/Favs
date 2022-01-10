import React, {useEffect} from 'react';
import {useParams} from 'react-router';
import UseAxios from '../hooks/useAxios';

const Bank = () => {
    const {bankId} = useParams();
    const {response, fetchData} = UseAxios();

    useEffect(()=> {
        fetchData({
            url: `/bank/${bankId}`,
        })
    },[])

    useEffect(() => {
        if(response !== null) {
            console.log(response.data);
        }
    }, [response])

    return (
        <>Hey {bankId}</>
    )
}

export default Bank;
