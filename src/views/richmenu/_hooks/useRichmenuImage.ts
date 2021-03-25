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

    useAsyncEffect(async (isMounted) => {
        if (!isMounted()) return;
        if (!richmenuId) return;

        const res = await webServiceAsync("api/getRichmenuImage", { token: account.token, richmenuId });
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
            const newImage = result?.image.toString("base64");
            setImage(`data:image/png;base64,${newImage}`);

            setHttpStatus(res.status);
        }
    }, [account]);

    return [image, setImage, loading, httpStatus];
}