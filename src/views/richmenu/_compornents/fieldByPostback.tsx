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
import { postbackAction, richMenuObject } from "../../../models/richMenuObject";

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
}
const FieldByPostback: React.FCX<Props> = (props) => {
    const { className, action, ...rest } = props;
    const classes = useStyle();
    const { t } = useTranslation();
    const [value, setValue] = useState(action);
    function onChange(newValue: string, name: "label" | "data" | "displayText") {
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
        <Grid item xs={12} sm={6} lg={3} className={classes.root}>
            <TextField className={classes.w100}
                label="data"
                value={value.data}
                error={!value.data?.trim()}
                helperText={!value.data?.trim() && t("richmenu.validate.required")}
                onChange={e => onChange(e.target.value, "data")}
            />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} className={classes.root}>
            <TextField className={classes.w100}
                label="displayText"
                value={value.displayText}
                onChange={e => onChange(e.target.value, "displayText")}
            />
        </Grid>
    </>);
}
export default FieldByPostback;