import React from "react";
import { useTranslation } from 'react-i18next';
import clsx from "clsx";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    makeStyles,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";

const useStyle = makeStyles((theme: Theme) => ({
    root: {
    },
}));
type Result = 1686 | 843 | 0
type Props = {
    open: boolean;
    setResult: (result: Result) => void;
}
const ResizeDialog: React.FCX<Props> = (props) => {
    const { className, open, setResult, ...rest } = props;
    const classes = useStyle();
    const { t } = useTranslation();
    function onClick(result: Result) {
        setResult(result);
    }
    return (<>
        <Dialog open={open} aria-labelledby="form-ResizeDialog">
            <DialogTitle id="form-ResizeDialog">
                {t("dashbord.compornents.ResizeDialog.title")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t("dashbord.compornents.ResizeDialog.description")}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClick(1686)} color="primary">
                    {t("dashbord.compornents.ResizeDialog.button.1686")}
                </Button>
                <Button onClick={() => onClick(843)} color="primary">
                    {t("dashbord.compornents.ResizeDialog.button.843")}
                </Button>
                <Button onClick={() => onClick(0)} color="primary">
                    {t("dashbord.compornents.ResizeDialog.button.0")}
                </Button>
            </DialogActions>
        </Dialog>
    </>);
}
export default ResizeDialog;