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
import { postbackAction, richMenuObject } from "../../../models/richMenuObject";
import { useFieldByPostback } from "../_hooks/useFieldByPostback";

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(1)
    },
    w100: {
        width: "100%"
    }
}));
type Props = {
    action: postbackAction;
    validate: { validator?: () => boolean }
}
const FieldByPostback: React.FCX<Props> = (props) => {
    const { className, validate, action, ...rest } = props;
    const classes = useStyle();
    const { label, data, displayText } = useFieldByPostback(action, validate);
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
        <Grid item xs={12} sm={6} lg={3} className={classes.root}>
            <TextField className={classes.w100}
                label="data"
                value={data.state}
                error={data.hasError}
                helperText={data.errorMessage}
                onChange={e => data.onChange(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} className={classes.root}>
            <TextField className={classes.w100}
                label="displayText"
                value={displayText.state}
                error={displayText.hasError}
                helperText={displayText.errorMessage}
                onChange={e => displayText.onChange(e.target.value)}
            />
        </Grid>
    </>);
}
export default FieldByPostback;