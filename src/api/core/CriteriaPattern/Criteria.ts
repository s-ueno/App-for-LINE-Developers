import azure = require('azure-storage');

export abstract class Criteria {
    abstract BuildStatement(): string;
    public And(c: Criteria): Criteria { return; }
    public Or(c: Criteria): Criteria { return; }
    public Not(): Criteria { return; }

    protected Filter(value: any): (name: string, operation: string, value: any) => string {
        if (typeof value === "number") {
            return azure.TableQuery.int32Filter;
        }
        if (typeof value === "bigint") {
            return azure.TableQuery.int64Filter;
        }
        if (typeof value === "boolean") {
            return azure.TableQuery.booleanFilter;
        }
        if (value instanceof Date) {
            return azure.TableQuery.dateFilter;
        }
        return azure.TableQuery.stringFilter;
    }
}
