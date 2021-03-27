import { useGenericWebServiceAsync } from "../../../hooks/useGenericWebServiceAsync";
import { richMenuObject } from "../../../models/richMenuObject";
import { useToast } from "../../../core/extensions/SnackbarExtension";
import { useTranslation } from "react-i18next";
import { IChannel } from "../../../store/Account/model";
import { UpdateChannel } from "../../../store/Account/action";
import { useDispatch } from "react-redux";
import line from '@line/bot-sdk';
import fs from 'fs';


export function useSendRichmenu() {
    const webServiceAsync = useGenericWebServiceAsync();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toast = useToast();

    const updateRichmenuAsync = async (channel: IChannel, richmenu: richMenuObject, imageSrc: string) => {

        if (!imageSrc) {
            toast.Warning(t("richmenu.messages.specify"));
            return;
        }

        const buff = await fetch(imageSrc);
        const arrayBuffer = await buff.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const result = await webServiceAsync<any, { richmenuId: string }>(
            "api/updateRichmenu", {
            token: channel.token,
            richmenu,
            // buffer
        });

        const client = new line.Client({
            channelAccessToken: channel.token,
        });
        if (result?.richmenuId) {
            await client.setRichMenuImage(result.richmenuId, buffer, "image/png");
        }

        if (result) {
            const newRichmenus = channel.richmenus.map(x => {
                if (x.richMenuId === richmenu.richMenuId) {
                    return { ...richmenu, richmenuId: result.richmenuId };
                }
                return x;
            });
            dispatch(UpdateChannel({
                token: channel.token,
                defaultRichmenuId: channel.defaultRichmenuId,
                richmenus: newRichmenus
            }));
            toast.Info(t("richmenu.messages.updated"));
        }
    };
    return updateRichmenuAsync;
}