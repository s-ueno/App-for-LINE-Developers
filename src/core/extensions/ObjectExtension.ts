import React from "react";

declare global {
    // @ts-ignore
    interface ObjectConstructor {
        IsNullOrUndefined(obj: any): boolean;
        NameOf(name: any): string;
    }
}

//declare var ObjectConstructor: ObjectConstructor

Object.IsNullOrUndefined = (obj: any) => {
    if (obj == null) return true;
    if (obj === null) return true;
    if (typeof obj === 'undefined') return true;
    return false;
};
