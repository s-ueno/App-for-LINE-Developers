import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { richMenuObject, area, postbackAction, messageAction, uriAction } from "../model/richMenuObject";
import line = require('@line/bot-sdk');
import fs = require('fs');
import { Readable } from 'stream'
import axios from "axios";
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    try {
        const { richmenu, request } = To(req.rawBody);
        const client = new line.Client({
            channelAccessToken: request.token,
        });

        // 既存データがある場合は、Delete-Insert で更新かける
        const defaultRichmenuId = await client.getDefaultRichMenuId();
        if (request.richmenu.richMenuId !== "") {
            await client.deleteRichMenu(request.richmenu.richMenuId);
        }

        // 再構築
        const newRichMenuId = await client.createRichMenu(richmenu);

        // 新しいリッチメニューに画像を割り当てる
        const buffer = Buffer.from(request.buffer.data);
        const readable = bufferToStream(buffer);
        await client.setRichMenuImage(newRichMenuId, readable);

        // デフォルトメニューであれば、再設定する
        if (request.richmenu.richMenuId !== "" &&
            request.richmenu.richMenuId === defaultRichmenuId) {
            await client.setDefaultRichMenu(newRichMenuId);
        }

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: JSON.stringify({ richmenuId: newRichMenuId, defaultRichmenuId })
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: JSON.stringify({ error })
        };
    }
};

function bufferToStream(buffer: Buffer) {
    const readableInstanceStream = new Readable({
        read() {
            this.push(buffer);
            this.push(null);
        }
    });
    return readableInstanceStream;
}

function Parse(action: postbackAction | messageAction | uriAction) {
    if (action.type === "message") {
        const message: line.MessageAction & { label: string } = {
            type: action.type,
            text: action.text,
            label: action.label,
        }
        return message;
    }
    if (action.type === "postback") {
        const postback: line.PostbackAction & { label: string } = {
            type: action.type,
            data: action.data,
            label: action.label,
            displayText: action.displayText,
        }
        return postback;
    }
    const uri: line.URIAction & { label: string } = {
        type: action.type,
        uri: action.uri,
        label: action.label,
    }
    return uri;
};
function To(rawBody) {
    const request: {
        token: string,
        richmenu: richMenuObject,
        buffer: {
            type: string,
            data: ArrayBuffer
        },
        src
    } = JSON.parse(rawBody);
    const postScale = request.richmenu.postScale;
    const richmenu: line.RichMenu = {
        size: request.richmenu.size,
        chatBarText: request.richmenu.chatBarText,
        name: request.richmenu.name,
        selected: true,
        areas: request.richmenu.areas.map(each => {
            return {
                bounds: {
                    height: Math.round(each.bounds.height * postScale.scaleX),
                    width: Math.round(each.bounds.width * postScale.scaleY),
                    x: Math.round(each.bounds.x * postScale.scaleX),
                    y: Math.round(each.bounds.y * postScale.scaleY),
                },
                action: Parse(each.action)
            }
        }),
    }
    return { richmenu, request }
}
export default httpTrigger;