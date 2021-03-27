import { useGenericWebServiceAsync } from "../../../hooks/useGenericWebServiceAsync";
import { richMenuObject } from "../../../models/richMenuObject";
import { useToast } from "../../../core/extensions/SnackbarExtension";
import { useTranslation } from "react-i18next";
import { IChannel } from "../../../store/Account/model";
import { UpdateChannel } from "../../../store/Account/action";
import { useDispatch } from "react-redux";
import fs from 'fs';
import Resizer from 'react-image-file-resizer';


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


        const blob = new Blob([buffer]);
        const newBlob = await resize(blob, richmenu.size);

        const result = await webServiceAsync<any, { richmenuId: string }>(
            "api/updateRichmenu", {
            token: channel.token,
            richmenu,
            buffer: newBlob,
        });

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

async function resize(file: Blob, size: { width: number, height: number }) {
    return new Promise<Blob>(resolve => {
        Resizer.imageFileResizer(file, size.width, size.height, 'PNG', 100, 0,
            uri => {
                resolve(uri as Blob);
            },
            'blob'
        );
    });
}
