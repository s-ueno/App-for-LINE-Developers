import { IAccount, initialAccount } from "./model";
import { IActionBase } from "../IActionBase";
import { UPDATE_ACCOUNT } from "./action";

export function accontReducer(
    state: IAccount = initialAccount,
    action: IActionBase): IAccount {
    switch (action.type) {
        case UPDATE_ACCOUNT:
            return {
                ...state,
                ...action
            };
        default:
            return state;
    }
}
