import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Delay } from "../../../global";
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
    const [areas, setAreas] = useState(richmenu.areas ?? []);
    const arrayValidator = useValidatedStateArray(name, chatBarText);
    const addAreaActionAsync = async () => {
        const newArea: area = {
            bounds: { x: 0, y: 0, width: 0, height: 0 },
            action: { type: "message", label: "", text: "" }
        };
        const newAreas = [...areas, newArea];
        setAreas(newAreas);
        await Delay(10);
        return newAreas.length - 1;
    };
    const deleteAreaActionAsync = async (index: number) => {
        const newAreas = areas.filter((x, i) => i !== index);
        setAreas(newAreas);
        await Delay(10);
    }
    const validator: _validator = {}
    return { areas, addAreaActionAsync, deleteAreaActionAsync, name, chatBarText, validator, arrayValidator };
}




