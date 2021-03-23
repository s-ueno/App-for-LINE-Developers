import React from "react";
import { useTranslation } from 'react-i18next';
import ReactCrop from "react-image-crop";
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
        width: "100%",
    },
    item: {
        padding: theme.spacing(1)
    },
    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
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
    const [richMenuImage, setRichMenuImage] = useRichmenuImageAsync(token, richmenu.richMenuId);
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} md={6} lg={4} className={classes.center}>
                {
                    richMenuImage ? (
                        <ReactCrop 
                        className={classes.w100} 
                        src={richMenuImage}
                    />    
                    ) : (
                        <Typography variant="caption" className={classes.item}>
                            no data
                        </Typography>                        
                    )
                }
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
                <Grid container className={classes.w100}>
                    <Grid item xs={12} md={6} lg={3} className={classes.item}>
                        <TextField className={classes.w100}
                            label="name"
                            value={richmenu.name}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} className={classes.item}>
                        <TextField className={classes.w100}
                            label="chatBarText"
                            value={richmenu.chatBarText}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={5} className={classes.item}>
                        <TextField className={classes.w100}
                            label="richMenuId"
                            value={richmenu.richMenuId}
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