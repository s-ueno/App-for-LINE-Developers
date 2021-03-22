import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncEffect } from "use-async-effect";
import { useToast } from "../../../core/extensions/SnackbarExtension";
import { UpdateAccount } from "../../../store/Account/action";
import { IRootState } from "../../../store/rootModel";
import { useGenericWebServiceAsync } from "../../../hooks/useGenericWebServiceAsync";
import { richMenuObject } from "../../../models/richMenuObject";
import { useState } from "react";
import { useQueryString } from "../../../hooks/useQueryString";
import { useHistory } from "react-router";

export function useAccount() {
    const queryString = useQueryString();
    const id = queryString("id");

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const accounts = useSelector((state: IRootState) => state.account);
    const account = accounts.accounts.FirstOrDefault(x => x.id === id);
    const toast = useToast();
    const hitroy = useHistory();
    const unsubscribe = () => {
        const newAccount = accounts.accounts.Where(x => x.id !== id);
        dispatch(UpdateAccount({ accounts: newAccount }));
        toast.Info(t("richmenu.messages.unlinked"));
        hitroy.push("/");
    };
    const addMenu = () => {

    };

    const webServiceAsync = useGenericWebServiceAsync();
    const [richMenus, setRichMenus] = useState<richMenuObject[]>([]);
    useAsyncEffect(async () => {
        const result = await webServiceAsync<any, { richmenus: richMenuObject[] }>(
            "api/listRichmenus", { token: account.token });
        setRichMenus(result?.richmenus ?? []);
    }, [useAccount]);
    return { ...account, unsubscribe, richMenus, setRichMenus, addMenu };
}

