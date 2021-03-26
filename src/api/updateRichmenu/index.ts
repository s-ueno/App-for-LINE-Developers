import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { richMenuObject } from "../model/richMenuObject";
import line = require('@line/bot-sdk');
import fs = require('fs');
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const request: {
        token: string,
        richmenu: richMenuObject,
        buffer: Buffer
    } = JSON.parse(req.rawBody);
    try {
        const client = new line.Client({
            channelAccessToken: request.token,
        });
        // 新規追加の場合
        if (request.richmenu?.richMenuId?.trim() !== "") {
            // delete - insert
            await client.deleteRichMenu(request.richmenu.richMenuId);
        }

        const newRichMenuId = await client.createRichMenu({ ...request.richmenu, selected: true });
        await client.setRichMenuImage(newRichMenuId, request.buffer);

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

export default httpTrigger;