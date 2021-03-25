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
import { uriAction, richMenuObject } from "../../../models/richMenuObject";
import { useFieldByUri } from "../_hooks/useFieldByUri";

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(1)
    },
    w100: {
        width: "100%"
    }
}));
type Props = {
    action: uriAction;
    validate: {
        validator?: () => boolean;
    }
}
const FieldByUri: React.FCX<Props> = (props) => {
    const { className, validate, action, ...rest } = props;
    const classes = useStyle();
    const { label, uri } = useFieldByUri(action, validate);
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
                label="uri"
                value={uri.state}
                error={uri.hasError}
                helperText={uri.errorMessage}
                onChange={e => uri.onChange(e.target.value)}
            />
        </Grid>
    </>);
}
export default FieldByUri;