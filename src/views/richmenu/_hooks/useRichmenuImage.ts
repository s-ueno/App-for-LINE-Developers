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
                data: Buffer
            }
        }>("api/getRichmenuImage",
            {
                token,
                richmenuId
            });
        const blob = new Blob([result?.image.data as Buffer], { type: "image/png" });
        const image = (window.URL || window.webkitURL).createObjectURL(blob);
        setImage(image);
    }, [useRichmenuImageAsync]);
    return image;
}