import React from "react";
import Logo from '../../assets/image/logo.png'
import { APP_KEY_PREFIX, DEMO_CONTRACT_ID, wallet } from '../../services/near';

import './index.css'
const Header = () => {
    return (
        <div className="header">
            <div>
                <img src={Logo} alt="" />
                <span className="app-name">PHOENIX</span>
            </div>
            {wallet.isSignedIn() ? (
                <div className='bond-btn'>
                    {wallet.getAccountId()}
                </div>

            ) : (
                <div className='bond-btn'
                    onClick={() => wallet.requestSignIn(DEMO_CONTRACT_ID)}
                >
                    Connect near wallet
                </div>
            )}

        </div>
    )
}

export default Header