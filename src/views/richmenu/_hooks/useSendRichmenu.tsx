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

        // const buff = await fetch(imageSrc);
        // const arrayBuffer = await buff.arrayBuffer();
        // const buffer = Buffer.from(arrayBuffer);

        // const buff2 = await fetch(imageSrc);
        // const blob = await buff2.blob();
        // const file = new File([blob], "menu.png", { type: "image/png" });
        // const newBlob = await resize(file, richmenu.size);

        const blob = await resizeAsync(imageSrc, richmenu.size);
        const result = await webServiceAsync<any, { richmenuId: string }>(
            "api/updateRichmenu", {
            token: channel.token,
            richmenu,
            buffer: blob,
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
async function resizeAsync(src: string, size: { width: number, height: number }) {
    const imageLoadAsync = (src) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.onload = e => {
                resolve(image);
            }
        });
    }

    const resize = (image: HTMLImageElement, size: { width: number, height: number }) => {
        return new Promise<Blob>((resolve, reject) => {
            const canvas = document.createElement("canvas");
            canvas.width = size.width;
            canvas.height = size.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, size.width, size.height);
                canvas.toBlob(x => {
                    if (x) {
                        resolve(x);
                    } else {
                        reject();
                    }
                });
            } else {
                reject();
            }
        });
    }
    const image = await imageLoadAsync(src);
    const resized = await resize(image, size);
    return resized;
}
async function resize(file: Blob, size: { width: number, height: number }) {
    return new Promise<Blob>(resolve => {
        Resizer.imageFileResizer(file, size.width, size.height, 'png', 100, 0,
            blob => {
                resolve(blob as Blob);
            },
            'blob'
        );
    });
}
// function resizedCanvas(blob, size: { width: number, height: number }) {
//     const tmpCanvas = document.createElement('canvas');
//     tmpCanvas.width = size.width;
//     tmpCanvas.height = size.height;
//     const ctx = tmpCanvas.getContext('2d');
//     if (ctx) {
//         ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, size.width, size.height);
//     }
//     return tmpCanvas;
// }