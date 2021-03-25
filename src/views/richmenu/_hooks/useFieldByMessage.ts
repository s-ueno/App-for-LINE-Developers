import { useTranslation } from "react-i18next";
import { useValidatedState } from "../../../hooks/useValidatedState";
import { useValidatedStateArray } from "../../../hooks/useValidatedStateArray";
import { area, messageAction } from "../../../models/richMenuObject";


export function useFieldByMessage(
    action: messageAction,
    validate: { validator?: () => boolean }) {
    const { t } = useTranslation();
    const required = (newValue: string, setValue: (newValue) => void) => {
        if (!newValue?.trim()) {
            return t("richmenu.validate.required");
        }
        return setValue(newValue);
    }
    const label = useValidatedState(x => required(x, y => action.label = y), action.label);
    const text = useValidatedState(x => required(x, y => action.text = y), action.text);
    const arrayValidator = useValidatedStateArray(label, text);
    validate.validator = () => {
        return !arrayValidator.validate().hasError;
    }
    return { label, text };
}



