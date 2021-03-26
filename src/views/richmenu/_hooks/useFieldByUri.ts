import { useTranslation } from "react-i18next";
import { useValidatedState } from "../../../hooks/useValidatedState";
import { useValidatedStateArray } from "../../../hooks/useValidatedStateArray";
import { area, uriAction } from "../../../models/richMenuObject";


export function useFieldByUri(
    action: uriAction,
    validate: { validator?: () => boolean }) {
    const { t } = useTranslation();
    const required = (newValue: string, setValue: (newValue) => void) => {
        setValue(newValue);
        if (!newValue?.trim()) {
            return t("richmenu.validate.required");
        }
        return null;
    }
    const label = useValidatedState(x => required(x, y => action.label = y), action.label);
    const uri = useValidatedState(x => required(x, y => action.uri = y), action.uri);
    const arrayValidator = useValidatedStateArray(label, uri);
    validate.validator = () => {
        return !arrayValidator.validate().hasError;
    };
    return { label, uri };
}



