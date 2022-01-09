import React from 'react';
import { IFavObject } from './Search';

interface IFavsArguments {
    favs: IFavObject[]
}

const Favs = (props: IFavsArguments) => {
    const { favs } = props

    return (
        <div>
            {
                favs && favs.map((item, index)=> {
                    return <div className="bankCard" key={index}>{item.name}</div>
                })
            }
        </div>
    );
}
export default Favs;
