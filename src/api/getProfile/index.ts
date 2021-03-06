import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";
import { configrations } from "../configrations";
import line = require('@line/bot-sdk');
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const request: { token: string } = JSON.parse(req.rawBody);
    try {
        // const headers = {
        //     'Authorization': `Bearer ${request.token}`,
        // };
        // const res = await axios.get(configrations.botInfoUri, {
        //     headers: headers,
        // });

        const client = new line.Client({
            channelAccessToken: request.token,
        });
        const res = await client.getBotInfo();
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: JSON.stringify(res)
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: JSON.stringify({ error })
        };
    }
};

export default httpTrigger;