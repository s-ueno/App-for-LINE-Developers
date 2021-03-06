import React, { Dispatch, useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import Backdrop from '@material-ui/core/Backdrop';
import { useSelector, useDispatch } from "react-redux";
import Layout from './views/common/lyaout';
import AppRoute from './AppRoute';
import { IRootState } from './store/rootModel';
import { SnackbarProvider } from 'notistack';
import "./core/extensions/EnumerableExtension";
import "./core/extensions/ObjectExtension";
import "./core/extensions/SnackbarExtension";
import "./core/extensions/StringExttension";


import {
    makeStyles,
    CircularProgress,
    createMuiTheme,
    CssBaseline,
} from "@material-ui/core";
import classes from '*.module.sass';
import clsx from 'clsx';

/** css in js(ts)  */
const cssInCode = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    error: {
        backgroundColor: "#f5c7c0",
        color: "#5d5b5b",
    },
    onModal: {
        zIndex: 1301 // model:1300 / snackbar:1400 / tootips:1500
    }
}));


const App: React.FC = () => {
    const classes = cssInCode();
    const overlay = useSelector((x: IRootState) => x.overlay);
    const customTheme = useSelector((x: IRootState) => x.customTheme);
    const overrideTheme = createMuiTheme({
        typography: {
            "fontFamily": `"Lato", "Noto Sans JP", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "ヒラギノ角ゴシック", "メイリオ", Meiryo, Osaka, "ＭＳ Ｐゴシック", "MS PGothic", "sans-serif"`,
        },
        palette: {
            type: customTheme.mode,
            primary: customTheme.mode === "dark" ? {
                light: "#3898C4",
                main: "#077BB0",
                dark: "#75B9D9",
                contrastText: "#fff"
            } : {
                light: "#7986cb",
                main: "#3f51b5",
                dark: "#303f9f",
                contrastText: "#fff"
            },
            secondary: customTheme.mode === "dark" ? {
                light: "#F3BBBE",
                main: "#E8787E",
                dark: "#DC3A43",
                contrastText: "#fff"
            } : {
                light: "#ABD17D",
                main: "#80B53F",
                dark: "#5A980E",
                contrastText: "#fff"
            },
            background: customTheme.mode === "dark" ?
                {
                    default: "#303030", paper: "#424242"
                } : {
                    default: "#eff0f3", paper: "#fff"
                }
            ,
        },
        overrides: {
            MuiAppBar: {
                colorPrimary: {
                    color: customTheme.mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
                    backgroundColor: customTheme.mode === "dark" ? "#424242" : "#FFFAFA"
                }
            },
            MuiBackdrop: {
                root: {
                    backgroundColor: "rgba(0,0,0,0.6)",
                }
            },
            MuiDrawer: {
                paper: {
                    background: customTheme.mode === "dark" ? "#424242" : "#FFFAFA"
                }
            }
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1280,
                xl: 1920,
            }
        },
    });

    return (
        <ThemeProvider theme={overrideTheme}>
            <CssBaseline />
            <SnackbarProvider
                maxSnack={5}
                classes={{
                    variantError: classes.error,
                }}
            >
                <div id="wrapper">
                    <Layout>
                        <AppRoute />
                    </Layout>
                </div>

                <Backdrop
                    className={clsx(classes.backdrop, overlay.openWaitingSite && classes.onModal)}
                    open={overlay.openWaitingSite} >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
