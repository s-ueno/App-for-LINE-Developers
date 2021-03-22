import { ITableEntity } from "./ITableEntity";
import azure = require('azure-storage');
import { ITableName } from "./ITableName";
import { id } from "date-fns/locale";
import { IQuery, Query } from "./Query";
import { IdCriteria } from "./CriteriaPattern/IdCriteria";
import { Criteria } from "./CriteriaPattern/Criteria";
import "./CriteriaPattern/CriteriaExtensions";

export class EntityService<T>  {
    constructor(
        protected ctor: { new(): T; },
        public ConnectionString?: string
    ) {
        if (!ConnectionString) {
            ConnectionString = process.env["SIS.AzureWebJobsStorage"];　//接続先
        }
        this.TableService = azure.createTableService(ConnectionString);
    }

    public static async CreateAsync<T>(ctor: { new(): T; }, connectionString?: string) {
        const svc = new EntityService<T>(ctor, connectionString);
        await svc.InitializeAsync();
        return svc;
    }

    public TableService: azure.TableService;
    public TableName: string;
    public RequestOptions: azure.common.RequestOptions;

    instanceOfITableName(object: any): object is ITableName {
        const o = object as ITableName;
        return o !== null && o !== undefined && o.GenerateTableNameAsync !== undefined;
    }
    public async InitializeAsync() {
        const o = new this.ctor();

        if (this.instanceOfITableName(o)) {
            this.TableName = await o.GenerateTableNameAsync();
        } else {
            this.TableName = o.toString();
        }

        await this.CreateTableIfNotExistsAsync();

    }

    ParseOption(option: azure.common.RequestOptions): azure.common.RequestOptions {
        if (!option) {
            option = {
                timeoutIntervalInMs: 30 * 1000,
                clientRequestTimeoutInMs: 30 * 1000,
            };
        } else {
            if (!option.timeoutIntervalInMs) {
                option.timeoutIntervalInMs = 30 * 1000;
            }
            if (!option.clientRequestTimeoutInMs) {
                option.clientRequestTimeoutInMs = 30 * 1000;
            }
        }
        return option;
    }

    public CreateTableIfNotExistsAsync(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.TableService.createTableIfNotExists(this.TableName, this.ParseOption(this.RequestOptions), function (error, result, response) {
                if (!error) {
                    resolve(true);
                } else {
                    reject(error);
                }
            })
        });
    }

    public Upsert(entity: T, option?: azure.common.RequestOptions): Promise<T> {
        const newOption = this.ParseOption(option === null ? this.RequestOptions : option);
        return new Promise((resolve, reject) => {
            this.TableService.insertOrMergeEntity<T>(this.TableName, entity, newOption, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(entity);
                }
            });
        });
    }

    public AllAsync(ignoreRelation: boolean = true, option?: azure.common.RequestOptions): Promise<T[]> {
        if (ignoreRelation) {
            return this.ExecuteQuery(null, option);
        }

        throw new Error("not implemented");
    }
    public FindByQueryAsync(query: IQuery, option?: azure.common.RequestOptions): Promise<T[]> {
        return this.ExecuteQuery(query, option);
    }
    public async FindByIdAsync(partitionKey: string, rowKey: string, option?: azure.common.RequestOptions): Promise<T> {
        let query = new Query<T>();
        query.Filter =
            new IdCriteria("PartitionKey", partitionKey).And(
                new IdCriteria("RowKey", rowKey));
        let rows = await this.ExecuteQuery(query, option);
        if (rows === null || rows === undefined || rows.length === 0) return null;
        return rows[0];
    }
    protected async ExecuteQuery(query: IQuery, option?: azure.common.RequestOptions): Promise<T[]> {
        let tableQuery: azure.TableQuery;
        if (query) {
            tableQuery = query.BuildQuery();
        }

        const newOption = this.ParseOption(option === null ? this.RequestOptions : option);
        let arr = new Array<T>();
        let token: azure.services.table.TableService.TableContinuationToken = null;
        while (true) {
            let pms = new Promise<azure.services.table.TableService.QueryEntitiesResult<T>>((resolve, reject) => {
                this.TableService.queryEntities<T>(this.TableName, tableQuery, token, newOption, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
            const result = await pms;
            if (result.entries) {
                arr.push(...result.entries);
            }
            token = result.continuationToken;
            if (!token) {
                break;
            }
        }
        arr.forEach(value => {
            for (const property in value) {
                if (property !== ".metadata" &&
                    property !== "__proto__") {
                    value[property] = value[property]["_"];
                }
            }
        });
        return arr;
    }

    // public Execute

}