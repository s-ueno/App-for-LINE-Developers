import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Divider,
    Grid,
    makeStyles,
    Theme,
    Typography
} from '@material-ui/core';
import TitleNavigation from "../titleNavigation";
import SideDrawer from "../sideDrawer";
import {
    drawerWidth,
    drawerMinWidth,
    appbarHeight,
    pcCopylight,
    bottomBarHeight,
} from '../../../global';
import { IRootState } from "../../../store/rootModel";
import Copylight from "../../../components/Copylight";

/** css in js(ts)  */
import clsx from "clsx";
const useStyle = makeStyles((theme: Theme) => ({
    root: {

    },
    main: {
        width: "100%",
        minHeight: `calc(100vh - ${appbarHeight}px - ${pcCopylight}px)`,
        height: "100%",
        paddingTop: `${appbarHeight}px`,
        paddingLeft: `${drawerWidth}px`,
        overflowY: "hidden",
        overflowX: "hidden",
        WebkitOverflowScrolling: "auto",
        overflowScrolling: "auto"
    },
    mainInner: {
        height: "100%",
        width: "100%",
        minHeight: `calc(100vh - ${appbarHeight}px - ${pcCopylight}px)`,
        padding: "15px 30px 0px 30px",
    },
    displayNone: {
        display: "none",
    },
    titleContainer: {
        marginBottom: "9px",
    },
    title: {
        fontWeight: 700
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        border: "1px solid #D3D5E2",
        width: "100%"
    },
    titlebarColor: {
        backgroundColor: "white",
    },
}));
const LayoutPC: React.FC = (props) => {
    const classes = useStyle();
    const { children, ...rest } = props;
    return (
        <div className={classes.root}>
            {/* タイトルバー */}
            <TitleNavigation />

            {/* サイドバー */}
            < SideDrawer />

            {/* メインのコンテンツ */}
            <main id="content-wrapper"
                className={clsx(classes.main)}>
                <div className={classes.mainInner} >
                    {children}
                </div>
                <Copylight />
            </main>
        </div>
    );
};

export default LayoutPC;