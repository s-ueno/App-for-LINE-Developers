import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next";
import { area, richMenuObject } from "../../../models/richMenuObject";
import { IChannel } from "../../../store/Account/model";
export function useFieldByActionType(channel: IChannel, richmenu: richMenuObject) {
    const { t } = useTranslation();
    const addAreaAction = () => {
        const newArea: area = {
            identity: uuidv4(),
            bounds: { x: 0, y: 0, width: 0, height: 0, serverScale: false },
            action: { type: "message", label: "", text: "" }
        };
        richmenu.areas = [...richmenu.areas, newArea];
        return richmenu.areas.length - 1;
    };
    const deleteAreaAction = (index: number) => {
        richmenu.areas = richmenu.areas.filter((x, i) => i !== index);
        return richmenu.areas.length - 1;
    }
    return { addAreaAction, deleteAreaAction };
}




