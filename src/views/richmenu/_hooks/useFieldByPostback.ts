import { useTranslation } from "react-i18next";
import { useValidatedState } from "../../../hooks/useValidatedState";
import { useValidatedStateArray } from "../../../hooks/useValidatedStateArray";
import { area, postbackAction } from "../../../models/richMenuObject";


export function useFieldByPostback(
    action: postbackAction,
    validate: { validator?: () => boolean }) {
    const { t } = useTranslation();
    const required = (newValue: string, setValue: (newValue) => void) => {
        setValue(newValue);
        if (!newValue?.trim()) {
            return t("richmenu.validate.required");
        }
        return null;
    }
    const data = useValidatedState(x => required(x, y => action.data = y), action.data);
    const label = useValidatedState(x => required(x, y => action.label = y), action.label);
    const displayText = useValidatedState(x => {
        action.displayText = x;
        return null;
    }, action.displayText);

    const arrayValidate = useValidatedStateArray(data, label, displayText);
    validate.validator = () => {
        return !arrayValidate.validate().hasError;
    }
    return { data, label, displayText };
}



