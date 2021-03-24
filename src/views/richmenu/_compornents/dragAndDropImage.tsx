import React from "react";
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import clsx from "clsx";
import {
    Grid,
    makeStyles,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(1)
    },
    w100: {
        width: "100%"
    }
}));
type Props = {
    setImage: (src: string) => void;
}
const DragAndDropImage: React.FCX<Props> = (props) => {
    const { className, setImage, ...rest } = props;
    const { t } = useTranslation();
    const classes = useStyle();
    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: (files) => {
            if (files?.length === 0) return;
            const file = files[0];
            const url = URL.createObjectURL(file);
            setImage(url);
        }
    });
    return (<>
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>{t("richmenu.messages.dragAndDrop")}</p>
        </div>
    </>);
}
export default DragAndDropImage;