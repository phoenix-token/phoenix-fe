import React, { useEffect, useState } from "react";
import * as nearAPI from "near-api-js";
import { wallet, DEMO_CONTRACT_ID, demoSendMoney } from '../../services/near';
import { getDemoNumber, increment, updateManualy } from "../../services/demo";
import { BN } from "bn.js";

const Demo = () => {
    const [num, setNum] = useState(0)

    useEffect(() => {
        getDemoNumber().then((res) => {
            console.log('getDemoNumber::', res)
            setNum(res)
        })
    }, [])

    const demoIncrement = () => {
        increment()
    }

    const demoSend = () => {
        demoSendMoney()
    }

    const update = () => {
        updateManualy(10)
    }

    return (
        <div>
            <div>
                {wallet.isSignedIn() ? (
                    <div
                        className="flex items-center"
                    >
                        <div>{wallet.getAccountId()}</div>
                    </div>
                ) : (
                    <button
                        onClick={() => wallet.requestSignIn(DEMO_CONTRACT_ID)}
                    >
                        Connect near wallet
                    </button>
                )}

                <button
                    onClick={() => demoIncrement()}
                >
                    Increment
                </button>

                <button
                    onClick={() => update()}
                >
                    Update
                </button>
                <button
                    onClick={() => demoSend()}
                >
                    Send money
                </button>
            </div>
            <span style={{
            }}>Number:: {num}</span>
        </div>
    )
}

export default Demo