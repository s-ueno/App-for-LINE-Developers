import React, { useState } from "react";
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
import { messageAction, area } from "../../../models/richMenuObject";

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(1)
    },
    w100: {
        width: "100%"
    }
}));
type Props = {
    action: messageAction;
}
const FieldByMessage: React.FCX<Props> = (props) => {
    const { className, action, ...rest } = props;
    const classes = useStyle();
    const { t } = useTranslation();
    const [value, setValue] = useState(action);
    function onChange(newValue: string, name: "label" | "text") {
        setValue({ ...value, [name]: newValue });
        action[name] = newValue;
        console.log(`★：${name}:${newValue}`);
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
                label="text"
                value={action.text}
                error={!action.text?.trim()}
                helperText={!action.text?.trim() && t("richmenu.validate.required")}
                onChange={e => onChange(e.target.value, "text")}
            />
        </Grid>
    </>);
}
export default FieldByMessage;