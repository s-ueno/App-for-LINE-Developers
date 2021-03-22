import React, { useState } from "react";
import {
    makeStyles,
    Grid,
    Theme,
    Typography,
    Switch,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core';

/** css in js(ts)  */
import clsx from "clsx";
import i18n from 'i18next';
const useStyle = makeStyles((theme: Theme) => ({
    root: {
    },
}));
type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
}

// ライブラリの既存バグ対応
const languagesBackup = i18n.languages.map(x => x);
const SelectLocales: React.FCX<Props> = (props) => {
    const classes = useStyle();
    const { open, setOpen, className, ...rest } = props;
    const [value, setValue] = useState(i18n.language);

    function onChange(newValue: string) {
        setValue(newValue);
    }
    function ok() {
        i18n.changeLanguage(value);
        setOpen(false)
    }
    return (<>
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            open={props.open}
            className={clsx(classes.root, className)}
            {...rest}
        >
            <DialogTitle id="confirmation-dialog-title">
                Select Language
            </DialogTitle>
            <DialogContent dividers>
                <RadioGroup
                    aria-label="ringtone"
                    name="ringtone"
                    defaultValue={value}
                    onChange={(e, newValue) => onChange(newValue)}
                >
                    {languagesBackup.map((lng) => (
                        <FormControlLabel value={lng} key={lng} control={<Radio />} label={lng} />
                    ))}
                </RadioGroup>
            </DialogContent>

            <DialogActions>
                <Button autoFocus onClick={() => setOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => ok()} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    </>);
};
export default SelectLocales;

