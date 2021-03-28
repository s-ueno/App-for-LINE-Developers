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
    const webServiceAsync = useGenericWebServiceAsync();
    const root = useSelector((state: IRootState) => state.account);
    const dispatch = useDispatch();
    const toast = useToast();

    const required = (newValue) => {
        if (String.IsNullOrWhiteSpace(newValue)) {
            return t("dashbord.compornents.addChannelTokenDialog.validate.required");
        }
        return "";
    };
    const token = useValidatedState(required, "");

    const validateAsync = async () => {
        if (token.validate().hasError) return;

        const result = await webServiceAsync<any, any>("api/getProfile", { token: token.state });
        // https://developers.line.biz/ja/reference/messaging-api/#get-bot-info
        if (result) {
            const id = result.premiumId ?? result.basicId;
            const displayName = result.displayName;
            const pictureUrl = result.pictureUrl;

            if (root.accounts.Any(x => x.id === id)) {
                toast.Warning(t("dashbord.compornents.addChannelTokenDialog.validate.duplicate"));
                return;
            }
            const newAccount = [...root.accounts, {
                token: token.state as string,
                id,
                displayName,
                pictureUrl
            }];

            dispatch(UpdateAccount({ accounts: newAccount }));
            toast.Info(t("dashbord.compornents.addChannelTokenDialog.validate.success"));
            setOpen(false);
        }
    };
    return { open, setOpen, token, validateAsync }
}

