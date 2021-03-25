import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import ReactCrop from "react-image-crop";
import { v4 as uuidv4 } from 'uuid';
import clsx from "clsx";
import {
    Button,
    Grid,
    makeStyles,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import { bounds, richMenuObject, uriAction } from "../../../models/richMenuObject";
import { useRichmenuImageAsync } from "../_hooks/useRichmenuImage";
import FieldByActionType from "./fieldByActionType";
import { Skeleton } from "@material-ui/lab";
import { useCropImageParser } from "../_hooks/useCropImageParser";
import DragAndDropImage from "./dragAndDropImage";
import { IAccountHeader } from "../../../store/Account/model";

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
    },
    displayNone: {
        display: "none"
    },
    button: {
        padding: "10px",
        "& > button": {
            width: "100%"
        }
    }
}));
type Props = {
    account: IAccountHeader;
    richmenu: richMenuObject;
    setRichmenuObject: (richmenu: richMenuObject) => void;
}
const RichmenuCard: React.FCX<Props> = (props) => {
    const { className, account, richmenu, setRichmenuObject, ...rest } = props;
    const classes = useStyle();
    const [selectedArea, setSelectedArea] = useState<number | null>(null);
    const [richMenuImage, setRichMenuImage, loading, httpStatus]
        = useRichmenuImageAsync(account, richmenu.richMenuId);
    const { t } = useTranslation();
    const uuid = uuidv4();

    const {
        crop, setCrop, onImageLoad, convert, newArea, scrollToImage
    } = useCropImageParser();

    function onSelectedChange(bounds: bounds, index: number | null) {
        setSelectedArea(index);
        setCrop(convert(bounds));
    }
    function onCompleteCrop(crop: any) {
        if (selectedArea != null) {
            const newRichmenu = newArea(richmenu, crop, selectedArea);
            setRichmenuObject(newRichmenu);
        }
    }
    function onDragAndDropImage(src: string) {
        setRichMenuImage(src);
        scrollToImage();
    }
    function onSelectFile(files: FileList | null) {
        if (!files || files.length === 0) return;
        const file = files[0];
        const url = URL.createObjectURL(file);
        setRichMenuImage(url);
        scrollToImage();
    }
    const MemoizedRichMenuImage = useMemo(() => {
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
        if (!richMenuImage) {
            return (<DragAndDropImage
                setImage={src => onDragAndDropImage(src)}
            />);
        }
        return (
            <Grid container className={classes.w100}>
                <Grid item xs={4} className={classes.button}>
                    <Button variant="outlined">
                        {t("richmenu.button.update")}
                    </Button>
                </Grid>
                <Grid item xs={4} className={classes.button}>
                    <Button variant="outlined">
                        {t("richmenu.button.delete")}
                    </Button>
                </Grid>
                <Grid item xs={4} className={classes.button}>
                    <Button variant="outlined">
                        {t("richmenu.button.setDefaultMenu")}
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <ReactCrop
                        className={classes.w100}
                        src={richMenuImage}
                        onImageLoaded={onImageLoad}
                        crop={crop}
                        onChange={x => setCrop(x)}
                        onComplete={x => onCompleteCrop(x)}
                    />
                </Grid>
                <Grid item xs={4} className={classes.button}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id={`button-file-${uuid}`}
                        type="file"
                        onChange={e => onSelectFile(e.target.files)}
                    />
                    <label htmlFor={`button-file-${uuid}`}>
                        <Button variant="outlined" component="span">
                            {t("richmenu.button.selectImage")}
                        </Button>
                    </label>
                </Grid>
                <Grid item xs={4} className={classes.button}>
                    <Button variant="outlined">
                        {t("richmenu.button.deleteAction")}
                    </Button>
                </Grid>
                <Grid item xs={4} className={classes.button}>
                    <Button variant="outlined">
                        {t("richmenu.button.addAction")}
                    </Button>
                </Grid>
            </Grid>)
    }, [loading, httpStatus, richMenuImage, crop]);

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} md={6} lg={4} className={classes.center}>
                <Grid container className={classes.w100}>

                    <Grid item xs={12}>
                        {MemoizedRichMenuImage}
                    </Grid>
                </Grid>
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
                                area={x}
                            />
                        );
                    })}
                </Grid>
            </Grid>
        </Grid>);
}
export default RichmenuCard;