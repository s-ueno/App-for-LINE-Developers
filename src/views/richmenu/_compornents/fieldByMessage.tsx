import React from "react";
import { useTranslation } from 'react-i18next';
import clsx from "clsx";
import {
    Button,
    Grid,
    makeStyles,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import { messageAction, richMenuObject } from "../../../models/richMenuObject";
import { useFieldByMessage } from "../_hooks/useFieldByMessage";

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(1)
    },
    w100: {
        width: "100%"
    }
}));
type Props = {
    validate: {
        validator?: () => boolean;
    },
    action: messageAction;
}
const FieldByMessage: React.FCX<Props> = (props) => {
    const { className, validate, action, ...rest } = props;
    const classes = useStyle();
    const { t } = useTranslation();
    const { label, text } = useFieldByMessage(action, validate);
    return (<>
        <Grid item xs={12} sm={6} lg={2} className={classes.root}>
            <TextField className={classes.w100}
                label="label"
                value={label.state}
                error={label.hasError}
                helperText={label.errorMessage}
                onChange={e => label.onChange(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6} lg={7} className={classes.root}>
            <TextField className={classes.w100}
                label="text"
                value={text.state}
                error={text.hasError}
                helperText={text.errorMessage}
                onChange={e => text.onChange(e.target.value)}
            />
        </Grid>
    </>);
}
export default FieldByMessage;