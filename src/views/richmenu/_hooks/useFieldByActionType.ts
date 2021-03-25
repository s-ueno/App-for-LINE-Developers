import { useTranslation } from "react-i18next";
import { useValidatedState } from "../../../hooks/useValidatedState";
import { actionType, richMenuObject } from "../../../models/richMenuObject";

type _validator = {
    validator?: () => boolean;
}
export function useFieldByActionType(richmenu: richMenuObject) {
    const { t } = useTranslation();
    const required = (newValue: string, setValue: (newValue) => void) => {
        if (!newValue?.trim()) {
            return t("richmenu.validate.required");
        }
        return setValue(newValue);
    }
    const name = useValidatedState(x => required(x, y => richmenu.name = y), richmenu.name);
    const chatBarText = useValidatedState(x => required(x, y => richmenu.chatBarText = y), richmenu.chatBarText);
    const validator: _validator = {}
    return { name, chatBarText, validator };
}






