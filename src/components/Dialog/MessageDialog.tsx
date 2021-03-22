import React, { useState, Dispatch, Fragment } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { v4 as uuidv4 } from 'uuid';
import { Alert, AlertTitle, Color } from "@material-ui/lab";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/rootModel";

// css in code(ts) -- inline style
import clsx from "clsx";
import style from "./style";
import { makeStyles } from '@material-ui/core/styles';

const cssInCode = makeStyles(style);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export type actionResult = "ok" | "cancel" | "yes" | "no" | null;
type actionsKey = "okOnly" | "okCancel" | "yesNo" | "yesNoCancel";
type Props = {
    severity: Color;
    open: boolean;
    onClose: (e, result: actionResult) => void;
    title?: string;
    message?: string;
    actions: actionsKey;


    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
    keepMounted?: boolean;
};




const MessageDialog: React.FCX<Props> = (props) => {
    const classes = cssInCode();
    const theme = useSelector((state: IRootState) => state.customTheme);


    const maxWidth = props?.maxWidth ?? 'xl';
    const keepMounted = props?.keepMounted ?? true;
    const titleId = "title-" + uuidv4();
    const descriptionId = "body-" + uuidv4();


    function Actions(actionKey: actionsKey) {
        switch (actionKey) {
            case "okOnly":
                return (
                    <Button onClick={e => props.onClose(e, "ok")} color="primary" className={clsx(theme.mode === "dark" && classes.actionText)}>
                        OK
                    </Button>
                );
            case "yesNo":
                return (
                    <Fragment>
                        <Button onClick={e => props.onClose(e, "no")} color="primary" className={clsx(theme.mode === "dark" && classes.actionText)}>
                            いいえ
                        </Button>
                        <Button onClick={e => props.onClose(e, "yes")} color="primary" className={clsx(theme.mode === "dark" && classes.actionText)}>
                            はい
                        </Button>
                    </Fragment>
                );
            case "okCancel":
                return (
                    <Fragment>
                        <Button onClick={e => props.onClose(e, "cancel")} color="primary" className={clsx(theme.mode === "dark" && classes.actionText)}>
                            キャンセル
                        </Button>
                        <Button onClick={e => props.onClose(e, "ok")} color="primary" className={clsx(theme.mode === "dark" && classes.actionText)}>
                            OK
                        </Button>
                    </Fragment>
                );
            case "yesNoCancel":
                return (
                    <Fragment>
                        <Button onClick={e => props.onClose(e, "cancel")} color="primary" className={clsx(theme.mode === "dark" && classes.actionText)}>
                            キャンセル
                        </Button>
                        <Button onClick={e => props.onClose(e, "no")} color="primary" className={clsx(theme.mode === "dark" && classes.actionText)}>
                            いいえ
                        </Button>
                        <Button onClick={e => props.onClose(e, "yes")} color="primary" className={clsx(theme.mode === "dark" && classes.actionText)}>
                            はい
                        </Button>
                    </Fragment>
                );
        }
    }
    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted={keepMounted}
            onClose={e => props.onClose(e, null)}
            maxWidth={maxWidth}
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className={clsx(classes.root, props.className)}
        >

            <Alert severity={props.severity} className={classes.title}>
                <AlertTitle id={titleId} >{props.title}</AlertTitle>

                <span id={descriptionId} className={classes.text}>{props?.message}</span>

                <DialogActions>
                    {Actions(props.actions)}
                </DialogActions>
            </Alert>

        </Dialog>
    );
};

export default MessageDialog;