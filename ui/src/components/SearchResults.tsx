import { AxiosResponse } from 'axios';
import React, { useState,useEffect } from 'react';
import UseAxios from '../hooks/useAxios';
import BankCard from './BankCard';

interface ISearchProps {
    search: string
}

const SearchResults = (props: ISearchProps) => {
    const { search } = props;
    // const [user, setUser] = useState(null);
    const [data, setData] = useState<AxiosResponse[]>([]);

    const { response, loading, error } = UseAxios({
        method: 'get',
        url: `/banks/${search}`,
    });

    useEffect(() => {
        if (response !== null) {
            if (response.data.length) {
                setData(response.data);
            }
        }
    }, [response]);


    return (
        <div>
            {
                loading ? (
                    <p>loading...</p>
                ) : (
                    <div>
                        {error && (
                            <div>
                                <p>{error}</p>
                            </div>
                        )}
                        <div>
                            {
                                data && data.map((item, index)=> {
                                    return <BankCard key={index} bank={item.data} />
                                })
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
}
export default SearchResults;
