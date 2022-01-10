import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import UseAxios from '../hooks/useAxios';
import { IBankInfo } from './BankCard';

export interface IFavInfo extends IBankInfo {
    id: number
}

interface IFavsArguments {
    favs: IFavInfo[]
    refreshFavs: () => void
}

const Favs = (props: IFavsArguments) => {
    const { favs, refreshFavs } = props
    const [hovered, setHovered] = useState(0);

    const {response, fetchData} = UseAxios();

    const handleClick = (bank:IBankInfo) => {
        fetchData({
            url: `/fav/`,
            method: 'post',
            params: bank
        })
    }

    useEffect(()=> {
        if(response !== null) {
            refreshFavs();
        }
    }, [response])

    return (
        <div>
            {
                favs && favs.map((item, index)=> {
                    return (
                        <div onMouseEnter={()=>setHovered(item.id)} onMouseLeave={()=>setHovered(0)} key={index} className="favRow">
                            <span onClick={()=>handleClick(item)} className='clickEmoji'>{hovered === item.id ? '🚮' : null}</span>
                            <Link to={`/bank/${item.id}`}>
                                <div className="bankCard">
                                    {item.NAME}
                                </div>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    );
}
export default Favs;
