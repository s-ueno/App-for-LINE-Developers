import { IAccount, IChannel } from "./model";
import { IActionBase } from "../IActionBase";

export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
interface IAccountType extends IAccount, IActionBase { }
export function UpdateAccount(
    accounts: IAccount
): IAccountType {
    return { type: UPDATE_ACCOUNT, ...accounts };
}


export const UPDATE_CHANNEL = "UPDATE_CHANNEL";
interface IChannelType extends IChannel, IActionBase { }
export function UpdateChannel(channel: IChannel): IChannelType {
    return { type: UPDATE_CHANNEL, ...channel };
}