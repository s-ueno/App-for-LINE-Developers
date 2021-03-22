import { Criteria } from "./Criteria";


export class OperatorCriteria extends Criteria {
    constructor(protected Operator: string, protected Args: Criteria[]) {
        super();
    }
    ;

    BuildStatement(): string {
        if (this.Args === null || this.Args === undefined || this.Args.length === 0) {
            return null;
        }

        if (this.Args.length === 1) {
            return this.Args[0].BuildStatement();
        }

        let arr = new Array<string>();
        this.Args.forEach(x => {
            const statement = x.BuildStatement();
            if (statement) {
                arr.push(`(${statement})`);
            }
        });
        return arr.join(` ${this.Operator} `);
    }


}