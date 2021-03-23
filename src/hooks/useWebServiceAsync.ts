import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "../core/extensions/SnackbarExtension";
import { validator } from "./useValidatedState";
import { useValidatedStateArray } from "./useValidatedStateArray";
import { WaitSite } from "../store/Overlay/action"

type OptionProps = {
    ignoreToast?: boolean,
    throwError?: boolean
}
export function useWebServiceAsync(): [boolean, (uri: string, request: any) => Promise<Response | null>] {
    const [loading, setLoading] = useState(false);

    return [loading, async <TResponse>(uri: string, request: any) => {
        setLoading(true);
        const method = "POST";
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        };
        try {
            const res = await fetch(uri, {
                method: method,
                headers: headers,
                credentials: 'include', /* Cookie付き送信 */
                body: JSON.stringify(request)
            });
            return res;
        } catch (error) {
            console.error(error);
            return null;;
        } finally {
            setLoading(false);
        }
    }]
}