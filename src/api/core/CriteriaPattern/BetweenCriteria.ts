import { Criteria } from "./Criteria";
import azure = require('azure-storage');

export class BetweenCriteria extends Criteria {
    constructor(protected name: string, protected start: any, protected end: any) {
        super();

    }
    BuildStatement(): string {
        const util = azure.TableUtilities;
        const filter = this.Filter(this.start);

        const startCriteria =
            filter(this.name,
                util.QueryComparisons.GREATER_THAN_OR_EQUAL,
                String(this.start));
        const endCriteria =
            filter(this.name,
                util.QueryComparisons.LESS_THAN_OR_EQUAL,
                String(this.end));
        return azure.TableQuery.combineFilters(startCriteria, util.TableOperators.AND, endCriteria);
    }
}