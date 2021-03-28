import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { richMenuObject, area, postbackAction, messageAction, uriAction } from "../model/richMenuObject";
import line = require('@line/bot-sdk');
import fs = require('fs');
import { Readable } from 'stream'
import axios from "axios";
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');



    // try {
    //     const { richmenu, request } = To(req.rawBody);

    //     // 新規追加の場合
    //     if (request.richmenu.richMenuId?.trim() !== "") {
    //         // delete - insert
    //         await axios.delete(`https://api.line.me/v2/bot/richmenu/${request.richmenu.richMenuId?.trim()}`, {
    //             headers: {
    //                 'Authorization': `Bearer ${request.token}`
    //             },
    //         });
    //     }

    //     const res = await axios.post(`https://api.line.me/v2/bot/richmenu`,
    //         richmenu,
    //         {
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Authorization': `Bearer ${request.token}`,
    //                 'Content-Type': 'application/json'
    //             },
    //         }
    //     );
    //     const newId = res.data.richMenuId;

    //     // await axios.post(`https://api-data.line.me/v2/bot/richmenu/${newId}/content`,
    //     //     request.buffer,
    //     //     {
    //     //         headers: {
    //     //             'Authorization': `Bearer ${request.token}`,
    //     //             'Content-Type': 'image/png'
    //     //         },
    //     //     }
    //     // );
    //     context.res = {
    //         // status: 200, /* Defaults to 200 */
    //         body: JSON.stringify({ richmenuId: newId })
    //     };
    // } catch (error) {
    //     context.res = {
    //         status: 501,
    //         body: JSON.stringify({ error: error?.toString() })
    //     };
    // }


    try {
        const { richmenu, request } = To(req.rawBody);
        const client = new line.Client({
            channelAccessToken: request.token,
        });

        if (request.richmenu.richMenuId !== "") {
            await client.deleteRichMenu(request.richmenu.richMenuId);
        }

        const newRichMenuId = await client.createRichMenu(richmenu);


        const stream = fs.createReadStream(request.src);
        await client.setRichMenuImage(newRichMenuId, stream, "image/png");
        // const readable = bufferToStream(request.buffer.data);
        // await client.setRichMenuImage(newRichMenuId, request.buffer.data);
        // await client.setRichMenuImage(newRichMenuId, request.buffer.data, "image/png");

        // const uri = await resize(blob, request.richmenu.size);
        // const stream = fs.createReadStream(request.buffer.data);
        // await client.setRichMenuImage(newRichMenuId, stream, "image/png");
        // await client.setRichMenuImage(newRichMenuId, fs.createReadStream(uri), "image/png");
        // await client.setRichMenuImage(newRichMenuId, request.buffer.data, "image/png");

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: JSON.stringify({ richmenuId: newRichMenuId })
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
            data: Buffer
        },
        src
    } = JSON.parse(rawBody);
    const richmenu: line.RichMenu = {
        size: request.richmenu.size,
        chatBarText: request.richmenu.chatBarText,
        name: request.richmenu.name,
        selected: true,
        areas: request.richmenu.areas.map(each => {
            return {
                bounds: {
                    height: each.bounds.height,
                    width: each.bounds.width,
                    x: each.bounds.x,
                    y: each.bounds.y,
                },
                action: Parse(each.action)
            }
        }),
    }
    return { richmenu, request }
}
export default httpTrigger;