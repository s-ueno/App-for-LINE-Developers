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

    const res = await axios.get(configrations.richmenulistUri, {
        headers: headers,
    });
    try {
        const client = new line.Client({
            channelAccessToken: request.token,
        });
        const defaultRichmenuId = await client.getDefaultRichMenuId();
        context.res = {
            body: JSON.stringify({
                defaultRichmenuId,
                richmenus: res.data.richmenus
            })
        };
    } catch (error) {
        context.res = {
            body: JSON.stringify({
                defaultRichmenuId: "",
                richmenus: res.data.richmenus
            })
        };
    }
};

export default httpTrigger;