import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import Resizer from 'react-image-file-resizer';
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
import { IAccountHeader, IChannel } from "../../../store/Account/model";
import { useSendRichmenu } from "../_hooks/useSendRichmenu";
import BeenhereIcon from '@material-ui/icons/Beenhere';
import { useFieldByActionType } from "../_hooks/useFieldByActionType";
import { useDeleteRichmenu } from "../_hooks/useDeleteRichmenu";
import { useSetDefaultRichmenu } from "../_hooks/useSetDefaultRichmenu";
import StarIcon from '@material-ui/icons/Star';
import ResizeDialog from "./resizeDialog";
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
    }
}));
type Props = {
    account: IAccountHeader;
    channel: IChannel;
    richmenu: richMenuObject;
    setRichmenuObject: (richmenu: richMenuObject) => void;
}
const RichmenuCard: React.FCX<Props> = (props) => {
    const { className, account, channel, richmenu, setRichmenuObject, ...rest } = props;
    const classes = useStyle();
    const [selectedArea, setSelectedArea] = useState<number | null>(null);
    const [value, setValue] = useState(richmenu);
    const [richMenuImage, setRichMenuImage, loading, httpStatus]
        = useRichmenuImageAsync(account, richmenu.richMenuId);
    const updateRichmenuAsync = useSendRichmenu();
    const { addAreaAction, deleteAreaAction } = useFieldByActionType(channel, richmenu);
    const { t } = useTranslation();
    const uuid = uuidv4();
    const {
        crop, setCrop, onImageLoad, newArea, scrollToImage, convert, clearCrop
    } = useCropImageParser();
    const deleteRichmenu = useDeleteRichmenu();
    const setDefaultRichmenuAsync = useSetDefaultRichmenu();

    const [open, setOpen] = useState(false);

    function onChange(newValue: string, name: "name" | "chatBarText") {
        setValue({ ...value, [name]: newValue });
        richmenu[name] = newValue;
    }

    function onSelectedChange(index: number | null) {
        setSelectedArea(index);
        if (index !== null) {
            setCrop(convert(richmenu.areas[index].bounds));
        }
    }
    function onCompleteCrop(crop: any) {
        if (selectedArea != null) {
            newArea(richmenu, crop, selectedArea);
        }
    }
    function onDragAndDropImage(src: string) {
        setRichMenuImage(src);
        scrollToImage();
    }
    async function onSelectFile(files: FileList | null) {
        if (!files || files.length === 0) return;
        const file = files[0];

        const url = URL.createObjectURL(file);
        setRichMenuImage(url);
        scrollToImage();
    }
    async function onUpdateAsync(e) {
        if (!e) return;
        richmenu.size = { width: 2500, height: e };
        await updateRichmenuAsync(channel, richmenu, richMenuImage as string);
    }
    function update() {
        setOpen(true);
    }
    function DefaultMark() {
        if (channel.defaultRichmenuId !== richmenu.richMenuId) {
            return (<></>);
        }
        return (
            <Typography variant="caption" className={classes.item}>
                <StarIcon />
                {t("richmenu.messages.defaulMenu")}
            </Typography>
        );
    }
    function onDeleteAreaAction() {
        if (selectedArea !== null) {
            const newIndex = deleteAreaAction(selectedArea);
            if (0 <= newIndex) {
                setSelectedArea(newIndex);
            } else {
                setSelectedArea(null);
            }
        }
        clearCrop();
    }
    function onAddAreaAction() {
        const index = addAreaAction();
        setSelectedArea(index);
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
                <Grid item xs={2} className={classes.button}>
                    <DefaultMark />
                </Grid>
                <Grid item xs={3} className={classes.button}>
                    <Button variant="outlined" className={classes.w100}
                        onClick={() => update()}>
                        {t("richmenu.button.update")}
                    </Button>
                </Grid>
                <Grid item xs={3} className={classes.button}>
                    <Button variant="outlined" className={classes.w100}
                        onClick={async () => await deleteRichmenu(channel, richmenu)}>
                        {t("richmenu.button.delete")}
                    </Button>
                </Grid>
                <Grid item xs={4} className={classes.button}>
                    <Button variant="outlined" className={classes.w100}
                        onClick={async () => await setDefaultRichmenuAsync(channel, richmenu)}>
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
                        onChange={async (e) => await onSelectFile(e.target.files)}
                    />
                    <label htmlFor={`button-file-${uuid}`} className={classes.w100}>
                        <Button variant="outlined" component="span" className={classes.w100}>
                            {t("richmenu.button.selectImage")}
                        </Button>
                    </label>
                </Grid>
                <Grid item xs={4} className={classes.button}>
                    <Button variant="outlined" className={classes.w100}
                        onClick={() => onDeleteAreaAction()}
                    >
                        {t("richmenu.button.deleteAction")}
                    </Button>
                </Grid>
                <Grid item xs={4} className={classes.button}>
                    <Button variant="outlined" className={classes.w100}
                        onClick={() => onAddAreaAction()}
                    >
                        {t("richmenu.button.addAction")}
                    </Button>
                </Grid>
            </Grid>)
    }, [loading, richMenuImage, crop, channel.defaultRichmenuId]);

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
                            value={value.name}
                            error={!value.name?.trim()}
                            helperText={!value.name?.trim() && t("richmenu.validate.required")}
                            onChange={e => onChange(e.target.value, "name")}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} className={classes.item}>
                        <TextField className={classes.w100}
                            label="chatBarText"
                            value={value.chatBarText}
                            error={!value.chatBarText?.trim()}
                            helperText={!value.chatBarText?.trim() && t("richmenu.validate.required")}
                            onChange={e => onChange(e.target.value, "chatBarText")} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={5} className={classes.item}>
                        <TextField className={classes.w100}
                            label="richMenuId"
                            disabled
                            value={richmenu.richMenuId}
                        />
                    </Grid>
                    {richmenu.areas?.map((x, index) => {
                        return (
                            <FieldByActionType
                                richmenu={richmenu}
                                index={index}
                                selectedIndex={selectedArea}
                                onSelectedChange={onSelectedChange}
                                area={x}
                            />
                        );
                    })}
                </Grid>
            </Grid>
            <ResizeDialog
                open={open}
                setResult={async (x) => await onUpdateAsync(x)}
            />
        </Grid>);
}
export default RichmenuCard;