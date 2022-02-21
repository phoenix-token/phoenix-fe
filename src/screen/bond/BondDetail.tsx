import React, { useEffect } from 'react'
import { Modal, Tabs } from 'antd';
import IconButton from 'component/Button/IconButton';
import { AiOutlineClose, AiFillSetting } from "react-icons/ai";
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import NumberFormat from 'react-number-format';
import Logo from '../../assets/image/usdt_logo.svg'
import { wallet, PNX_TOKEN_ID, X_PNX_TOKEN_ID, near, BONDING_CONTRACT_ID, USDT_TOKEN_ID } from '../../services/near';
import { decimalToNumber, formatTimeString, numberToDecimals } from 'utils/Util';
import PrimaryButton from 'component/Button/PrimaryButton';
import CountUp from 'react-countup';

const BondDetail = () => {
    const history = useHistory()
    const [tab, setTab] = useState(1)
    const [amountBond, setAmountBond] = useState(0)
    const [usdtBalance, setUSDTBalance] = useState(0)
    const [bondPrice, setBondPrice] = useState(0)
    const [bondHolder, setBondHolder] = useState(null)

    const claim = () => {
        wallet.account().functionCall({
            contractId: BONDING_CONTRACT_ID,
            methodName: "redeem",
            args: {
                token_payment: USDT_TOKEN_ID,
            },
            //@ts-ignore
            gas: "300000000000000",
        });
    }

    const deposit = () => {
        wallet.account().functionCall({
            contractId: USDT_TOKEN_ID,
            methodName: "ft_transfer_call",
            args: {
                receiver_id: "bond.zus.testnet",
                amount: numberToDecimals(amountBond, 18),
                msg: "",
            },
            //@ts-ignore
            attachedDeposit: '1',
            //@ts-ignore
            gas: "300000000000000",
        });
    }

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
        if (wallet.isSignedIn()) {
            let usdt_balance = await wallet.account().viewFunction(USDT_TOKEN_ID, "ft_balance_of", { "account_id": wallet.getAccountId() });
            setUSDTBalance(decimalToNumber(usdt_balance))

            const bond_holder = await wallet.account().viewFunction(BONDING_CONTRACT_ID, "get_bond_holder", {
                token_payment: "usdt_test.zus.testnet",
                sender: wallet.getAccountId(),
            });

            if (bond_holder) {
                let dump5Mins = Date.now() / 1000 + 300
                let claimableNow = 0
                let claimable5Mins = 0

                let payout = decimalToNumber(bond_holder.payout_remaining.toString())
                let vesting = bond_holder.vesting_period / 1000000000
                let lastTime = decimalToNumber(bond_holder.last_time.toString(), 9)
                if (vesting != 0) {
                    claimableNow = payout / vesting * (Date.now() / 1000 - lastTime)
                    claimable5Mins = payout / vesting * (dump5Mins - lastTime)
                    if (claimableNow > payout) claimableNow = payout
                    if (claimable5Mins > payout) claimable5Mins = payout
                }

                //{"value_remaining":12000000000000000000,
                // "payout_remaining":12000000000000000000,
                // "vesting_period":18000,
                // "last_time":1645412624102066988,
                // "price_paid":1000000000000000000}

                setBondHolder({
                    payout,
                    vesting,
                    lastTime,
                    pricePaid: 0,
                    claimableNow,
                    claimable5Mins,
                })
            }

        }

        const bond_price = await wallet.account().viewFunction(BONDING_CONTRACT_ID, "get_bond_price",
            {
                token_payment: USDT_TOKEN_ID,
                token_pure_supply: "30000000000000000000",
            });
        setBondPrice(decimalToNumber(bond_price.toString()))


    }

    return (
        <div>
            <div>Detail</div>
            <Modal
                title={
                    <div className='bond-detail-header'>
                        <span>{`USDT Bond`}</span>
                        <div>
                            <IconButton onClick={() => { history.push('/bond') }} >
                                <AiOutlineClose size={20} />
                            </IconButton>
                        </div>
                    </div>
                }
                closable={false}
                visible={true}
                onCancel={() => { }}
                width={500}
                footer={null}
                centered
            >
                <div>
                    <div>
                        <div className="bond-detail-header" style={{ margin: '16px auto 32px auto', maxWidth: 400 }}>
                            <div>
                                <span>Bond Price</span>
                                <span>${bondPrice}</span>
                            </div>
                            <div>
                                <span>Market Price</span>
                                <span>$1.2</span>
                            </div>
                        </div>
                        <div className='bond-content'>
                            <div className='tabs'>
                                <div onClick={() => setTab(1)} className={tab === 1 ? 'tab tab-active' : 'tab'}>Bond</div>
                                <div onClick={() => setTab(2)} className={tab === 2 ? 'tab tab-active' : 'tab'}>Redeem</div>
                            </div>
                            <div>
                                {
                                    tab === 1 ?
                                        <div className='tab-content'>
                                            <div className='input-amount'>
                                                <div className='input-top'>
                                                    <span>Input</span>
                                                    <span onClick={() => {
                                                        setAmountBond(usdtBalance)
                                                    }}>Balance: {usdtBalance}</span>
                                                </div>
                                                <div className='input-number'>
                                                    <NumberFormat
                                                        value={amountBond}
                                                        placeholder='0.0'
                                                        className='flex-max number-format'
                                                        onValueChange={(values) => {
                                                            const { formattedValue, value } = values;
                                                            setAmountBond(parseFloat(value));
                                                        }}
                                                    />
                                                    <div>
                                                        <span className='half' onClick={() => {
                                                            setAmountBond(usdtBalance / 2)
                                                        }}>Half</span>
                                                        <img src={Logo} className='input-logo' />
                                                        <span className='token-name'>USDT</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='btn' style={{ width: '100%', marginTop: '30px' }}>
                                                <PrimaryButton
                                                    status={'enable'}
                                                    action={() => deposit()}
                                                >
                                                    Bond
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                        :
                                        <div className='tab-content'>
                                            <div className='btn' style={{ width: '100%' }}>
                                                <PrimaryButton
                                                    status={'enable'}
                                                    action={() => claim()}
                                                >
                                                    Claim
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                        <div className='staked'>
                            {
                                tab === 1 ?
                                    <>
                                        <div className="staking-row">
                                            <span>You Will Get</span>
                                            <span className="staking-white">
                                                {amountBond / bondPrice} PNX
                                            </span>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="staking-row">
                                            <span>Pending Rewards</span>
                                            <span className="staking-white">
                                                {
                                                    bondHolder ? bondHolder.payout : 0
                                                } PNX
                                            </span>
                                        </div>
                                        <div className="staking-row">
                                            <span>Claimable Rewards</span>
                                            <span>
                                                <CountUp
                                                    start={bondHolder ? bondHolder.claimableNow : 0}
                                                    end={bondHolder ? bondHolder.claimable5Mins : 0}
                                                    decimals={6}
                                                    duration={300} //5min in second
                                                    separator={','}
                                                >
                                                    {({ countUpRef }) => (
                                                        <div>
                                                            <span ref={countUpRef} /> PNX
                                                        </div>
                                                    )}
                                                </CountUp>
                                            </span>
                                        </div>
                                        <div className="staking-row">
                                            <span>Time until fully vested</span>
                                            <span className="staking-white">
                                                {formatTimeString(bondHolder ? (bondHolder.lastTime + bondHolder.vesting) : 0)}
                                            </span>
                                        </div></>
                            }
                            <div className="staking-row">
                                <span>ROI</span>
                                <span className="staking-white">{getROI()}%</span>
                            </div>
                            <div className="staking-row">
                                <span>Vesting Term</span>
                                <span className="staking-white">5 Days</span>
                            </div>
                        </div>


                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default BondDetail