import { Criteria } from "./Criteria";
import azure = require('azure-storage');
import { IdCriteria } from "./IdCriteria";
import { OperatorCriteria } from "./OperatorCriteria";

export class InCriteria extends Criteria {
    constructor(protected name: string, ...values: any[]) {
        super();
        this.Values = values;
    }

    protected Values: any[];

    BuildStatement(): string {
        let arr: Criteria[] = [];
        this.Values.forEach(x => {
            arr.push(new IdCriteria(this.name, x));
        });

        const c = new OperatorCriteria(azure.TableUtilities.TableOperators.OR, arr);
        return c.BuildStatement();
    }
}