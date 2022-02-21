import React, { useEffect, useState } from 'react'
import './index.css'
import USDTLogo from '../../assets/image/usdt_logo.svg'
import { NavLink } from 'react-router-dom'

import { wallet, PNX_TOKEN_ID, X_PNX_TOKEN_ID, near, BONDING_CONTRACT_ID, USDT_TOKEN_ID } from '../../services/near';
import { decimalToNumber, numberToDecimals } from 'utils/Util';

const BondItem = () => {

    const [bondPrice, setBondPrice] = useState(0)
    const [purchased, setPurchased] = useState(0)

    const getROI = () => {
        if (bondPrice > 0) {
            return ((1.2 / bondPrice - 1) * 100).toFixed(3)
        } else {
            return '--'
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const bond_price = await wallet.account().viewFunction(BONDING_CONTRACT_ID, "get_bond_price",
            {
                token_payment: USDT_TOKEN_ID,
                token_pure_supply: "30000000000000000000",
            });
        setBondPrice(decimalToNumber(bond_price.toString()))

        const purchased = await wallet.account().viewFunction(BONDING_CONTRACT_ID, "get_total_deposit",
            {
                token_payment: USDT_TOKEN_ID,
            });
        setPurchased(decimalToNumber(purchased.toString()))
    }

    return (
        <div className='bond-item'>
            <div className='bond-item-header'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={USDTLogo} className='bond-item-logo' />
                    <span className='bond-item-token'>USDT</span>
                </div>
                <NavLink
                    to={'/bond/1'}
                >
                    <div className='bond-btn'>
                        Bond
                    </div>
                </NavLink>
            </div>
            <div className="staking-row">
                <span>Price</span>
                <span className="staking-white">${bondPrice}</span>
            </div>
            <div className="staking-row">
                <span>ROI</span>
                <span className="staking-white">{getROI()}%</span>
            </div>
            <div className="staking-row">
                <span>Purchased</span>
                <span className="staking-white">${purchased}</span>
            </div>
        </div>
    )
}

export default BondItem