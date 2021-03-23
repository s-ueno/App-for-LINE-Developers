import { Buffer } from "buffer";
import { Dispatch, SetStateAction, useState } from "react";
import { useHistory } from "react-router";
import useAsyncEffect from "use-async-effect";
import { useGenericWebServiceAsync } from "../../../hooks/useGenericWebServiceAsync";

export function useRichmenuImageAsync(
    token: string, richmenuId: string)
: [string, Dispatch<SetStateAction<string>>] {

    const [image, setImage] = useState("");
    const webServiceAsync = useGenericWebServiceAsync();
    const history = useHistory();
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
        const image = Buffer.from(result?.image.data as ArrayBuffer).toString("base64");
        setImage(`data:image/png;base64,${image}`);
    }, [history.location]);
    return [image, setImage];
}