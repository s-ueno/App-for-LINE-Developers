import { richMenuObject } from "../../../models/richMenuObject";
import { useAccount } from "./useAccount";
import { useAccountUnsubscribe } from "./useAccountUnsubscribe";
import { useRichmenuObject } from "./useRichmenuObject";

export function useAccountManager() {
    const account = useAccount();
    const unsubscribe = useAccountUnsubscribe(account);

    const { channel, setRichmenuObject, addRichmenuObject } = useRichmenuObject(account);

    return {
        account,
        unsubscribe,
        channel, setRichmenuObject, addRichmenuObject
    };
}