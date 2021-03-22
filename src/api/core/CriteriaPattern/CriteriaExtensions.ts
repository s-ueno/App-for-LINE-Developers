import azure = require('azure-storage');
import { OperatorCriteria } from "./OperatorCriteria";
// import { Criteria } from "./Criteria";
import { NotCriteria } from './NotCriteria';
import { Criteria } from './Criteria';

Object.defineProperty(Criteria.prototype, "And", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: function (this: Criteria, value: Criteria): Criteria {
        let me: Criteria = this;
        return new OperatorCriteria(
            azure.TableUtilities.TableOperators.AND, [me, value]);
    }
});
Object.defineProperty(Criteria.prototype, "Or", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: function (this: Criteria, value: Criteria): Criteria {
        let me: Criteria = this;
        return new OperatorCriteria(
            azure.TableUtilities.TableOperators.OR, [me, value]);
    }
});
Object.defineProperty(Criteria.prototype, "Not", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: function (this: Criteria): Criteria {
        let me: Criteria = this;
        return new NotCriteria(this);
    }
});