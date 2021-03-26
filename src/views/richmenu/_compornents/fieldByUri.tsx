import React, { useState } from "react";
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
    const [value, setValue] = useState(action);

    function onChange(newValue: string, name: "label" | "uri") {
        setValue({ ...value, [name]: newValue });
        action[name] = newValue;
    }
    return (<>
        <Grid item xs={12} sm={6} lg={2} className={classes.root}>
            <TextField className={classes.w100}
                label="label"
                value={value.label}
                error={!value.label?.trim()}
                helperText={!value.label?.trim() && t("richmenu.validate.required")}
                onChange={e => onChange(e.target.value, "label")}
            />
        </Grid>
        <Grid item xs={12} sm={6} lg={7} className={classes.root}>
            <TextField className={classes.w100}
                label="uri"
                value={value.uri}
                error={!value.uri?.trim()}
                helperText={!value.uri?.trim() && t("richmenu.validate.required")}
                onChange={e => onChange(e.target.value, "uri")}
            />
        </Grid>
    </>);
}
export default FieldByUri;