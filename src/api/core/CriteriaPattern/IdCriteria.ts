import { Criteria } from "./Criteria";
import azure = require('azure-storage');

export class IdCriteria extends Criteria {
    constructor(protected name: string, protected value: any) {
        super();
    }
    BuildStatement(): string {
        const filter = this.Filter(this.value);
        return filter(this.name, azure.TableUtilities.QueryComparisons.EQUAL, this.value);
    }
}