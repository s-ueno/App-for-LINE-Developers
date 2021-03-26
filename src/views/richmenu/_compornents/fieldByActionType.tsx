import React, { useMemo, useState } from "react";
import {
    Button,
    FormControl,
    Grid, InputLabel, makeStyles, MenuItem, Radio, Select, Theme
} from "@material-ui/core";
import {
    actionType, area, bounds, messageAction, postbackAction, richMenuObject, uriAction
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
    center: {
        display: "flex",
        alignItems: "center"
    }
}));

type Props = {
    richmenu: richMenuObject;
    index: number;
    selectedIndex: number | null;
    onSelectedChange: (newValue: number | null) => void;
    area: area,
    validate: {
        validator?: () => boolean;
    }
}
const FieldByActionType: React.FCX<Props> = (props) => {
    const uuid = uuidv4();
    const {
        className,
        richmenu,
        index,
        selectedIndex,
        onSelectedChange,
        area,
        validate,
        ...rest
    } = props;

    const classes = useStyle();
    const [value, setValue] = useState(area.action.type);
    const { t } = useTranslation();

    function handleChange(newValue: actionType) {
        setValue(newValue);
        area.action.type = newValue;
    }
    const messageValidator: { validator?: () => boolean } = {}
    const postbackValidator: { validator?: () => boolean } = {}
    const uriValidator: { validator?: () => boolean } = {}
    validate.validator =
        value === "message" ? messageValidator.validator :
            value === "postback" ? postbackValidator.validator : uriValidator.validator;

    function Field() {
        if (value === "message") {
            return (<FieldByMessage validate={messageValidator} action={area.action as messageAction} />)
        } else if (value === "postback") {
            return (<FieldByPostback validate={postbackValidator} action={area.action as postbackAction} />)
        }
        return (<FieldByUri validate={uriValidator} action={area.action as uriAction} />)
    }
    const MemoizedFiled = useMemo(() => {
        return (<Field />);
    }, [value]);

    function onRadioChange(checked: boolean) {
        if (checked) {
            onSelectedChange(index);
        }
    }

    return (<>
        <Grid item xs={12} className={clsx(classes.root, className)}>
            <Grid container className={classes.w100}>
                <Grid item xs={12} sm={6} lg={1}
                    className={clsx(classes.root, classes.center)}>
                    <Radio
                        checked={selectedIndex === index}
                        onChange={(e, checked) => onRadioChange(checked)}
                        value={index}
                        name={`rbt-select-area-${richmenu.richMenuId}`}
                    />
                </Grid>
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
                {MemoizedFiled}
            </Grid>
        </Grid>
    </>);
}

export default FieldByActionType;