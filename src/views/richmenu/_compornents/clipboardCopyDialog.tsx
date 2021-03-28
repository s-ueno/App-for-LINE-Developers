import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import clsx from "clsx";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    makeStyles,
    OutlinedInput,
    TextField,
    Theme,
    Tooltip,
    Typography
} from "@material-ui/core";
import AssignmentIcon from '@material-ui/icons/Assignment';
import CopyToClipBoard from 'react-copy-to-clipboard';

const useStyle = makeStyles((theme: Theme) => ({
    root: {
    },
    w100: {
        width: "100%",
    },
    padding: {
        padding: theme.spacing(2)
    }
}));
type Props = {
    richmenuId: string;
    open: boolean;
    setOpen: (result: boolean) => void;
}
const ClipboardCopyDialog: React.FCX<Props> = (props) => {
    const { className, richmenuId, open, setOpen, ...rest } = props;
    const classes = useStyle();
    const { t } = useTranslation();
    return (<>
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-ResizeDialog">
            <DialogTitle id="form-ResizeDialog">
                {t("richmenu.messages.updated")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t("richmenu.messages.clipboardCopy")}
                </DialogContentText>
                <ClipboardCopyFiled value={richmenuId}
                    className={clsx(classes.w100, classes.padding)} />
            </DialogContent>
        </Dialog>
    </>);
}

const ClipboardCopyFiled: React.FCX<{ value: string }> = (props) => {
    const { value, className, ...rest } = props;
    const [openTip, setOpenTip] = useState<boolean>(false);
    return (
        <FormControl
            variant='outlined'
            className={className}
        >
            <OutlinedInput
                type='text'
                value={value}
                endAdornment={
                    <InputAdornment position="end">
                        <Tooltip
                            arrow
                            open={openTip}
                            onClose={() => setOpenTip(false)}
                            disableHoverListener
                            placement='top'
                            title='Copied!'
                        >
                            <CopyToClipBoard text={value}>
                                <IconButton
                                    onClick={() => setOpenTip(true)}
                                >
                                    <AssignmentIcon />
                                </IconButton>
                            </CopyToClipBoard>
                        </Tooltip>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}

export default ClipboardCopyDialog;