import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";
import { configrations } from "../configrations";
import line = require('@line/bot-sdk');
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const request: { token: string } = JSON.parse(req.rawBody);
    const headers = {
        'Authorization': `Bearer ${request.token}`,
    };
    try {
        const client = new line.Client({
            channelAccessToken: request.token,
        });
        const defaultRichmenuId = await client.getDefaultRichMenuId();

        const res = await axios.get(configrations.richmenulistUri, {
            headers: headers,
        });
        context.res = {
            body: JSON.stringify({
                defaultRichmenuId,
                richmenus: res.data.richmenus
            })
        };

        // line Client　使えない。　※Official Account Manager で登録すると、情報が何も拾えなくなる
        // const client = new line.Client({
        //     channelAccessToken: request.token,
        // });
        // const res = await client.getRichMenuList();
        // const defaultRichmenuId = await client.getDefaultRichMenuId();
        // context.res = {
        //     // status: 200, /* Defaults to 200 */
        //     body: JSON.stringify({
        //         defaultRichmenuId,
        //         richmenus: res
        //     })
        // };
    } catch (error) {
        context.res = {
            status: 500,
            body: JSON.stringify({ error })
        };
    }
};

export default httpTrigger;