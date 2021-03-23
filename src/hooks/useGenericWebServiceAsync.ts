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
export function useGenericWebServiceAsync(...array: validator[]):
    <TRequest, TResponse>(uri: string, request: TRequest, option?:OptionProps) => Promise<TResponse | null> {
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const dispatch = useDispatch();
    const aggregateValidation = useValidatedStateArray(...array);

    useEffect(() => {
        dispatch(WaitSite(loading))
    }, [loading]);

    return async <TRequest, TResponse>(uri: string, request: TRequest, 
        option?:OptionProps) => {
        const valid = aggregateValidation.validateToast(toast);
        if (!valid) return null;

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
            if (400 <= res.status) {
                throw new Error(`${res.status}:${res.statusText}`);
            }

            const result: TResponse = await res.json();
            return result;
        } catch (error) {
            console.error(error);

            if(!option?.ignoreToast){
                toast.Error(error.toString());
            }
            if(option?.throwError){
                throw error;
            }
            return null;
        } finally {
            setLoading(false);
        }
    }
}