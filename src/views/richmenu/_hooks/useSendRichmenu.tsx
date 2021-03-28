import react from 'react';
import { useGenericWebServiceAsync } from "../../../hooks/useGenericWebServiceAsync";
import { richMenuObject } from "../../../models/richMenuObject";
import { useToast } from "../../../core/extensions/SnackbarExtension";
import { useTranslation } from "react-i18next";
import { IChannel } from "../../../store/Account/model";
import { UpdateChannel } from "../../../store/Account/action";
import { useDispatch } from "react-redux";
import fs from 'fs';
import Resizer from 'react-image-file-resizer';
import ReactDOM from "react-dom";


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


        const buffer = await resizeAsync(imageSrc, richmenu.size, { result: "buffer" });
        const url = await resizeAsync(imageSrc, richmenu.size, { result: "url" });

        const result = await webServiceAsync<any, { richmenuId: string }>(
            "api/updateRichmenu", {
            token: channel.token,
            richmenu,
            // buffer,
            src: url
        });

        // const req = new Request(`https://api.line.me/v2/bot/richmenu/${result?.richmenuId}/content`, {
        //     mode: "no-cors",
        //     method: "POST",
        //     headers: {
        //         Authorization: `Bearer ${channel.token}`,
        //         "Content-Type": "image/png"
        //     },
        //     body: buffer
        // });
        // const res = await fetch(`https://api.line.me/v2/bot/richmenu/${result?.richmenuId}/content`, {
        //     mode: "no-cors",
        //     method: "POST",
        //     headers: {
        //         Authorization: `Bearer ${channel.token}`,
        //         "Content-Type": "image/png"
        //     },
        //     body: url
        // });

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
async function resizeAsync(
    src: string,
    size: { width: number, height: number },
    option: { result: "buffer" | "url" }
) {
    const imageLoadAsync = () => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.onload = e => {
                resolve(image);
            }
        });
    }

    const resize = () => {
        return new Promise<Buffer | string | File>((resolve, reject) => {
            const canvas = document.createElement("canvas");
            canvas.width = size.width;
            canvas.height = size.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, size.width, size.height);
                if (option.result === "buffer") {
                    canvas.toBlob(async (x) => {
                        if (x) {
                            const arrayBuffer = await x.arrayBuffer()
                            const buffer = Buffer.from(arrayBuffer);
                            resolve(buffer);
                        } else {
                            reject();
                        }
                    });
                } else if (option.result === "url") {
                    const url = canvas.toDataURL();
                    resolve(url);
                }
            } else {
                reject();
            }
        });
    }

    const image = await imageLoadAsync();
    const resized = await resize();
    return resized;
}
