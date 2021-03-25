import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";
import line = require('@line/bot-sdk');
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const request: { token: string, richmenuId: string } = JSON.parse(req.rawBody);
    // const headers = {
    //     'Authorization': `Bearer ${request.token}`,
    // };
    // const res = await axios.get(`https://api-data.line.me/v2/bot/richmenu/${request.richmenuId}/content`, {
    //     headers: headers,
    //     responseType: "arraybuffer"
    // });    
    // const data: Buffer = res.data;
    const client = new line.Client({
        channelAccessToken: request.token,
    });

    try {
        const readable = await client.getRichMenuImage(request.richmenuId);
        const chunks = []
        for await (let chunk of readable) {
            chunks.push(chunk)
        }
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: JSON.stringify({ image: Buffer.concat(chunks) })
        };
    } catch (error) {
        context.res = {
            status: 403,
        };

    }

};

export default httpTrigger;