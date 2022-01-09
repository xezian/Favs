import React, {useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import UseAxios from '../hooks/useAxios';

interface IBankCardProps {
    bank: {[key:string]: string},
    faved: boolean,
    refreshFavs: () => void
}

const BankCard = (props: IBankCardProps) => {
    const { bank, faved, refreshFavs } = props;
    const { response, loading, error, fetchData } = UseAxios()

    const handleClick = (bankNAME:string)=> {
        fetchData({
            method: 'post',
            url: `/fav/${bankNAME}`
        })
    }

    useEffect(()=> {   
        if(response !== null) {
            console.log(response)
            refreshFavs()
        }
    }, [response])

    return (
        <div className="bankCard">
            <p>
                {bank.NAME}
            </p>
            <div className="clickRow" onClick={(e)=>{handleClick(bank.NAME)}}>
                <span className="clickEmoji">
                    {
                        faved ? '💚' : '🤍'
                    }
                </span>
            </div>
        </div>
    )
}

BankCard.propTypes = {
    bank: PropTypes.object.isRequired
}

export default BankCard;
