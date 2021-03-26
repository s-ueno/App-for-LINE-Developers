import { useTranslation } from "react-i18next";
import { useValidatedState } from "../../../hooks/useValidatedState";
import { useValidatedStateArray } from "../../../hooks/useValidatedStateArray";
import { area, uriAction } from "../../../models/richMenuObject";


export function useFieldByUri(
    action: uriAction,
    validate: { validator?: () => boolean }) {
    const { t } = useTranslation();
    const required = (newValue: string) => {
        if (!newValue?.trim()) {
            return t("richmenu.validate.required");
        }
        return null;
    }
    const label = useValidatedState(required, action.label);
    const uri = useValidatedState(required, action.uri);
    const arrayValidator = useValidatedStateArray(label, uri);
    validate.validator = () => {
        return !arrayValidator.validate().hasError;
    };
    return { label, uri };
}



