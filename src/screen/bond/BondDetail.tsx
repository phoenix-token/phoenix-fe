import React from 'react'
import { Modal, Tabs } from 'antd';
import IconButton from 'component/Button/IconButton';
import { AiOutlineClose, AiFillSetting } from "react-icons/ai";
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import NumberFormat from 'react-number-format';
import Logo from '../../assets/image/logo.png'

const BondDetail = () => {
    const history = useHistory()
    const [tab, setTab] = useState(1)
    const [amountBond, setAmountBond] = useState(0)

    return (
        <div>
            <div>Detail</div>
            <Modal
                title={
                    <div className='bond-detail-header'>
                        <span>{`Bond`}</span>
                        <div>
                            <IconButton onClick={() => { history.goBack() }} >
                                <AiOutlineClose size={20} />
                            </IconButton>
                        </div>
                    </div>
                }
                closable={false}
                visible={true}
                onCancel={() => { }}
                width={600}
                footer={null}
                centered
            >
                <div>
                    <div>
                        <div className="bond-detail-header" style={{ margin: '16px auto 32px auto', maxWidth: 400 }}>
                            <div>
                                <span>Bond Price</span>
                                <span>$10</span>
                            </div>
                            <div>
                                <span>Market Price</span>
                                <span>$12</span>
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
                                                        setAmountBond(1000000)
                                                    }}>Balance: {100000}</span>
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
                                                            setAmountBond(500000)
                                                        }}>Half</span>
                                                        <img src={Logo} className='input-logo' />
                                                        <span className='token-name'>PNX</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='btn' style={{ width: '100%', marginTop: '30px' }}>
                                                Bond
                                            </div>
                                        </div>
                                        :
                                        <div className='tab-content'>

                                            <div className='btn' style={{ width: '100%' }}>
                                                Claim
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
                                                1000 PNX
                                            </span>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="staking-row">
                                            <span>Pending Rewards</span>
                                            <span className="staking-white">
                                                1000 PNX
                                            </span>
                                        </div>
                                        <div className="staking-row">
                                            <span>Claimable Rewards</span>
                                            <span className="staking-white">20 PNX</span>
                                        </div>
                                        <div className="staking-row">
                                            <span>Time until fully vested</span>
                                            <span className="staking-white">---</span>
                                        </div></>
                            }
                            <div className="staking-row">
                                <span>ROI</span>
                                <span className="staking-white">10%</span>
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