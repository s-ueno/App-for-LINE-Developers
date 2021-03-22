import azure = require('azure-storage');
import { BetweenCriteria } from './CriteriaPattern/BetweenCriteria';
import { ComparisonCriteria } from './CriteriaPattern/ComparisonCriteria';
import { Criteria } from './CriteriaPattern/Criteria';
import { IdCriteria } from './CriteriaPattern/IdCriteria';
import { NotCriteria } from './CriteriaPattern/NotCriteria';
import { NameOf } from './ExpressionUtil';

export interface IQuery {
    Top: number;
    SplitCount?: number;

    Filter: Criteria;
    BuildQuery(): azure.TableQuery;
}

export class Query<T> implements IQuery {
    BuildQuery(): azure.TableQuery {
        let query = new azure.TableQuery();

        if (this.Top) {
            query = query.top(this.Top);
        }
        if (this.Filter) {
            query = query.where(this.Filter.BuildStatement());
        }
        return query;
    }

    SplitCount?: number;
    Filter: Criteria;
    Top: number;

    public Eq<P>(property: (caller: T) => P, value: P): Criteria {
        const name = NameOf<T>(property);
        return new IdCriteria(name, value);
    }
    public NotEq<P>(property: (caller: T) => P, value: P): Criteria {
        return new NotCriteria(this.Eq(property, value));
    }
    public Between<P>(property: (caller: T) => P, start: P, end: P): Criteria {
        const name = NameOf<T>(property);
        return new BetweenCriteria(name, start, end);
    }
    public GreaterThan<P>(property: (caller: T) => P, value: P): Criteria {
        const name = NameOf<T>(property);
        return new ComparisonCriteria(
            name, value,
            azure.TableUtilities.QueryComparisons.GREATER_THAN);
    }
    public GreaterThanEq<P>(property: (caller: T) => P, value: P): Criteria {
        const name = NameOf<T>(property);
        return new ComparisonCriteria(
            name, value,
            azure.TableUtilities.QueryComparisons.GREATER_THAN_OR_EQUAL);
    }
    public LessThanEq<P>(property: (caller: T) => P, value: P): Criteria {
        const name = NameOf<T>(property);
        return new ComparisonCriteria(
            name, value,
            azure.TableUtilities.QueryComparisons.LESS_THAN);
    }
    public LessThan<P>(property: (caller: T) => P, value: P): Criteria {
        const name = NameOf<T>(property);
        return new ComparisonCriteria(
            name, value,
            azure.TableUtilities.QueryComparisons.LESS_THAN_OR_EQUAL);
    }
}