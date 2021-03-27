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
        const uri = await resize(blob, richmenu.size);
        const newBlob = dataURIToBlob(uri);

        const newImage = buffer.toString("base64");
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
    return new Promise(resolve => {
        Resizer.imageFileResizer(file, size.width, size.height, 'PNG', 100, 0,
            uri => {
                resolve(uri);
            },
            'base64'
        );
    });
}
function dataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(",");
    const byteString =
        splitDataURI[0].indexOf("base64") >= 0
            ? atob(splitDataURI[1])
            : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    return new Blob([ia], { type: mimeString });
};