import React, { useState } from "react";
import {
    makeStyles,
    Grid,
    AppBar,
    Toolbar,
    Theme,
} from '@material-ui/core';
import Logo from "../../../components/Logo";
import { TitleNavigationProps } from "./titleNavigationProps";
import { appbarHeight, appbarMobileHeight } from "../../../global";
import ThemeToggle from "../_components/themeToggle";

/** css in js(ts)  */
import clsx from "clsx";
const useStyle = makeStyles((theme: Theme) => ({
    root: {
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        WebkitTransition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        top: 0,
        height: appbarHeight,
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
            height: appbarMobileHeight,
        },
    },

}));
const TitleBar: React.FCX<TitleNavigationProps> = (props) => {
    const classes = useStyle();
    return (
        <div className={clsx(classes.root)}>
            <AppBar
                elevation={1 /* 0でタイトルバーのshadowスタイルを消す */}
                position="fixed"
                className={clsx(classes.appBar)}
            >
                <Toolbar>
                    <Grid container>
                        <Logo />
                    </Grid>
                    <Grid container justify="flex-end">
                        <ThemeToggle />
                    </Grid>
                </Toolbar>
            </AppBar >
        </div >
    );
};

export default TitleBar;

