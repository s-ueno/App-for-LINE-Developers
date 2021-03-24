import React, { useEffect, useState } from "react";
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
import { bounds, messageAction, postbackAction, richMenuObject, uriAction } from "../../../models/richMenuObject";
import { useRichmenuImageAsync } from "../_hooks/useRichmenuImage";
import FieldByPostback from "./fieldByPostback";
import FieldByMessage from "./fieldByMessage";
import FieldByUri from "./fieldByUri";
import FieldByActionType from "./fieldByActionType";
import { Skeleton } from "@material-ui/lab";

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
    const [selectedArea, setSelectedArea] = useState<number | null>(null);
    const [crop, setCrop] = useState<any>();
    const [richMenuImage, setRichMenuImage, loading, httpStatus]
        = useRichmenuImageAsync(token, richmenu.richMenuId);
    const { t } = useTranslation();


    function onSelectedChange(bounds: bounds, index: number) {
        setSelectedArea(index);
        const b: any = {
            width: bounds.width,
            height: bounds.height,
            x: bounds.x,
            y: bounds.y,
            unit: "px"
        };
        setCrop(b);
    }
    useEffect(() => {
        if (richMenuImage) {
            setCrop({ unit: "px" });
        }
    }, [richMenuImage]);
    function RichMenuImage() {
        if (loading) {
            return (<Skeleton variant="rect" width="100%" height={140} />);
        }
        if (400 <= httpStatus) {
            return (
                <Typography variant="caption" className={classes.item}>
                    {t("richmenu.messages.notDisplayImage")}
                </Typography>
            );
        }
        if (httpStatus <= 0 || !richMenuImage) {
            return (
                <Typography variant="caption" className={classes.item}>
                    no data
                </Typography>
            );
        }
        return (
            <ReactCrop
                className={classes.w100}
                src={richMenuImage}
                crop={crop}
                onChange={(c) => setCrop(c)}
            />
        )
    }
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} md={6} lg={4} className={classes.center}>
                <RichMenuImage />
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
                    {richmenu?.areas?.map((x, index) => {
                        return (
                            <FieldByActionType
                                richmenuId={richmenu.richMenuId}
                                index={index}
                                selectedIndex={selectedArea}
                                onSelectedChange={onSelectedChange}
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