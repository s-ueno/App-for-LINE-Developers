import { Buffer } from "buffer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import useAsyncEffect from "use-async-effect";
import { useGenericWebServiceAsync } from "../../../hooks/useGenericWebServiceAsync";
import { useMemoAsync } from "../../../hooks/useMemoAsync";
import { useWebServiceAsync } from "../../../hooks/useWebServiceAsync";
import { IAccountHeader } from "../../../store/Account/model";
import { WaitSite } from "../../../store/Overlay/action";

export function useRichmenuImageAsync(
    account: IAccountHeader, richmenuId: string) {

    const [image, setImage] = useState("");
    const memoAsync = useMemoAsync();
    const [httpStatus, setHttpStatus] = useState(0);
    const [loading, webServiceAsync] = useWebServiceAsync();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(WaitSite(loading));
    }, [loading]);

    const getImageAsync = async (token: string, richmenuId: string) => {
        try {
            const res = await webServiceAsync("api/getRichmenuImage", { token, richmenuId });
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
                const buffer = Buffer.from(result?.image);
                const newImage = buffer.toString("base64");
                setImage(`data:image/png;base64,${newImage}`);
                setHttpStatus(res.status);
            }
        } catch (error) {
            // LINE Official Account Manager で登録した場合にエラーを返す
            setHttpStatus(403);
            setImage("");
        }
    }


    useAsyncEffect(async (isMounted) => {
        if (!isMounted()) return;
        if (!richmenuId) return;

        await getImageAsync(account.token, richmenuId);

    }, [account.token, richmenuId]);

    return {
        richMenuImage: image,
        setRichMenuImage: setImage,
        loading,
        httpStatus,
        setHttpStatus
    };
}