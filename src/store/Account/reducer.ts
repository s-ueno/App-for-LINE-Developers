import { IAccount, initialAccount, IChannel, initialChannel } from "./model";
import { IActionBase } from "../IActionBase";
import { UPDATE_ACCOUNT, UPDATE_CHANNEL } from "./action";

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

export function channelReducer(
    state: IChannel = initialChannel,
    action: IActionBase): IChannel {
    switch (action.type) {
        case UPDATE_CHANNEL:
            return {
                ...state,
                ...action
            };
        default:
            return state;
    }
}
