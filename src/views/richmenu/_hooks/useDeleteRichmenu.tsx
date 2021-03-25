import { useGenericWebServiceAsync } from "../../../hooks/useGenericWebServiceAsync";
import { richMenuObject } from "../../../models/richMenuObject";
import { useToast } from "../../../core/extensions/SnackbarExtension";
import { useTranslation } from "react-i18next";
import { IChannel } from "../../../store/Account/model";
import { UpdateChannel } from "../../../store/Account/action";
import { useDispatch } from "react-redux";

export function useDeleteRichmenu() {
    const webServiceAsync = useGenericWebServiceAsync();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toast = useToast();

    const deleteRichmenu = async (channel: IChannel, richmenu: richMenuObject) => {
        if (!richmenu.richMenuId) {
            const index: number = richmenu["index"];
            const newMenus = channel.richmenus.filter((x, i) => i !== index);
            const newChannel: IChannel = {
                token: channel.token,
                defaultRichmenuId: channel.defaultRichmenuId,
                richmenus: newMenus
            };
            dispatch(UpdateChannel(newChannel));
            return;
        }

        const res = await webServiceAsync<any, { richmenuId: string }>(
            "api/deleteRichmenu", {
            token: channel.token,
            richmenuId: richmenu.richMenuId
        });
        if (res) {
            const newMenus = channel.richmenus.filter(x => x.richMenuId != richmenu.richMenuId);
            const newChannel: IChannel = {
                token: channel.token,
                defaultRichmenuId: res.richmenuId,
                richmenus: newMenus
            };
            dispatch(UpdateChannel(newChannel));
            toast.Info(t("richmenu.messages.delete"));
        }
    }
    return deleteRichmenu;
}