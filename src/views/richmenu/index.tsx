import React from "react";
import {
    Avatar,
    Button,
    Divider,
    Grid,
    Link,
    makeStyles,
    TextField,
    Theme,
    Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";


/** css in js(ts)  */
import clsx from "clsx";
import { IRootState } from "../../store/rootModel";
import { UpdateTitle } from "../../store/Layout/action";
import { useAccount } from "./_hooks/useAccount";
import { useTranslation } from "react-i18next";
import RichmenuCard from "./_compornents/richmenuCard";
const useStyle = makeStyles((theme: Theme) => ({
    root: {
    },
    avatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    title: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        border: "1px solid #D3D5E2",
        width: "100%"
    },
    center: {
        display: "flex",
        alignItems: "center"
    },
    flexGrow: {
        display: "flex",
        flexGrow: 1,
    },
    button: {
        width: "100px",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    }
}));
const Richmenu: React.FC = () => {
    const classes = useStyle();
    const dispatch = useDispatch<any>();
    const account = useAccount();
    const { t } = useTranslation();

    dispatch(UpdateTitle("richmenu"));

    return (<>
        <Grid container>
            <Grid item className={classes.center}>
                <Typography variant="h5" className={classes.title}>
                    <Avatar src={account.pictureUrl} className={classes.avatar} />
                </Typography>
            </Grid>
            <Grid item className={classes.center}>
                <Typography variant="h6" className={classes.title}>
                    {account.displayName}
                </Typography>
            </Grid>
            <Grid item className={clsx(classes.center, classes.flexGrow)}>
                <Typography variant="caption" className={classes.title}>
                    {account.id}
                </Typography>
            </Grid>
            <Grid item className={clsx(classes.title)}>
                <Button color="primary" variant="contained" className={classes.button}
                    onClick={() => account.addMenu()}
                >
                    {t("richmenu.button.add")}
                </Button>
                <Button color="secondary" variant="contained" className={classes.button}
                    onClick={() => account.unsubscribe()}
                >
                    {t("richmenu.button.unSubscribe")}
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Divider className={classes.divider} ></Divider>
            </Grid>

            {account.richMenus?.map(x => {
                return (
                    <Grid item xs={12}>
                        <RichmenuCard
                            token={account.token}
                            richmenu={x}
                        />
                    </Grid>
                );
            })}
        </Grid>
    </>)
};

export default Richmenu;