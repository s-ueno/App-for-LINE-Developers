import React, { useState } from "react";
import {
    makeStyles,
    Grid,
    Theme,
    Typography,
    Switch,
    Button,
} from '@material-ui/core';

/** css in js(ts)  */
import clsx from "clsx";
import { ToggleTheme } from "../../../store/Theme/action";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store/rootModel";
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import SelectLocales from "./selectLocales";
const useStyle = makeStyles((theme: Theme) => ({
    theme: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& svg": {
            fontSize: "1.5rem"
        }
    },
    btn: {
        margin: "0 5px"
    }
}));
type Props = {

}
const ThemeToggle: React.FCX<Props> = (props) => {
    const classes = useStyle();
    const theme = useSelector((state: IRootState) => state.customTheme);
    const dispatch = useDispatch<any>();
    const [open, setOpen] = useState(false);
    function onToggleChange() {
        const newTheme = ToggleTheme();
        dispatch(newTheme);
    }
    return (
        <Grid item className={classes.theme}>
            {/*
                ライブラリがバグってて、言語変更すると、全部消える
                JSに直接パッチ充てる以外に方法がないので、ライブラリ側が解決するまで使わない
                https://github.com/isaachinman/next-i18next/issues/514
             */}
            <Button className={classes.btn}
                onClick={() => setOpen(true)}>
                <GTranslateIcon />
            </Button>

            <Typography variant="caption">
                <Brightness7Icon />
            </Typography>
            <Switch
                checked={theme.mode === 'dark'}
                color="default"
                onChange={onToggleChange}
            />
            <Typography component="span" variant="caption">
                <Brightness3Icon />
            </Typography>
            <SelectLocales open={open} setOpen={setOpen} />
        </Grid>
    );
}

export default ThemeToggle;