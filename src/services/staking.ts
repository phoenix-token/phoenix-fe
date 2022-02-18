import BN from "bn.js";
import { utils } from "near-api-js";
import { PNX_TOKEN_ID, stakingFunctionCall, stakingViewFunction, X_PNX_TOKEN_ID } from "./near";

export const transfer = (amount: string) => {
    return stakingFunctionCall({
        contractId: PNX_TOKEN_ID,
        methodName: 'ft_transfer_call',
        args: {
            receiver_id: X_PNX_TOKEN_ID,
            amount: '10000000000000000000',
            msg: '',
        }
    })
}

export const registerAccount = (accountId: string) => {
    return stakingFunctionCall({
        contractId: X_PNX_TOKEN_ID,
        methodName: 'storage_deposit',
        args: { "account_id": accountId, "registration_only": true },
    })
}