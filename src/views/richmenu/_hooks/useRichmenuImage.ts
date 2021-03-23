import { Buffer } from "buffer";
import { Dispatch, SetStateAction, useState } from "react";
import { useHistory } from "react-router";
import useAsyncEffect from "use-async-effect";
import { useGenericWebServiceAsync } from "../../../hooks/useGenericWebServiceAsync";
import { useWebServiceAsync } from "../../../hooks/useWebServiceAsync";

export function useRichmenuImageAsync(
    token: string, richmenuId: string)
    : [String, Dispatch<SetStateAction<string>>, Boolean, Number] {

    const [image, setImage] = useState("");
    const [httpStatus, setHttpStatus] = useState(0);
    const [loading, webServiceAsync] = useWebServiceAsync();

    const history = useHistory();
    useAsyncEffect(async () => {
        const request = { token, richmenuId };
        const option = { ignoreToast: true, throwError: true };
        const res = await webServiceAsync("api/getRichmenuImage", request);
        // レスポンスがない＝通信が飛ばなかった
        if (!res) {
            setHttpStatus(500);
        } else if (400 <= res.status) {
            // LINE Official Account Manager で登録した場合に400系エラーを返す
            setHttpStatus(res.status);
        } else {
            //　成功
            setHttpStatus(res.status);
            const result = await res.json();
            const newImage = Buffer.from(result?.image.data as ArrayBuffer).toString("base64");
            setImage(`data:image/png;base64,${newImage}`);
        }
    }, [history.location]);
    return [image, setImage, loading, httpStatus];
}