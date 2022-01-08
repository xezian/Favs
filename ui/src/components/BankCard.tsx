import React from 'react'
import PropTypes from 'prop-types'

interface IBankCardProps {
    bank: {[key:string]: string}
}

const BankCard = (props: IBankCardProps) => {
    const { bank } = props;
    return (
        <div className="bankCard">
            <p>{bank.NAME}</p>
        </div>
    )
}

BankCard.propTypes = {
    bank: PropTypes.object.isRequired
}

export default BankCard;
