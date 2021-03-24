import { IOverlay } from "./Overlay/model";
import { ITheme } from "./Theme/model";
import { IDrawer } from "./SideDrawer/model";
import { ITitle } from "./Layout/model";
import { IAccount, IChannel } from "./Account/model";

export interface IActionBase {
    type: string;
    [prop: string]: any;
}


// サイト全体を通して、状態管理するための宣言
export interface IRootState {
    router: any,
    customTheme: ITheme,
    overlay: IOverlay,
    drawer: IDrawer,
    title: ITitle,
    account: IAccount,
    channel: IChannel
}
