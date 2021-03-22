import { Criteria } from "./Criteria";
import azure = require('azure-storage');

export class NotCriteria extends Criteria {
    constructor(protected c: Criteria) {
        super();
    }
    BuildStatement(): string {
        return `${azure.TableUtilities.TableOperators.NOT} (${this.c.BuildStatement()})`;
    }
}