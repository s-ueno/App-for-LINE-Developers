import { useCallback, useRef, useState } from "react";
import { bounds } from "../../../models/richMenuObject";


export function useCropImageParser(unit: "px" | "%" = "px") {
    const imgRef = useRef<HTMLImageElement>();
    const [crop, setCrop] = useState({ unit: unit });
    const onImageLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    const convert = (bounds: bounds): any => {
        const image = imgRef.current;
        if (image && bounds) {
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;

            const newBounds: bounds = {
                x: bounds.x / scaleX,
                y: bounds.y / scaleY,
                width: bounds.width / scaleX,
                height: bounds.height / scaleY
            }
            return newBounds;
        }
    };
    const converBack = (crop: any): any => {
        const image = imgRef.current;
        if (image && crop) {
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;

            const newCrop = {
                x: crop.x * scaleX,
                y: crop.y * scaleY,
                width: crop.width * scaleX,
                height: crop.height * scaleY,
                unit: crop.unit
            }
            return newCrop;
        }
    };

    return { crop, setCrop, onImageLoad, convert, converBack };
}