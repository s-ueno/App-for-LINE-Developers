import React from "react";
import {
    makeStyles,
    Grid,
    Typography,
} from '@material-ui/core';

import { pcCopylight } from "../../global";
import clsx from "clsx";

const useStyle = makeStyles((theme) => ({
    root: {
        height: `${pcCopylight}px`,
        padding: "10px 30px 10px 0px"
    },
    copylight: {
        display: "flex",
        WebkitJustifyContent: "flex-end",
        justifyContent: "flex-end",
        fontSize: "11px",
        color: "#6F7DB7",
        fontFamily: "Lato",
        width: "100%"
    },
    w100: {
        width: "100%"
    }
}));
const Copylight: React.FCX<any> = (props) => {
    const classes = useStyle();
    const { className, classNameInner, ...rest } = props;
    return (<>
        <Grid container className={clsx(classes.root, className)}>
            <Typography
                align="center"
                variant="caption"
                className={clsx(classes.copylight, classNameInner)}
            >
                Copyright 2021 (c) uEN All Rights Reserved.
            </Typography>
        </Grid>
    </>);
};

export default Copylight;
