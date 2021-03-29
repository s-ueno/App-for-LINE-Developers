import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";
import { configrations } from "../configrations";
import line = require('@line/bot-sdk');
import { Area } from "recharts";
import sizeOf from 'image-size';
// const sizeOf = require('image-size')
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
        const richmenus: line.RichMenuResponse[] = res.data.richmenus;

        const getSizeAsync = async (richmenuId: string) => {
            try {
                const readable = await client.getRichMenuImage(richmenuId);
                const chunks = []
                for await (let chunk of readable) {
                    chunks.push(chunk)
                }
                const dimensions = sizeOf(Buffer.concat(chunks));
                return { width: dimensions.width, height: dimensions.height };
            } catch (error) {
                return null;
            }
        }

        for (let index = 0; index < richmenus.length; index++) {
            const each = richmenus[index];
            const size = await getSizeAsync(each.richMenuId);
            if (size) {
                const scaleX = each.size.width / size.width;
                const scaleY = each.size.height / size.height;
                each.areas = each.areas.map(area => {
                    const newArea = {
                        ...area,
                        bounds: {
                            x: Math.round(area.bounds.x / scaleX),
                            y: Math.round(area.bounds.y / scaleY),
                            width: Math.round(area.bounds.width / scaleX),
                            height: Math.round(area.bounds.height / scaleY),
                        },
                    }
                    return newArea;
                });
            }
        }

        context.res = {
            body: JSON.stringify({
                defaultRichmenuId,
                richmenus: richmenus
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