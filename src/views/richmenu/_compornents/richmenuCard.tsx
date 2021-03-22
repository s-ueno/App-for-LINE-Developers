import React from "react";
import { useTranslation } from 'react-i18next';
import clsx from "clsx";
import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Checkbox,
    FormControlLabel,
    Grid,
    makeStyles,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import { messageAction, postbackAction, richMenuObject, uriAction } from "../../../models/richMenuObject";
import { useRichmenuImageAsync } from "../_hooks/useRichmenuImage";
import FieldByPostback from "./fieldByPostback";
import FieldByMessage from "./fieldByMessage";
import FieldByUri from "./fieldByUri";
import FieldByActionType from "./fieldByActionType";

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        height: "100%",
        width: "100%",
        padding: theme.spacing(2)
    },
    item: {
        padding: theme.spacing(1)
    },
    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    media: {
        height: "200px",
        width: "100%",
        padding: theme.spacing(1)
    },
    w100: {
        width: "100%"
    }
}));
type Props = {
    token: string;
    richmenu: richMenuObject
}
const RichmenuCard: React.FCX<Props> = (props) => {
    const { className, token, richmenu, ...rest } = props;
    const classes = useStyle();
    const richMenuImage = useRichmenuImageAsync(token, richmenu.richMenuId);
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} md={6} lg={4} className={classes.center}>
                <img src={richMenuImage} className={classes.media} />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
                <Grid container className={classes.w100}>
                    <Grid item xs={12} md={6} lg={4} className={classes.item}>
                        <TextField
                            label="name"
                            value={richmenu.name}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} className={classes.item}>
                        <TextField
                            label="chatBarText"
                            value={richmenu.chatBarText}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} className={classes.item}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={richmenu.selected === true}
                                    color="primary"
                                />
                            }
                            label="Default RichMenu"
                        />
                    </Grid>
                    {richmenu?.areas?.map(x => {
                        return (
                            <FieldByActionType
                                bounds={x.bounds}
                                action={x.action as uriAction}
                            />
                        );
                    })}
                </Grid>
            </Grid>
        </Grid>);
}
export default RichmenuCard;