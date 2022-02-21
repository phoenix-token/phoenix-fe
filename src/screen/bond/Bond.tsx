import React, { useEffect, useState } from 'react'
import BondItem from './BondItem'
import { wallet, PNX_TOKEN_ID, X_PNX_TOKEN_ID, near, BONDING_CONTRACT_ID, USDT_TOKEN_ID } from '../../services/near';
import { decimalToNumber } from 'utils/Util';

const Bond = () => {
    const [purchased, setPurchased] = useState(0)
    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const purchased = await wallet.account().viewFunction(BONDING_CONTRACT_ID, "get_total_deposit",
            {
                token_payment: USDT_TOKEN_ID,
            });
        console.log(purchased)
        setPurchased(decimalToNumber(purchased.toString()))
    }
    return (
        <div>
            <div className='bond-title'>Bond</div>
            <div className='stake-tvd'>
                <div>
                    <div className='tvd-title'>Treasury</div>
                    <div className='tvd-value'>${purchased}</div>
                </div>
                <div>
                    <div className='tvd-title'>PNX Price</div>
                    <div className='tvd-value'>$1.2</div>
                </div>
            </div>
            <div>
                <BondItem/>
            </div>
        </div>
    )
}

export default Bond