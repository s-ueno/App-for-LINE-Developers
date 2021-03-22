import { IActionBase } from "../IActionBase";
export const UPDATE_THEME = "UPDATE_THEME";
/** テーマをダークとライトで切り替えます */
export function ToggleTheme(): IToggleTheme {
    return { type: UPDATE_THEME };
}
interface IToggleTheme extends IActionBase { };


