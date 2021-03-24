import { richMenuObject } from "../../../models/richMenuObject";
import { useAccount } from "./useAccount";
import { useAccountUnsubscribe } from "./useAccountUnsubscribe";
import { useRichmenuAdd } from "./useRichmenuAdd";
import { useRichmenuObject } from "./useRichmenuObject";



export function useAccountManager() {
    const [account, setAccount] = useAccount();
    const unsubscribe = useAccountUnsubscribe(account);
    const [richMenus, setRichMenus] = useRichmenuObject(account);
    const addMenuFunc = useRichmenuAdd();

    const addRichmenu = () => {
        const newMenu = addMenuFunc();
        const newMenus = [...richMenus, newMenu]
        setRichMenus(newMenus);
    };

    const updateRichmenu = (richmenu: richMenuObject) => {
        const arr = new Array<richMenuObject>();
        richMenus.forEach(each => {
            if (each.richMenuId === richmenu.richMenuId) {
                arr.push(richmenu);
            } else {
                arr.push(each);
            }
        });
        setRichMenus(arr);
    }
    return {
        account, setAccount,
        unsubscribe,
        richMenus, setRichMenus, addRichmenu, updateRichmenu
    };
}