import React from "react";
import { useTranslation } from 'react-i18next';
import clsx from "clsx";
import {
    Grid,
    makeStyles,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import { messageAction, richMenuObject } from "../../../models/richMenuObject";

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(1)
    },
    w100: {
        width: "100%"
    }
}));
type Props = {
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    },
    action: messageAction;
}
const FieldByMessage: React.FCX<Props> = (props) => {
    const { className, bounds, action, ...rest } = props;
    const classes = useStyle();
    return (<>
        <Grid item xs={12} sm={6} lg={3} className={classes.root}>
            <TextField
                label="label"
                value={action.label}
            />
        </Grid>
        <Grid item xs={12} sm={6} lg={7} className={classes.root}>
            <TextField
                label="text"
                value={action.text}
            />
        </Grid>
    </>);
}
export default FieldByMessage;