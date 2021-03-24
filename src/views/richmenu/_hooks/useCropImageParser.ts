import { useCallback, useRef, useState } from "react";
import { area, bounds, richMenuObject } from "../../../models/richMenuObject";


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

    const newArea = (richmenu: richMenuObject, crop: any, index: number) => {
        const convertCrop = converBack(crop);

        const oldArea = richmenu.areas[index];
        const newArea = {
            ...oldArea,
            bounds: {
                x: convertCrop.x,
                y: convertCrop.y,
                width: convertCrop.width,
                height: convertCrop.height
            }
        };
        const areas = [...richmenu.areas, newArea];
        return { ...richmenu, areas: areas };
    }
    return { crop, setCrop, onImageLoad, convert, newArea };
}