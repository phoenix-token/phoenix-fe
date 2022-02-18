import BN from 'bn.js'
import { ethers } from "ethers";

export function decimalToNumber(value: string, decimal = 18, fixNumber = 3): number {
    let output = new BN(value).mul(new BN(1000000)).div(new BN(10).pow(new BN(decimal))).toNumber()
    console.log("output::", output)
    return output / 1000000
}
export const numberToDecimals = (val: number, decimals: number): string => {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (decimals) + '})?');
    let withDecimalFraction = val.toString().match(re)[0]
    let amount = ethers.utils.parseUnits(withDecimalFraction, decimals);
    let output = ethers.utils.formatUnits(amount, 0)
    return output
}