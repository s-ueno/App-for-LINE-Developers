import { useCallback, useRef, useState } from "react";
import { area, bounds, richMenuObject } from "../../../models/richMenuObject";

export function useCropImageParser(unit: "px" | "%" = "px") {
    const imgRef = useRef<HTMLImageElement>();
    const [crop, setCrop] = useState({ unit: unit });
    const onImageLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    const convert = (richMenuObject: richMenuObject, bounds: bounds): any => {
        const image = imgRef.current;
        if (image && bounds) {
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;

            const newBounds: bounds = {
                x: Math.round(bounds.x / scaleX),
                y: Math.round(bounds.y / scaleY),
                width: Math.round(bounds.width / scaleX),
                height: Math.round(bounds.height / scaleY),
            };
            return newBounds;
        } else {
            return { unit: unit };
        }
    };

    const converBack = (crop: any): any => {
        const image = imgRef.current;
        if (image && crop) {
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;

            const newCrop = {
                x: Math.round(crop.x * scaleX),
                y: Math.round(crop.y * scaleY),
                width: Math.round(crop.width * scaleX),
                height: Math.round(crop.height * scaleY),
                unit: crop.unit
            }
            return newCrop;
        }
    };

    const postScale = (richmenu: richMenuObject) => {
        const image = imgRef.current;
        const size = richmenu.size;
        if (image) {
            const scaleX = size.width / image.naturalWidth;
            const scaleY = size.height / image.naturalHeight;
            return { scaleX, scaleY };
        }
        return { scaleX: 1, scaleY: 1 };
    }

    const newArea = (richmenu: richMenuObject, crop: any, index: number) => {

        const convertCrop = converBack(crop);
        const oldArea = richmenu.areas[index];
        const newArea = {
            ...oldArea,
            bounds: {
                x: convertCrop.x,
                y: convertCrop.y,
                width: convertCrop.width,
                height: convertCrop.height,
                serverScale: false
            }
        };
        richmenu.areas[index] = newArea;
        return richmenu;
    }

    const scrollToImage = () => {
        setTimeout(() => {
            if (imgRef.current) {
                imgRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
            }
        }, 300);
    };
    const clearCrop = () => {
        setCrop({ unit: unit });
    }
    return { crop, setCrop, onImageLoad, convert, newArea, scrollToImage, clearCrop, postScale };
}