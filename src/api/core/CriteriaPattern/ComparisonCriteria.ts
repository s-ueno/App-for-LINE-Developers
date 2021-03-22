import { Criteria } from "./Criteria";
import azure = require('azure-storage');

export class ComparisonCriteria extends Criteria {
    constructor(
        protected name: string,
        protected value: any,
        protected queryComparisons: string) {

        super();
    }

    BuildStatement(): string {
        const filter = this.Filter(this.value);
        return filter(
            this.name,
            this.queryComparisons,
            String(this.value));
    }
}