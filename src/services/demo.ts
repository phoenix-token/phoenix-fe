import BN from "bn.js";
import { demoFunctionCall, demoViewFunction } from "./near";

export const getDemoNumber = () => {
    return demoViewFunction({
        methodName: 'get_num',
    });
};

export const increment = () => {
    return demoFunctionCall({
        methodName: 'increment',
    })
}

export const updateManualy = (amount: number) => {
    return demoFunctionCall({
        methodName: 'update',
        args: {
            amount
        }
    })
}