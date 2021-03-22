import React from "react";
import {
    makeStyles,
    Grid,
    Drawer,
    Theme,
} from '@material-ui/core';
import { SideDrawerProps } from "./sideDrawerProps";
import { drawerWidth } from "../../../global";
import NavLinkList from "../_components/navLinkList";

/** css in js(ts)  */
import clsx from "clsx";
const useStyle = makeStyles((theme: Theme) => ({
    drawerPaper: {
        // border: "none",
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        zIndex: 1,
        width: drawerWidth,
        paddingTop: "81px",
        overflow: "hidden",
        [theme.breakpoints.down("md")]: {
            overflow: "auto"
        },
        [theme.breakpoints.down("sm")]: {
        }
    },
    title: {
        marginLeft: "5px"
    },
}));

const SideDrawer: React.FCX<SideDrawerProps> = (props) => {
    const classes = useStyle();

    return (
        <div>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper),
                }}
                open={true}
            >
                <NavLinkList />
            </Drawer>
        </div >
    );
};

export default SideDrawer;