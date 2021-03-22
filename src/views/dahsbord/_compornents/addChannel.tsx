import React from "react";
import { useTranslation } from 'react-i18next';
import clsx from "clsx";
import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import AddChannelTokenDialog from "./addChannelTokenDialog";
import { useAddChannelTokenDialog } from "../_hooks/useAddChannelTokenDialog";

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        height: "300px",
        padding: theme.spacing(2)
    },
    actionArea: {
        height: "100%"
    },
    wh100: {
        width: "100%",
        height: "100%"
    },
    flex: {
        display: "flex"
    },
    icon: {
        fontSize: "3rem"
    },
    subTitle: {
        padding: "10px"
    }
}));
type Props = {

}
const AddChannel: React.FCX<Props> = (props) => {
    const { className, ...rest } = props;
    const classes = useStyle();
    const manager = useAddChannelTokenDialog();
    const { t } = useTranslation();
    return (<>
        <Card className={clsx(classes.root, className)} variant="outlined">
            <CardActionArea
                className={clsx(classes.actionArea)}
                onClick={e => manager.setOpen(true)}
            >
                <Grid container className={classes.wh100}>
                    <Grid item className={clsx(classes.wh100, classes.flex)}
                        justify="center" alignItems="center">
                        <Grid container>
                            <Grid item xs={12}
                                className={clsx(classes.flex)}
                                justify="center" alignItems="center">
                                <AddIcon className={classes.icon} />
                            </Grid>
                            <Grid item xs={12}
                                className={clsx(classes.flex)}
                                justify="center" alignItems="center">
                                <Typography variant="h6">
                                    {t("dashbord.compornents.AddChannel.button")}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}
                                className={clsx(classes.flex)}
                                justify="center" alignItems="center">
                                <Typography variant="caption" className={classes.subTitle}>
                                    {t("dashbord.compornents.AddChannel.decripttion")}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
        <AddChannelTokenDialog manager={manager} />
    </>);
}
export default AddChannel;