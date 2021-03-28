import { richMenuObject } from "../../../models/richMenuObject";
import { useAccount } from "./useAccount";
import { useAccountUnsubscribe } from "./useAccountUnsubscribe";
import { useRichmenuObject } from "./useRichmenuObject";

export function useAccountManager() {
    const account = useAccount();
    const accountUnsubscribe = useAccountUnsubscribe(account);
    const { channel, setRichmenuObject, addRichmenuObject } = useRichmenuObject(account);

    return {
        account,
        accountUnsubscribe,

        channel, setRichmenuObject, addRichmenuObject
    };
}