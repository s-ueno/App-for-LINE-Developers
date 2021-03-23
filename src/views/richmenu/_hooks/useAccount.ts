import {  useSelector } from "react-redux";
import { IRootState } from "../../../store/rootModel";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQueryString } from "../../../hooks/useQueryString";
import { useHistory } from "react-router";
import { useQueryId } from "./useQueryId";
import { IAccountHeader } from "../../../store/Account/model";

export function useAccount() : [IAccountHeader, Dispatch<SetStateAction<IAccountHeader>>] {    
    const [id, location] = useQueryId();
    const histroy = useHistory();

    const accounts = useSelector((state: IRootState) => state.account);
    const [account, setAccount] = useState(accounts.accounts.FirstOrDefault(x => x.id === id));

    useEffect(() => {
        setAccount(accounts.accounts.FirstOrDefault(x => x.id === id));
    }, [location]);

    return [account, setAccount];
}

