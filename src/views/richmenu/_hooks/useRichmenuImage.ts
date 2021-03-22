import { Buffer } from "buffer";
import { useState } from "react";
import useAsyncEffect from "use-async-effect";
import { useGenericWebServiceAsync } from "../../../hooks/useGenericWebServiceAsync";


export function useRichmenuImageAsync(token: string, richmenuId: string) {
    const [image, setImage] = useState("");
    const webServiceAsync = useGenericWebServiceAsync();
    useAsyncEffect(async () => {
        const result = await webServiceAsync<any, {
            image: {
                type: string,
                data: ArrayBuffer
            }
        }>("api/getRichmenuImage",
            {
                token,
                richmenuId
            });
        const image = Buffer.from(result?.image.data as ArrayBuffer).toString("ascii");
        setImage(image);
    }, [useRichmenuImageAsync]);
    return image;
}