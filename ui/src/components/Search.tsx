import React, { useState,useEffect } from 'react';
import SearchResults from './SearchResults';

const Search = () => {
    // const [user, setUser] = useState(null);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");

    useEffect(()=> {
        // 2 second debounce on change input setting search state
        const timeoutID = setTimeout(() => {
            setSearch(input)
        }, 2000);
        return () => clearTimeout(timeoutID);
    }, [input]);

    return (
        <div>
            <h1>Financial Institutions Search:</h1>
            <input onChange={(e)=>{setInput(e.target.value)}} type="text" placeholder="Search for a bank" />
            { search.length ? <SearchResults search={search}/> : null}
        </div>
    );
}
export default Search;
