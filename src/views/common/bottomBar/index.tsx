import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
    makeStyles,
    BottomNavigation,
    BottomNavigationAction,
} from '@material-ui/core';

/** icon */
import AppsIcon from '@material-ui/icons/Apps';

import { BottomNavigationProps } from "./bottomBarProps";

/** css in js(ts)  */
import clsx from "clsx";
const useStyle = makeStyles((theme) => ({
    bottomNav: {
        position: "fixed",
        bottom: 0,
        zIndex: theme.zIndex.drawer + 1,
        width: "100%",
    },
    iconSize: {
        height: "1rem",
        width: "1rem",
    },
    active: {
        "&.MuiBottomNavigationAction-root.Mui-selected": {
            color: "white",
        },
        backgroundColor: "#26377E",
    },
    inactive: {
        "&.MuiBottomNavigationAction - root.Mui - selected": {
            color: "#26377E",
        },
    }
}));
const BottomBar: React.FCX<BottomNavigationProps> = (props) => {
    const classes = useStyle();
    const [selectedValue, setSelectedValue] = useState(0);

    function onBottomMenuClick(e, val) {
        setSelectedValue(val);
    }
    return (
        <>
            <BottomNavigation
                value={selectedValue}
                onChange={(event, newValue) => onBottomMenuClick(event, newValue)}
                showLabels
                className={classes.bottomNav}
            >
                <BottomNavigationAction
                    label="channels"
                    icon={<AppsIcon className={classes.iconSize} fill={selectedValue === 0 ? "white" : "#26377E"} />}
                    to="/"
                    component={Link}
                    className={clsx(selectedValue === 0 ? classes.active : classes.inactive)}
                />
            </BottomNavigation>
        </>
    );
};

export default BottomBar;