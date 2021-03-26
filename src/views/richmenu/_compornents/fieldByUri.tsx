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
}
const FieldByUri: React.FCX<Props> = (props) => {
    const { className, action, ...rest } = props;
    const classes = useStyle();
    const { t } = useTranslation();
    return (<>
        <Grid item xs={12} sm={6} lg={2} className={classes.root}>
            <TextField className={classes.w100}
                label="label"
                value={action.label}
                error={!action.label?.trim()}
                helperText={!action.label?.trim() && t("richmenu.validate.required")}
                onChange={e => action.label = e.target.value}
            />
        </Grid>
        <Grid item xs={12} sm={6} lg={7} className={classes.root}>
            <TextField className={classes.w100}
                label="uri"
                value={action.uri}
                error={!action.uri?.trim()}
                helperText={!action.uri?.trim() && t("richmenu.validate.required")}
                onChange={e => action.uri = e.target.value}
            />
        </Grid>
    </>);
}
export default FieldByUri;