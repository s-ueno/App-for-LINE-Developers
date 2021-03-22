import React, { Fragment, Dispatch, useState } from "react";

import { FormControlLabel, Popover } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

// css in code(ts) -- inline style
import clsx from "clsx";
import style from "./style";
import { makeStyles } from '@material-ui/core/styles';
//import Button from "../../mui/components/Button";
const cssInCode = makeStyles(style);


type Props = {
    id: string;
    anchorEl: null | HTMLElement;
    onClose?: (e: any) => void;
    placement?: {
        vertical?: 'bottom' | 'top' | 'center',
        horizontal?: 'center' | 'left' | 'right',
    }

    role?: string | undefined;
    transition?: boolean;
    disablePortal?: boolean;
}

const PlacementMenu: React.FCX<Props> = (props) => {
    const classes = cssInCode();
    const { children, transition, disablePortal, ...rest } = props;
    const vertical = props?.placement?.vertical ?? 'bottom';
    const horizontal = props?.placement?.horizontal ?? 'right';
    function KeyDownAction(e) {
        if (e.key === 'Tab') {
            e.preventDefault();

            if (props.onClose) {
                props.onClose(e);
            }
        }
    }
    return (
        <Popover
            open={Boolean(props.anchorEl)}
            anchorEl={props.anchorEl}
            anchorOrigin={{
                vertical: vertical,
                horizontal: horizontal,
            }}
        >
            <ClickAwayListener onClickAway={e => props.onClose && props.onClose(e)}>
                <MenuList
                    autoFocusItem={Boolean(props.anchorEl)}
                    id={props.id}
                    onKeyDown={KeyDownAction}>
                    {children}
                </MenuList>
            </ClickAwayListener>
        </Popover>
    );
}


export default PlacementMenu;