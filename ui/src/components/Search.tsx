import React, { useState,useEffect } from 'react';
import SearchResults from './SearchResults';
import Favs from './Favs';
import UseAxios from '../hooks/useAxios';

export interface IFavObject {
    name: string,
    id: string
}

const Search = () => {
    // const [user, setUser] = useState(null);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");
    const [favs, setFavs] = useState<IFavObject[]>([]);
    const { response, loading, error, fetchData } = UseAxios()

    useEffect(()=> {
        // 2 second debounce on change input setting search state
        const timeoutID = setTimeout(() => {
            setSearch(input)
        }, 2000);
        return () => clearTimeout(timeoutID);
    }, [input]);

    useEffect(()=>{
        handleRefreshFavs();
    },[])
    
    useEffect(()=>{
        if (response?.data) {
            setFavs(response.data);
        }
    },[response])

    const handleRefreshFavs = () => {
        fetchData(
            {
                method: 'get',
                url: '/favs/'
            }
        )
    }

    return (
        <div className='twoCols'>
            <div>
                <h1>Financial Institutions Search:</h1>
                <input onChange={(e)=>{setInput(e.target.value)}} type="text" placeholder="Search for a bank" />
                { search.length ? <SearchResults favs={favs.map((fav)=>fav.name)} search={search} refreshFavs={handleRefreshFavs}/> : null}
            </div>
            <div>
                <h1>Favs:</h1>
                {loading ? 'loading...' : error ? error : <Favs favs={favs}/>}
            </div>
        </div>
    );
}
export default Search;
