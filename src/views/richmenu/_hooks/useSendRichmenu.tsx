import react, { useState } from 'react';
import { useGenericWebServiceAsync } from "../../../hooks/useGenericWebServiceAsync";
import { richMenuObject } from "../../../models/richMenuObject";
import { useToast } from "../../../core/extensions/SnackbarExtension";
import { useTranslation } from "react-i18next";
import { IChannel } from "../../../store/Account/model";
import { UpdateChannel } from "../../../store/Account/action";
import { useDispatch } from "react-redux";


export function useSendRichmenu() {
    const webServiceAsync = useGenericWebServiceAsync();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toast = useToast();
    const [openClicbordCopy, setOpenClicbordCopy] = useState(false);

    const updateRichmenuAsync = async (channel: IChannel, richmenu: richMenuObject, imageSrc: string) => {

        if (!imageSrc) {
            toast.Warning(t("richmenu.messages.specify"));
            return;
        }

        const r = await fetch(imageSrc);
        const a = await r.arrayBuffer();
        const b = Buffer.from(a);

        const result = await webServiceAsync<any, { richmenuId: string, defaultRichmenuId: string }>(
            "api/updateRichmenu", {
            token: channel.token,
            richmenu,
            buffer: b
        });

        if (result) {
            const newRichmenus = channel.richmenus.map(x => {
                if (x.richMenuId === richmenu.richMenuId) {
                    return {
                        ...richmenu,
                        richmenuId: result.richmenuId,
                        size: richmenu.size
                    };
                }
                return x;
            });

            richmenu.richMenuId = result.richmenuId;

            dispatch(UpdateChannel({
                token: channel.token,
                defaultRichmenuId: result.defaultRichmenuId,
                richmenus: newRichmenus
            }));
        }
    };
    return { updateRichmenuAsync, openClicbordCopy, setOpenClicbordCopy };
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
