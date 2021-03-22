import { useState } from "react";
import useAsyncEffect from "use-async-effect";
import { useGenericWebServiceAsync } from "../../../hooks/useGenericWebServiceAsync";


export function useRichmenuImageAsync(token: string, richmenuId: string) {
    const [image, setImage] = useState("");
    const webServiceAsync = useGenericWebServiceAsync();
    useAsyncEffect(async () => {
        const result = await webServiceAsync<any, { image: Buffer }>("api/getRichmenuImage",
            {
                token,
                richmenuId
            });
        const image = `data:image/png;base64,${result?.image?.toString("base64")}`
        setImage(image);
    }, [useRichmenuImageAsync]);
    return image;
}