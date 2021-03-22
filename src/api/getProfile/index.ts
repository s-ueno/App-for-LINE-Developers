import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";
import { configrations } from "../configrations";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const request: { token: string } = JSON.parse(req.rawBody);
    const headers = {
        'Authorization': `Bearer ${request.token}`,
    };
    try {
        const res = await axios.get(configrations.botInfoUri, {
            headers: headers,
        });
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: JSON.stringify(res.data)
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: JSON.stringify({ error })
        };
    }
};

export default httpTrigger;