export type ThemeMode = "dark" | "light";
export interface ITheme {
    mode: ThemeMode;
}
export const initialTheme: ITheme = {
    mode: "light",
};
