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

/** css in js(ts)  */
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import RichmenuCard from "./_compornents/richmenuCard";
import { useAccountManager } from "./_hooks/useAccountManager";
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
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));
type Props = {
    key: string;
}
const Richmenu: React.FCX<any> = (props) => {
    const { key, ...rest } = props;
    const classes = useStyle();
    const { t } = useTranslation();

    const {
        account,
        setAccount,
        unsubscribe,
        channel,
        setRichmenuObject,
        addRichmenuObject
    } = useAccountManager();

    return (
        <Grid container key={key}>
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
                    onClick={() => addRichmenuObject()}
                >
                    {t("richmenu.button.add")}
                </Button>
                <Button color="secondary" variant="contained" className={classes.button}
                    onClick={() => unsubscribe()}
                >
                    {t("richmenu.button.unSubscribe")}
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Divider className={classes.divider} ></Divider>
            </Grid>

            {channel.richmenus?.map((x, index) => {
                return (<>
                    <Grid item xs={12}>
                        <RichmenuCard
                            token={account.token}
                            richmenu={x}
                            setRichmenuObject={setRichmenuObject}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider id={`$richmenu-${index}`} className={classes.divider} ></Divider>
                    </Grid>
                </>);
            })}
        </Grid>
    )
};

export default Richmenu;