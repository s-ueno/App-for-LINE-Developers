import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
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
    const dispatch = useDispatch();
    const required = (newValue: string, setValue: (newValue) => void) => {
        if (!newValue?.trim()) {
            return t("richmenu.validate.required");
        }
        return setValue(newValue);
    }
    const updateArea = (areas: area[]) => {
        const newRichmenu = { ...richmenu, areas: areas };
        const newChannel = { ...channel, richmenu: newRichmenu };
        dispatch(UpdateChannel(newChannel));
    };
    const name = useValidatedState(x => required(x, y => richmenu.name = y), richmenu.name);
    const chatBarText = useValidatedState(x => required(x, y => richmenu.chatBarText = y), richmenu.chatBarText);
    const areas = useValidatedState(updateArea, richmenu.areas);
    const arrayValidator = useValidatedStateArray(name, chatBarText, areas);
    const addAreaAction = () => {
        const newArea: area = {
            bounds: { x: 0, y: 0, width: 0, height: 0 },
            action: { type: "message", label: "", text: "" }
        };
        areas.onChange([...areas.state ?? [], newArea]);
    };
    const deleteAreaAction = (index: number) => {
        const newChannel = {
            ...channel,
            richmenu: {
                ...richmenu,
                areas: richmenu.areas.filter((x, i) => i !== index)
            }
        };
        areas.onChange(areas.state?.filter((x, i) => i !== index));
    }
    const validator: _validator = {}
    return { areas, addAreaAction, deleteAreaAction, name, chatBarText, validator, arrayValidator };
}




