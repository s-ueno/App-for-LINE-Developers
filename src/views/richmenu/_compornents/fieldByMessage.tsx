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
        <Grid item className={classes.root}>
            <TextField
                label="action type"
                value={action.type}
                InputProps={{
                    readOnly: true,
                }}
            />
        </Grid>
        <Grid item className={classes.root}>
            <TextField
                label="label"
                value={action.label}
                InputProps={{
                    readOnly: true,
                }}
            />
        </Grid>
        <Grid item className={classes.root}>
            <TextField
                label="text"
                value={action.text}
                InputProps={{
                    readOnly: true,
                }}
            />
        </Grid>
    </>);
}
export default FieldByMessage;