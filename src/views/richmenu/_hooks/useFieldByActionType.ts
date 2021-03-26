import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next";
import { useValidatedState } from "../../../hooks/useValidatedState";
import { useValidatedStateArray } from "../../../hooks/useValidatedStateArray";
import { actionType, area, richMenuObject } from "../../../models/richMenuObject";
import { UpdateChannel } from "../../../store/Account/action";
import { IChannel } from "../../../store/Account/model";

type _validator = {
    validator?: () => boolean;
}
export function useFieldByActionType(channel: IChannel, richmenu: richMenuObject) {
    const { t } = useTranslation();
    const requiredName = (newValue: string) => {
        richmenu.name = newValue;

        console.log(`★${richmenu.name}`);
        console.log(`★★${newValue}`);
        console.log(`★★★${newValue?.trim()}`);
        if (!newValue?.trim()) {
            return t("richmenu.validate.required");
        }
        return "";
    }
    const requiredChatBarText = (newValue: string) => {
        richmenu.chatBarText = newValue;
        if (!newValue?.trim()) {
            return t("richmenu.validate.required");
        }
        return "";
    }

    const name = useValidatedState(requiredName, richmenu.name);
    const chatBarText = useValidatedState(requiredChatBarText, richmenu.chatBarText);
    const arrayValidator = useValidatedStateArray(name, chatBarText);
    const addAreaAction = () => {
        const newArea: area = {
            identity: uuidv4(),
            bounds: { x: 0, y: 0, width: 0, height: 0 },
            action: { type: "message", label: "", text: "" }
        };
        richmenu.areas = [...richmenu.areas, newArea];
        return richmenu.areas.length - 1;
    };
    const deleteAreaAction = (index: number) => {
        const remove = richmenu.areas[index];
        richmenu.areas = richmenu.areas.filter(x => x.identity !== remove.identity);
        return richmenu.areas.length - 1;
    }
    const validator: _validator = {}
    return { addAreaAction, deleteAreaAction, name, chatBarText, validator, arrayValidator };
}




