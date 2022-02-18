import React from 'react'
import BondItem from './BondItem'

const Bond = () => {
    return (
        <div>
            <div className='bond-title'>Bond</div>
            <div className='stake-tvd'>
                <div>
                    <div className='tvd-title'>Treasury</div>
                    <div className='tvd-value'>$2,130,517</div>
                </div>
                <div>
                    <div className='tvd-title'>PNX Price</div>
                    <div className='tvd-value'>$15</div>
                </div>
            </div>
            <div>
                <BondItem/>
            </div>
        </div>
    )
}

export default Bond