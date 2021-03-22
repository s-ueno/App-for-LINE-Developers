import { ITheme, initialTheme } from "./model";
import { IActionBase } from "../IActionBase";
import { UPDATE_THEME } from "./action";

export function themeReducer(state: ITheme = initialTheme, action: IActionBase): ITheme {

    switch (action.type) {
        case UPDATE_THEME:
            return { ...state, mode: state.mode === "light" ? "dark" : "light" };
        default:
            return state;
    }
}

