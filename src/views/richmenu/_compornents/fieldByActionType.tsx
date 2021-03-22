import React, { useState } from "react";
import {
    Button,
    FormControl,
    Grid, InputLabel, makeStyles, MenuItem, Select, Theme
} from "@material-ui/core";
import {
    actionType, messageAction, postbackAction, uriAction
} from "../../../models/richMenuObject";
import { v4 as uuidv4 } from 'uuid';
import clsx from "clsx";
import FieldByPostback from "./fieldByPostback";
import FieldByMessage from "./fieldByMessage";
import FieldByUri from "./fieldByUri";
import { useTranslation } from "react-i18next";


const useStyle = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(1)
    },
    w100: {
        width: "100%"
    },
}));

type Props = {
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    },
    action: uriAction | postbackAction | messageAction;
}
const FieldByActionType: React.FCX<Props> = (props) => {
    const { className, ...rest } = props;
    const classes = useStyle();
    const [area, setArea] = useState(props);
    const [value, setValue] = useState(area.action.type);
    const { t } = useTranslation();
    function handleChange(newValue: actionType) {
        setArea({ ...area, ...{ ...area.action, type: newValue } });
        setValue(newValue);
    }
    function Field() {
        if (value === "message") {
            return (<FieldByMessage bounds={area.bounds} action={area.action as messageAction} />)
        } else if (value === "postback") {
            return (<FieldByPostback bounds={area.bounds} action={area.action as postbackAction} />)
        }
        return (<FieldByUri bounds={area.bounds} action={area.action as uriAction} />)
    }
    const uuid = uuidv4();
    return (<>
        <Grid item xs={12} className={clsx(classes.root, className)}>
            <Grid container className={classes.w100}>
                <Grid item xs={12} sm={6} lg={2} className={classes.root}>
                    <FormControl className={classes.w100}>
                        <InputLabel id={`select-label-${uuid}`}>action type</InputLabel>
                        <Select
                            labelId={`select-label-${uuid}`}
                            value={value}
                            onChange={e => handleChange(e.target.value as actionType)}
                        >
                            <MenuItem value="postback">postback</MenuItem>
                            <MenuItem value="message">message</MenuItem>
                            <MenuItem value="uri">uri</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Field />
                <Grid item xs={12} sm={6} lg={1} className={classes.root}>
                    <Button color="secondary">
                        {t("richmenu.button.delete")}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </>);
}

export default FieldByActionType;