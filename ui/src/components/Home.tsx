import React, { useState,useEffect } from 'react';
import UseAxios from '../hooks/useAxios';

const Home = () => {
    // const [user, setUser] = useState(null);
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");

    const { response, loading, error } = UseAxios({
        method: 'get',
        url: search.length ? `/banks/${search}` : '/banks/favs/',
    });

    useEffect(() => {
        if (response !== null) {
            setData(response);
        }
    }, [response]);

    useEffect(()=> {
        const timeoutID = setTimeout(() => {
            setSearch(input)
        }, 2000);
        return () => clearTimeout(timeoutID);
    }, [input]);

    return (
        <div className='App'>
            <h1>Financial Institutions Search:</h1>
            <input onChange={(e)=>{setInput(e.target.value)}} type="text" placeholder="Search for a bank" />
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
                        <div>{data && <p>{data}</p>}</div>
                    </div>
                )
            }
        </div>
    );
}
export default Home;
