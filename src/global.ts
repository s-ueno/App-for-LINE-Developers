import { toKatakanaCase, toZenkakuCase, toZenkakuSpace, toZenkanaCase } from 'encoding-japanese';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { IRootState } from './store/rootModel';

/** サイドバーが開いた際のサイズ */
export const drawerWidth = 280;
/** サイドバーが閉じた際のサイズ */
export const drawerMinWidth = 56;
/** タイトルバーの高さ */
export const appbarHeight = 80;
/** タイトルバーの高さ(モバイルの場合) */
export const appbarMobileHeight = 60;
/** スマホのボトムバーの高さ */
export const bottomBarHeight = 56;

/** PC Copylightの高さ */
export const pcCopylight = 30;

declare module 'react' {
    type FCX<P = {}> = FunctionComponent<P & { className?: string }>
}
declare module 'react-redux' {
    interface DefaultRootState extends IRootState { }
}

declare module "@material-ui/core/styles/createBreakpoints" {
    interface BreakpointOverrides {
    }
}

export function Delay(msec: number, lazyAction?: Function) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (lazyAction) {
                try {
                    lazyAction()
                } catch (e) {
                    reject(e);
                }
            }
            setTimeout(() => resolve(null), msec);
        }, 1);
    });
}

var setTimeoutHandle: { [key: string]: any } = {};
export function Lazy(action: Function, msec: number) {
    const key = action.toString();
    clearTimeout(setTimeoutHandle[key]);
    return new Promise((resolve, reject) => {
        setTimeoutHandle[key] = setTimeout(() => {
            resolve(action());
        }, msec);
    });
}

export const transition = {
    transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
};


export function ConvertKana(s: string) {
    let newValue = toZenkakuCase(s);
    newValue = toKatakanaCase(newValue);
    newValue = toZenkanaCase(newValue);
    newValue = toZenkakuSpace(newValue);

    return newValue;
}
