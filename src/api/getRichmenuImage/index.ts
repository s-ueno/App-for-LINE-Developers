import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const request: { token: string, richmenuId: string } = JSON.parse(req.rawBody);
    const headers = {
        'Authorization': `Bearer ${request.token}`,
    };
    try {
        const res = await axios.get(`https://api-data.line.me/v2/bot/richmenu/${request.richmenuId}/content`, {
            headers: headers,
            responseType: "arraybuffer"
        });
        const data: Buffer = res.data;
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: JSON.stringify({ image: data })
        };
    } catch (error) {
        // const httpStatus = Number(error.message?.replace(/[^0-9]/g, '') ?? "500");
        context.res = {
            status: 500,
            body: JSON.stringify({ error })
        };
    }
};

export default httpTrigger;