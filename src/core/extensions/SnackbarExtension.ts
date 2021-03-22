import React from "react";
import {
    useSnackbar,
    OptionsObject,
    SnackbarKey,
    VariantType,
    withSnackbar,
    ProviderContext,
    WithSnackbarProps,
} from 'notistack';

type Constructor<T = {}> = new (...args: any[]) => T;

export interface ProviderContextImpl {
    Success(
        message: string,
        option?: OptionsObject,
        key?: SnackbarKey
    );
    Info(
        message: string,
        option?: OptionsObject,
        key?: SnackbarKey
    );
    Error(
        message: string,
        option?: OptionsObject,
        key?: SnackbarKey);
    Warning(
        message: string,
        option?: OptionsObject,
        key?: SnackbarKey);

}

// 敗北・・・・
/*
declare module 'notistack' {
    interface ProviderContext extends ProviderContextImpl {

    }
}
class SnackbarExtended extends React.Component<ProviderContextImpl> {
    Success = (message: string, option?: OptionsObject, key?: SnackbarKey) => {
        this.Toast(message, "success", option, key);
    }
    Info = (message: string, option?: OptionsObject, key?: SnackbarKey) => {
        this.Toast(message, "info", option, key);
    }
    Error = (message: string, option?: OptionsObject, key?: SnackbarKey) => {
        this.Toast(message, "error", option, key);
    }
    Warning = (message: string, option?: OptionsObject, key?: SnackbarKey) => {
        this.Toast(message, "warning", option, key);
    }
    Toast = (message: string, variant: VariantType, option?: OptionsObject, key?: SnackbarKey) => {
        const me: any = this;
        option = option ?? {};

        if (!option.variant) {
            option.variant = variant;
        }
        if (!option.anchorOrigin) {
            option.anchorOrigin = { vertical: "top", horizontal: "right" };
        }

        const { enqueueSnackbar, closeSnackbar } = me;
        enqueueSnackbar(message, option);
        if (key) {
            closeSnackbar(key);
        }
    }
};
// @ts-ignore
export default withSnackbar(SnackbarExtended); */

export function useToast(): ProviderContextImpl {
    const toast = useSnackbar();
    return new SnackbarExtended(toast);
}

class SnackbarExtended implements ProviderContextImpl {
    constructor(context: ProviderContext) {
        this.context = context;
    }
    context: ProviderContext;
    Success(message: string, option?: OptionsObject | undefined, key?: string | number | undefined) {
        this.Toast(message, "success", option, key);
    }
    Info(message: string, option?: OptionsObject | undefined, key?: string | number | undefined) {
        this.Toast(message, "info", option, key);
    }
    Error(message: string, option?: OptionsObject | undefined, key?: string | number | undefined) {
        this.Toast(message, "error", option, key);
    }
    Warning(message: string, option?: OptionsObject | undefined, key?: string | number | undefined) {
        this.Toast(message, "warning", option, key);
    }
    Toast(message: string, variant: VariantType, option?: OptionsObject, key?: SnackbarKey) {
        option = option ?? {};

        if (!option.variant) {
            option.variant = variant;
        }
        if (!option.anchorOrigin) {
            option.anchorOrigin = { vertical: "top", horizontal: "right" };
        }
        option.autoHideDuration = null;//トーストの表示秒数（デフォルトは5000秒、nullで開いたまま）
        option.autoHideDuration = 10 * 1000;//トーストの表示秒数（デフォルトは5000秒）

        option.style = { whiteSpace: 'pre-line' };

        const { enqueueSnackbar, closeSnackbar } = this.context;
        option.onClick = () => {
            if (key) {
                closeSnackbar(key);
            }
            else {
                closeSnackbar();
            }
        };//閉じる
        message = message.replace(/Error:/g, "");
        enqueueSnackbar(message, option);
        if (key) {
            closeSnackbar(key);
        }
    }
}
