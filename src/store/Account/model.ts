export interface IAccount {
    accounts: {
        id: string;
        displayName: string;
        pictureUrl: string;
    }[];
}


export const initialAccount: IAccount = {
    accounts: []
}
