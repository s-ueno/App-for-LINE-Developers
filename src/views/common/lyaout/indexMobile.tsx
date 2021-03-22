import React from "react";
import {
    Divider,
    Grid,
    makeStyles,
    Theme,
    Typography
} from '@material-ui/core';
import TitleNavigation from "../titleNavigation";
import {
    appbarMobileHeight,
    bottomBarHeight,
    drawerWidth,
    pcCopylight
} from '../../../global';

/** css in js(ts)  */
import clsx from "clsx";
import Copylight from "../../../components/Copylight";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/rootModel";
import { useLocation } from "react-router";
import BottomBar from "../bottomBar";
const useStyle = makeStyles((theme: Theme) => ({
    root: {

    },
    main: {
        width: "100%",
        minHeight: `calc(100vh - ${appbarMobileHeight}px - ${pcCopylight + bottomBarHeight}px)`,
        height: "100%",
        paddingTop: `${appbarMobileHeight}px`,
        overflowY: "hidden",
        overflowX: "hidden",
        WebkitOverflowScrolling: "auto",
        overflowScrolling: "auto",
    },
    mainInner: {
        height: "100%",
        width: "100%",
        minHeight: `calc(100vh - ${appbarMobileHeight}px - ${pcCopylight + bottomBarHeight}px)`,
        padding: "10px 10px 0 10px"
    },
    titleContainer: {
        marginBottom: "9px",
    },
    title: {
        fontSize: "18px",
        fontWeight: 700
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        border: "1px solid #D3D5E2",
        width: "100%"
    },
    copylightContainer: {
        padding: 0
    },
    copylight: {
        WebkitJustifyContent: "center",
        justifyContent: "center",
        padding: 0,
        display: "flex",
        WebkitAlignItems: "center",
        alignItems: "center",
    },
}));

const LayoutMobile: React.FC = (props) => {
    const classes = useStyle();
    const { children, ...rest } = props;
    return (
        <div className={classes.root}>
            {/* タイトルバー */}
            <TitleNavigation />

            {/* メインのコンテンツ */}
            <main id="content-wrapper"
                className={clsx(classes.main /*, "scroll" */)}>
                <div className={classes.mainInner} >
                    {children}
                </div>
                <Copylight
                    className={classes.copylightContainer}
                    classNameInner={classes.copylight}
                />
            </main>

            {/* ボトムバー */}
            <BottomBar />
        </div>
    );
};

export default LayoutMobile;