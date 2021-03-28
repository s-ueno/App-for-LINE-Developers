import { useSelector } from "react-redux";
import { IRootState } from "../../../store/rootModel";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQueryString } from "../../../hooks/useQueryString";
import { useHistory } from "react-router";
import { useQueryId } from "./useQueryId";
import { IAccountHeader } from "../../../store/Account/model";

// export function useAccount(): [IAccountHeader, Dispatch<SetStateAction<IAccountHeader>>] {
//     const [id, location] = useQueryId();
//     const accounts = useSelector((state: IRootState) => state.account);
//     const [account, setAccount] = useState(accounts.accounts.FirstOrDefault(x => x.id === id));

//     useEffect(() => {
//         if (account.id === id) return;

//         setAccount(accounts.accounts.FirstOrDefault(x => x.id === id));
//     }, [id, accounts]);

//     return [account, setAccount];
// }

export function useAccount() {
    const [id, location] = useQueryId();
    const accounts = useSelector((state: IRootState) => state.account);
    let account = accounts.accounts.FirstOrDefault(x => x.id === id);

    useEffect(() => {
        if (String.IsNullOrWhiteSpace(id)) return;
        if (account.id === id) return;
        account = accounts.accounts.FirstOrDefault(x => x.id === id);
    }, [id, accounts]);

    return account;
}
