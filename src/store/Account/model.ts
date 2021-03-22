export interface IAccount {
    accounts: {
        token: string;
        id: string;
        displayName: string;
        pictureUrl: string;
    }[];
}


export const initialAccount: IAccount = {
    accounts: []
}
