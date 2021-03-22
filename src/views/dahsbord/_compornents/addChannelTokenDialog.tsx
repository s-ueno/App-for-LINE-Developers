import React from "react";
import { useTranslation } from 'react-i18next';
import clsx from "clsx";
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
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
import AddIcon from '@material-ui/icons/Add';
import { AddChannelTokenManager, useAddChannelTokenDialog } from "../_hooks/useAddChannelTokenDialog";

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        height: "300px",
    },
}));
type Props = {
    manager: AddChannelTokenManager
}
const AddChannelTokenDialog: React.FCX<Props> = (props) => {
    const { className, manager, ...rest } = props;
    const classes = useStyle();
    const { t } = useTranslation();
    const { open, setOpen, token, validateAsync } = manager;
    return (<>
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-addChannelTokenDialog">
            <DialogTitle id="form-addChannelTokenDialog">
                {t("dashbord.compornents.addChannelTokenDialog.title")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t("dashbord.compornents.addChannelTokenDialog.description")}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    type="password"
                    label="channel access token"
                    autoComplete="token"
                    fullWidth
                    value={token.state}
                    error={token.hasError}
                    helperText={token.errorMessage}
                    onChange={e => token.onChange(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                    {t("dashbord.compornents.addChannelTokenDialog.button.cancel")}
                </Button>
                <Button onClick={async () => await validateAsync()} color="primary">
                    {t("dashbord.compornents.addChannelTokenDialog.button.subscribe")}
                </Button>
            </DialogActions>
        </Dialog>
    </>);
}
export default AddChannelTokenDialog;