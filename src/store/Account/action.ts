import { IAccount } from "./model";
import { IActionBase } from "../IActionBase";

export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
interface IAccountType extends IAccount, IActionBase { }
export function UpdateAccount(
    accounts: IAccount
): IAccountType {
    return { type: UPDATE_ACCOUNT, ...accounts };
}
