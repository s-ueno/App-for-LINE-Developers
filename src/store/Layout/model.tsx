import React from "react";
//svcIcon
import { SvgIcon } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home'

export interface ITitle {
    icon?: JSX.Element;
    title?: string;
}

export const initialTitle: ITitle = {
    icon: <></> ,
    title: "",
}
