import { ITitle } from "./model";
import { IActionBase } from "../IActionBase";

export const UPDATE_TITLE = "UPDATE_TITLE";
interface ITitleType extends ITitle, IActionBase { }
export function UpdateTitle(title?: string, icon?: JSX.Element): ITitleType {
    return {
        type: UPDATE_TITLE,
        title: title,
        icon: icon,
    };
}
