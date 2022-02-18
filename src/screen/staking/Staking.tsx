import React from 'react'
import './index.css'
import { useState } from 'react';
import NumberFormat from 'react-number-format';
import Logo from '../../assets/image/logo.png'
import { useEffect } from 'react';
import { wallet, PNX_TOKEN_ID, X_PNX_TOKEN_ID, near } from '../../services/near';
import { decimalToNumber, numberToDecimals } from 'utils/Util';
import { registerAccount, transfer } from 'services/staking';
import { BN } from 'bn.js';

const Staking = () => {
    const [tab, setTab] = useState(1)
    const [amountStake, setAmountStake] = useState(0)
    const [time, setTime] = useState(7)
    const [xTokenBalance, setXtokenBalance] = useState(null)
    const [balance, setBalance] = useState(0)

    async function fetchData() {
        if (wallet.isSignedIn()) {
            console.log("balance::", wallet.getAccountId())
            let pnx_balance = await wallet.account().viewFunction(PNX_TOKEN_ID, "ft_balance_of", { "account_id": wallet.getAccountId() });
            console.log("pnx_balance::", pnx_balance)
            setBalance(decimalToNumber(pnx_balance))

            let metadata = await wallet.account().viewFunction(PNX_TOKEN_ID, "ft_metadata");
            console.log("PNX token data::", metadata)
            let metadatax = await wallet.account().viewFunction(X_PNX_TOKEN_ID, "ft_metadata");
            console.log("xPNX token data::", metadatax)
            let txResult = await near.connection.provider.txStatus('CYUHUohoWffkZjStt2btLjogm8zdS9oUs7PaZ2nvVpz3', wallet.getAccountId())
            console.log('txResult:::', txResult)

            const storage_balance = await wallet.account().viewFunction(X_PNX_TOKEN_ID, "storage_balance_of", {"account_id": wallet.getAccountId()});
            setXtokenBalance(storage_balance)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const deposit = async() => {
       let result = await transfer(numberToDecimals(amountStake, 18))
    }

    const register = async() => {
        registerAccount(wallet.getAccountId())
    }

    return (
        <div>
            <div className='stake-header'>
                <div>Stake PNX</div>
                <div>Required minimum amount 100 PNX and you must deposit at least 7 days or at most 2 years</div>
            </div>

            <div className='stake-tvd'>
                <div>
                    <div className='tvd-title'>APY</div>
                    <div className='tvd-value'>1,012.45%</div>
                </div>
                <div>
                    <div className='tvd-title'>TVD</div>
                    <div className='tvd-value'>$19,000,450</div>
                </div>
            </div>

            <div className='stake-main'>
                <div className='tabs'>
                    <div onClick={() => setTab(1)} className={tab === 1 ? 'tab tab-active' : 'tab'}>Stake</div>
                    <div onClick={() => setTab(2)} className={tab === 2 ? 'tab tab-active' : 'tab'}>Unstake</div>
                </div>

                {
                    tab === 1 ?
                        <div>
                            <div className='tab-content'>
                                <div className='input-amount'>
                                    <div className='input-top'>
                                        <span>Lock PNX tokens</span>
                                        <span onClick={() => {
                                            setAmountStake(balance)
                                        }}>Balance: {balance}</span>
                                    </div>
                                    <div className='input-number'>
                                        <NumberFormat
                                            value={amountStake}
                                            placeholder='0.0'
                                            className='flex-max number-format'
                                            onValueChange={(values) => {
                                                const { formattedValue, value } = values;
                                                setAmountStake(parseFloat(value));
                                            }}
                                        />
                                        <div>
                                            <span className='half' onClick={() => {
                                                setAmountStake(balance / 2)
                                            }}>Half</span>
                                            <img src={Logo} className='input-logo' />
                                            <span className='token-name'>PNX</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='input-amount'>
                                        <div className='input-top'>
                                            <span>Lock time</span>
                                            <span>7 Days - 2 Years</span>
                                        </div>

                                        <div className='input-number'>
                                            <NumberFormat
                                                placeholder='0.0'
                                                className='flex-max number-format'
                                            />
                                            <div>
                                                <span className='token-name'>Days</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='select-time'>
                                        <span onClick={() => {
                                            setTime(7)
                                        }}>7 Days</span>
                                        <span onClick={() => {
                                            setTime(90)
                                        }}>3 Month</span>
                                        <span onClick={() => {
                                            setTime(360)
                                        }}>12 Month</span>
                                        <span onClick={() => {
                                            setTime(720)
                                        }}>24 Month</span>
                                    </div>
                                </div>
                                <div className="staking-margin">
                                    <div className="staking-row">
                                        <span>Estimated xUP staked</span>
                                        <span className="staking-green">{1000}</span>
                                    </div>

                                    <div className="staking-row">
                                        <span>Unlock after</span>
                                        <span className="staking-green">
                                            {`----`}
                                        </span>
                                    </div>
                                </div>

                                <div className='btn'
                                    onClick={() => {
                                        if(xTokenBalance) {
                                            deposit()
                                        } else {
                                            register()
                                        }
                                    }}
                                >
                                    {
                                        xTokenBalance == null ? "Approve" : "Deposit"
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div className='tab-content'>
                            <div className="staking-margin">
                                <p className="unstake-text ">When you unstake, you will receive:</p>
                                <div className="staking-row">
                                    <span>Your locked:</span>
                                    <span>{`---`} PNX</span>
                                </div>
                                <div className="staking-row">
                                    <span>Stake reward:</span>
                                    <span>{'---'} xPNX</span>
                                </div>

                                <div className="staking-row">
                                    <span>Total Unstake:</span>
                                    <span style={{ color: "#FF8B37" }}>{`---`} PNX</span>
                                </div>
                            </div>
                            <div className='btn'>
                                Unstake
                            </div>
                        </div>

                }
            </div>
            <div className='staked'>
                <div className="staking-row">
                    <span>Your UPS locked</span>
                    <span className="staking-white">{0} PNX (~ {0} xPNX)
                    </span>
                </div>
                <div className="staking-row">
                    <span>Your staked balance</span>
                    <span className="staking-white">
                        1000
                    </span>
                </div>
                <div className="staking-row">
                    <span>Unlock after</span>
                    <span className="staking-white">{`----`}</span>
                </div>
                <div className="staking-row">
                    <span>ROI (5-Day Rate)</span>
                    <span className="staking-white">{`--`} %</span>
                </div>
            </div>

            <div className='staked'>
                <div className="staking-row">
                    <span>1% Platfom Fee</span>
                    <span>0% Deposit Fee</span>
                    <span>0% Withdraw Fee</span>
                </div>
                <div className="staking-row">
                    <span>50% Early unlock penalty fee</span>
                </div>

            </div>
        </div>
    )
}

export default Staking