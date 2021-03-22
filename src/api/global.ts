import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

/**
 * 最大10桁までの指定桁数のランダムな数値を返します
 * @param length 桁数
 * @param myStrong 一意性への強度
 */
export function GenerateRundomNumber(length: number, myStrong?: number) {
    let strong = 1000;
    if (myStrong) strong = myStrong;
    const rundomValue =
        new Date().getTime().toString(10) +
        Math.floor(strong * Math.random()).toString(10);
    return rundomValue.substr(rundomValue.length - length);
}

/**
 * 36桁のユニークな英数字を8桁ハイフン区切りで返します
 */
export function GenerateUUID() {
    return uuidv4();
}

export async function Delay(msec: number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(null);
        }, msec)
    });
}