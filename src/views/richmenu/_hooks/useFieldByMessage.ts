import { useTranslation } from "react-i18next";
import { useValidatedState } from "../../../hooks/useValidatedState";
import { useValidatedStateArray } from "../../../hooks/useValidatedStateArray";
import { area, messageAction } from "../../../models/richMenuObject";


export function useFieldByMessage(
    action: messageAction,
    validate: { validator?: () => boolean }) {
    const { t } = useTranslation();
    const required = (newValue: string) => {
        if (!newValue?.trim()) {
            return t("richmenu.validate.required");
        }
        return null;
    }
    const label = useValidatedState(required, action.label);
    const text = useValidatedState(required, action.text);
    const arrayValidator = useValidatedStateArray(label, text);
    validate.validator = () => {
        return !arrayValidator.validate().hasError;
    }
    return { label, text };
}



