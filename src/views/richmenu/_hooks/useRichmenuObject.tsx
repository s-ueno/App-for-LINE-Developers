import { Dispatch, SetStateAction, useState } from "react";
import { useHistory } from "react-router";
import useAsyncEffect from "use-async-effect";
import { useGenericWebServiceAsync } from "../../../hooks/useGenericWebServiceAsync";
import { richMenuObject } from "../../../models/richMenuObject";
import { IAccountHeader } from "../../../store/Account/model";
import { useAccount } from "./useAccount";



export function useRichmenuObject(account : IAccountHeader) : [richMenuObject[],  Dispatch<SetStateAction<richMenuObject[]>>] {
    const histroy = useHistory();
    const webServiceAsync = useGenericWebServiceAsync();
    const [richMenus, setRichMenus] = useState<richMenuObject[]>([]);
    useAsyncEffect(async () => {
        const result = await webServiceAsync<any, { richmenus: richMenuObject[] }>(
            "api/listRichmenus", { token: account.token });
        setRichMenus(result?.richmenus ?? []);
    }, [histroy.location]);
    return [richMenus, setRichMenus];
}