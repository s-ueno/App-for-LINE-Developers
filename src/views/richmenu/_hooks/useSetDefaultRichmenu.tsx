import { useGenericWebServiceAsync } from "../../../hooks/useGenericWebServiceAsync";
import { richMenuObject } from "../../../models/richMenuObject";
import { useToast } from "../../../core/extensions/SnackbarExtension";
import { useTranslation } from "react-i18next";
import { IChannel } from "../../../store/Account/model";
import { UpdateChannel } from "../../../store/Account/action";
import { useDispatch } from "react-redux";
import { useSendRichmenu } from "./useSendRichmenu";
import richmenu from "..";


export function useSetDefaultRichmenu() {
    const webServiceAsync = useGenericWebServiceAsync();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toast = useToast();

    const setDefaultRichmenuAsync = async (channel: IChannel, richmenu: richMenuObject) => {
        if (!richmenu.richMenuId) {
            toast.Warning(t("richmenu.validate.requiredUpdate"));
            return;
        }

        await webServiceAsync<any, any>(
            "api/setDefaultRichmenu", {
            token: channel.token,
            richmenuId: richmenu.richMenuId
        });

        dispatch(UpdateChannel({ ...channel, defaultRichmenuId: richmenu.richMenuId }));
        toast.Info(t("richmenu.messages.updated"));
    };
    return setDefaultRichmenuAsync;
}