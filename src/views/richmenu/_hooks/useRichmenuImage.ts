import { Buffer } from "buffer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useHistory } from "react-router";
import useAsyncEffect from "use-async-effect";
import { useGenericWebServiceAsync } from "../../../hooks/useGenericWebServiceAsync";
import { useWebServiceAsync } from "../../../hooks/useWebServiceAsync";
import { IAccountHeader } from "../../../store/Account/model";

export function useRichmenuImageAsync(
    account: IAccountHeader, richmenuId: string)
    : [String, Dispatch<SetStateAction<string>>, Boolean, Number] {

    const [image, setImage] = useState("");
    const [httpStatus, setHttpStatus] = useState(0);
    const [loading, webServiceAsync] = useWebServiceAsync();

    const history = useHistory();
    const [richmenuRequest, setRichmenuRequest] = useState<{
        token: string, richmenuId: string
    }>({ token: account.token, richmenuId });

    useEffect(() => {
        setRichmenuRequest({ token: account.token, richmenuId });
    }, [account]);

    useAsyncEffect(async () => {
        if (!richmenuRequest.token || !richmenuRequest.richmenuId) return;

        const res = await webServiceAsync("api/getRichmenuImage", richmenuRequest);
        // レスポンスがない＝通信が飛ばなかった
        if (!res) {
            setHttpStatus(500);
            setImage("");
        } else if (400 <= res.status) {
            // LINE Official Account Manager で登録した場合にエラーを返す
            setHttpStatus(res.status);
            setImage("");
        } else {
            //　成功
            const result = await res.json();
            const newImage = Buffer.from(result?.image.data as ArrayBuffer).toString("base64");
            setImage(`data:image/png;base64,${newImage}`);

            setHttpStatus(res.status);
        }
    }, [richmenuRequest]);
    return [image, setImage, loading, httpStatus];
}