import React from "react";

declare global {
    interface StringConstructor {
        IsNullOrEmpty(str: string | undefined | null): boolean;
        IsNullOrWhiteSpace(str: string | undefined | null): boolean;

        Split(value: string, separator: string): string[];
        ToBoolean(value: string, defaultValue?: boolean): boolean;
    }
}
String.IsNullOrEmpty = (str: string) => !str;
String.IsNullOrWhiteSpace = (s: string) => String.IsNullOrEmpty(s) || s.replace(/\s/g, '').length < 1;
String.Split = function (s: string, sep: string) {
    return s.split(sep);
};
String.ToBoolean = function (s, defaultValue = false) {
    if (Object.IsNullOrUndefined(s)) return defaultValue;
    s = s.toLowerCase();

    if (s === 'true') return true;
    if (s === 'false') return false;

    return defaultValue;
}
