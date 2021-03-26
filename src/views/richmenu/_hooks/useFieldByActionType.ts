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
    const required = (newValue: string, setValue: (newValue) => void) => {
        if (!newValue?.trim()) {
            return t("richmenu.validate.required");
        }
        return setValue(newValue);
    }

    const name = useValidatedState(x => required(x, y => richmenu.name = y), richmenu.name);
    const chatBarText = useValidatedState(x => required(x, y => richmenu.chatBarText = y), richmenu.chatBarText);
    const [areas, setAreas] = useState(richmenu.areas?.map(x => {
        x.identity = uuidv4();
        return x;
    }) ?? []);
    const arrayValidator = useValidatedStateArray(name, chatBarText);
    const addAreaAction = () => {
        const newArea: area = {
            identity: uuidv4(),
            bounds: { x: 0, y: 0, width: 0, height: 0 },
            action: { type: "message", label: "", text: "" }
        };
        const newAreas = [...areas, newArea];
        setAreas(newAreas);
        return newAreas.length - 1;
    };
    const deleteAreaAction = (area: area) => {
        const newAreas = areas.filter(x => x.identity !== area.identity);
        setAreas(newAreas);
    }
    const validator: _validator = {}
    return { areas, addAreaAction, deleteAreaAction, name, chatBarText, validator, arrayValidator };
}




