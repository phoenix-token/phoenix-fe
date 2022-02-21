import BN from 'bn.js'
import { ethers } from "ethers";

export function decimalToNumber(value: string, decimal = 18, fixNumber = 3): number {
    let output = new BN(value).mul(new BN(1000000)).div(new BN(10).pow(new BN(decimal))).toNumber()
    return output / 1000000
}
export const numberToDecimals = (val: number, decimals: number): string => {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (decimals) + '})?');
    let withDecimalFraction = val.toString().match(re)[0]
    let amount = ethers.utils.parseUnits(withDecimalFraction, decimals);
    let output = ethers.utils.formatUnits(amount, 0)
    return output
}

export const formatCurrency = (value: number | string): string => {
    if (value <= 1) return value + ""
    return Boolean(value) ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";
}

export function formatTimeString(timestamp: number) {
    if (timestamp === 0) return '-'
    let date = new Date(timestamp * 1000)
    let h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    let m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    let d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    let month = date.getMonth() + 1
    //@ts-ignore
    if (month < 10) month = `0${month}`
    let y = date.getFullYear()
    return `${month}/${d}/${y} ${h}:${m} UTC`
}