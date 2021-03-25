import { richMenuObject } from "../../models/richMenuObject";

export interface IAccount {
    accounts: IAccountHeader[];
}
export interface IAccountHeader {
    token: string;
    id: string;
    displayName: string;
    pictureUrl: string;
}

export const initialAccount: IAccount = {
    accounts: []
}


export interface IChannel {
    token: string;
    defaultRichmenuId: string;
    richmenus: richMenuObject[];
}
export const initialChannel: IChannel = {
    token: "",
    defaultRichmenuId: "",
    richmenus: []
}
