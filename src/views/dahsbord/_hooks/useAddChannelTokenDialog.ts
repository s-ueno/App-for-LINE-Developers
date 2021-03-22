import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../../core/extensions/SnackbarExtension";
import { useGenericWebServiceAsync } from "../../../hooks/useGenericWebServiceAsync";
import { useValidatedState, validateState } from "../../../hooks/useValidatedState";
import { UpdateAccount } from "../../../store/Account/action";
import { IRootState } from "../../../store/rootModel";

export type AddChannelTokenManager = {
    open: boolean,
    setOpen: (value: boolean) => void,
    token: validateState,
    validateAsync: () => Promise<void>
}

export function useAddChannelTokenDialog(): AddChannelTokenManager {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const token = useValidatedState((newValue) => checkToken(newValue, t), "");

    const webServiceAsync = useGenericWebServiceAsync();
    const account = useSelector((state: IRootState) => state.account);
    const dispatch = useDispatch();
    const toast = useToast();

    const validateAsync = async () => {
        const result = await webServiceAsync<any, any>("api/getProfile", { token: token.state });
        // https://developers.line.biz/ja/reference/messaging-api/#get-bot-info
        if (result) {
            const id = result.premiumId ?? result.basicId;
            const displayName = result.displayName;
            const pictureUrl = result.pictureUrl;

            if (account.accounts.Any(x => x.id === id)) {
                toast.Warning(t("dashbord.compornents.addChannelTokenDialog.validate.duplicate"));
                return;
            }
            const newAccount = [...account.accounts, { id, displayName, pictureUrl }];
            dispatch(UpdateAccount({ accounts: newAccount }));
            toast.Warning(t("dashbord.compornents.addChannelTokenDialog.validate.success"));
        }
    };
    return { open, setOpen, token, validateAsync }
}

function checkToken(newValue: string, t: (key: string) => string): string {

    if (!newValue) {
        return t("dashbord.compornents.addChannelTokenDialog.validate.required");
    }

    return "";
}