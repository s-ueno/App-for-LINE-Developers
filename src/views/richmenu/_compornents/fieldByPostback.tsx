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
    function onChange(newValue: string, setValue: (newValue: string, action: postbackAction) => void) {
        setValue(newValue, action);
        console.log(`★${setValue}:${newValue}`);
    }
    return (<>
        <Grid item xs={12} sm={6} lg={2} className={classes.root}>
            <TextField className={classes.w100}
                label="label"
                value={action.label}
                error={!action.label?.trim()}
                helperText={!action.label?.trim() && t("richmenu.validate.required")}
                onChange={e => onChange(e.target.value, (x, y) => y.label = x)}
            />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} className={classes.root}>
            <TextField className={classes.w100}
                label="data"
                value={action.data}
                error={!action.data?.trim()}
                helperText={!action.data?.trim() && t("richmenu.validate.required")}
                onChange={e => onChange(e.target.value, (x, y) => y.data = x)}
            />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} className={classes.root}>
            <TextField className={classes.w100}
                label="displayText"
                value={action.displayText}
                error={!action.displayText?.trim()}
                helperText={!action.displayText?.trim() && t("richmenu.validate.required")}
                onChange={e => onChange(e.target.value, (x, y) => y.displayText = x)}
            />
        </Grid>
    </>);
}
export default FieldByPostback;