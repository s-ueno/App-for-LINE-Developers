export interface IAccount {
    accounts: IAccountHeader[];
}
export interface IAccountHeader{
    token: string;
    id: string;
    displayName: string;
    pictureUrl: string;
}

export const initialAccount: IAccount = {
    accounts: []
}
