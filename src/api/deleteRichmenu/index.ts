import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import line = require('@line/bot-sdk');
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const request: {
        token: string,
        richmenuId: string,
    } = JSON.parse(req.rawBody);
    try {
        const client = new line.Client({
            channelAccessToken: request.token,
        });
        await client.deleteRichMenu(request.richmenuId);
        const richmenuId = await client.getDefaultRichMenuId();
        context.res = {
            status: 200, /* Defaults to 200 */
            body: JSON.stringify({ richmenuId })
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: JSON.stringify({ error })
        };
    }
};

export default httpTrigger;