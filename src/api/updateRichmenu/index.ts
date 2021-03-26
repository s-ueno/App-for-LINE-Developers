import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { richMenuObject, area, postbackAction, messageAction, uriAction } from "../model/richMenuObject";
import line = require('@line/bot-sdk');
import fs = require('fs');
import axios from "axios";
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const request: {
        token: string,
        richmenu: richMenuObject,
        buffer: Buffer
    } = JSON.parse(req.rawBody);


    try {
        // 新規追加の場合
        if (request.richmenu?.richMenuId?.trim() !== "") {
            // delete - insert
            await axios.delete(`https://api.line.me/v2/bot/richmenu/${request.richmenu.richMenuId}`, {
                headers: {
                    'Authorization': `Bearer ${request.token}`
                },
            });
        }

        const res = await axios.post(`https://api.line.me/v2/bot/richmenu`,
            request.richmenu,
            {
                headers: {
                    'Authorization': `Bearer ${request.token}`,
                    'Content-Type': 'application/json'
                },
            }
        );
        const newId = res.data.richMenuId;

        await axios.post(`https://api-data.line.me/v2/bot/richmenu/${newId}/content`,
            request.buffer,
            {
                headers: {
                    'Authorization': `Bearer ${request.token}`,
                    'Content-Type': 'image/png'
                },
            }
        );
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: JSON.stringify({ richmenuId: newId })
        };
    } catch (error) {
        context.res = {
            status: 501,
            body: JSON.stringify({ error })
        };
    }


    return;

    // try {
    //     const client = new line.Client({
    //         channelAccessToken: request.token,
    //     });
    //     // 新規追加の場合
    //     if (request.richmenu?.richMenuId?.trim() !== "") {
    //         // delete - insert
    //         await client.deleteRichMenu(request.richmenu.richMenuId);
    //     }
    //     const parseAction = (action: postbackAction | messageAction | uriAction) => {
    //         if (action.type === "message") {
    //             const message: line.MessageAction & { label: string } = {
    //                 type: action.type,
    //                 text: action.text,
    //                 label: action.label,
    //             }
    //             return message;
    //         }
    //         if (action.type === "postback") {
    //             const postback: line.PostbackAction & { label: string } = {
    //                 type: action.type,
    //                 data: action.data,
    //                 label: action.label,
    //                 displayText: action.displayText,
    //             }
    //             return postback;
    //         }
    //         const uri: line.URIAction & { label: string } = {
    //             type: action.type,
    //             uri: action.uri,
    //             label: action.label,
    //         }
    //         return uri;
    //     };
    //     const richmenu: line.RichMenu = {
    //         size: request.richmenu.size,
    //         chatBarText: request.richmenu.chatBarText,
    //         name: request.richmenu.name,
    //         selected: true,
    //         areas: request.richmenu.areas.map(each => {
    //             return {
    //                 bounds: {
    //                     height: each.bounds.height,
    //                     width: each.bounds.width,
    //                     x: each.bounds.x,
    //                     y: each.bounds.y,
    //                 },
    //                 action: parseAction(each.action)
    //             }
    //         }),
    //     }

    //     const newRichMenuId = await client.createRichMenu(richmenu);
    //     await client.setRichMenuImage(newRichMenuId, request.buffer);

    //     context.res = {
    //         // status: 200, /* Defaults to 200 */
    //         body: JSON.stringify({ richmenuId: newRichMenuId })
    //     };
    // } catch (error) {
    //     context.res = {
    //         status: 500,
    //         body: JSON.stringify({ error })
    //     };
    // }
};

export default httpTrigger;