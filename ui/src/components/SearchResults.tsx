import { AxiosResponse } from 'axios';
import React, { useState,useEffect } from 'react';
import UseAxios from '../hooks/useAxios';
import BankCard from './BankCard';

interface ISearchResultsProps {
    search: string,
    favs: string[],
    refreshFavs: () => void
}

const SearchResults = (props: ISearchResultsProps) => {
    const { search, favs, refreshFavs } = props;
    // const [user, setUser] = useState(null);
    const [data, setData] = useState<AxiosResponse[]>([]);

    const { response, loading, error, fetchData } = UseAxios();

    useEffect(() => {
        fetchData({
            method: 'get',
            url: `/banks/${search}`,
        })
    }, [search]);

    useEffect(() => {
        if (response !== null) {
            if (response.data.length) {
                setData(response.data);
            }
        }
    }, [response]);

    const handleRefreshFavs = () => {
        refreshFavs();
    }


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
                                    return <BankCard faved={favs.includes(item.data.NAME)} refreshFavs={handleRefreshFavs} key={index} bank={item.data} />
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
