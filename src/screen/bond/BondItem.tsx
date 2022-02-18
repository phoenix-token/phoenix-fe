import React from 'react'
import './index.css'
import Logo from '../../assets/image/logo.png'
import { NavLink } from 'react-router-dom'
const BondItem = () => {
    return (
        <div className='bond-item'>
            <div className='bond-item-header'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={Logo} className='bond-item-logo' />
                    <span className='bond-item-token'>USDC</span>
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
                <span className="staking-white">{`$--`}</span>
            </div>
            <div className="staking-row">
                <span>ROI</span>
                <span className="staking-white">{`--%`}</span>
            </div>
            <div className="staking-row">
                <span>Purchased</span>
                <span className="staking-white">{`$12.000.134`}</span>
            </div>
        </div>
    )
}

export default BondItem