import React from "react";
import {
    makeStyles,
    Grid,
    Typography,
    useMediaQuery,
    Theme,
} from '@material-ui/core';

import clsx from "clsx";

const useStyle = makeStyles((theme) => ({
    root: {
    },
}));



const Logo: React.FCX<any> = (props) => {
    const classes = useStyle();
    const isSmDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    function Typo() {
        if (isSmDown) {
            return (
                <Typography variant="subtitle1">
                    App for LINE Dev
                </Typography>
            );
        }
        return (
            <Typography variant="h6">
                App for LINE Developers
            </Typography>
        );
    }
    return (<Typo />);
};

export default Logo;
