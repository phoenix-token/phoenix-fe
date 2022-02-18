import { Near, keyStores, utils } from 'near-api-js';
import getConfig from "../config/config";
import SpecialWallet from "./SpecialWallet";
import BN from 'bn.js';

const config = getConfig('testnet')

export const near = new Near({
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    headers: {},
    ...config,
});

export const DEMO_CONTRACT_ID = config.DEMO_CONTRACT_ID
export const PNX_TOKEN_ID = config.PNX_TOKEN_ID
export const X_PNX_TOKEN_ID = config.X_PNX_TOKEN_ID
export const STAKING_CONTRACT_ID = config.STAKING_CONTRACT_ID
export const APP_KEY_PREFIX = 'bond-staking-app'
export const wallet = new SpecialWallet(near, APP_KEY_PREFIX);

export const getGas = (gas: string) =>
    gas ? new BN(gas) : new BN('100000000000000');
export const getAmount = (amount: string) =>
    amount ? new BN(utils.format.parseNearAmount(amount)) : new BN('0');

export interface DemoViewFunctionOptions {
    methodName: string;
    args?: object;
}

export interface DemoFunctionCallOptions extends DemoViewFunctionOptions {
    gas?: string;
    amount?: string;
}

export const demoFunctionCall = ({
    methodName,
    args,
    gas,
}: DemoFunctionCallOptions) => {
    return wallet
        .account()
        .functionCall(
            {
                contractId: DEMO_CONTRACT_ID,
                methodName,
                args,
                gas: getGas(gas)
            }
        );
};

export const demoViewFunction = ({
    methodName,
    args,
}: DemoViewFunctionOptions) => {
    return wallet.account().viewFunction(DEMO_CONTRACT_ID, methodName, args);
};

export const demoSendMoney = () => {
    return wallet.account().sendMoney('baunvb.testnet', new BN(1000000000))
}

export interface StakingViewFunctionOptions {
    contractId: string;
    methodName: string;
    args?: object;
}

export interface StakingFunctionCallOptions extends StakingViewFunctionOptions {
    gas?: string;
    amount?: string;
    attachedDeposit?: string
}

export const stakingFunctionCall = ({
    contractId,
    methodName,
    attachedDeposit,
    args,
    gas,
}: StakingFunctionCallOptions) => {
    return wallet
        .account()
        .functionCall(
            {
                contractId,
                methodName,
                //@ts-ignore
                attachedDeposit,
                args,
                gas: getGas(gas)
            }
        );
};

export const stakingViewFunction = ({
    contractId,
    methodName,
    args,
}: StakingViewFunctionOptions) => {
    return wallet.account().viewFunction(contractId, methodName, args);
};
