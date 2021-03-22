import { ITableEntity } from "./ITableEntity";

export type ITableAggregator = {
    GetChildAsync<T extends ITableEntity>(): Promise<T>;
    GetChildrenAsync<T extends ITableEntity>(): Promise<T[]>;
}
