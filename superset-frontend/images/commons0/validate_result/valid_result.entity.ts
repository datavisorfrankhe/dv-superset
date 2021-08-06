export const MAX_INVALIDATE_RATE = 0.2;
export class ValidateResult {
    id: number;
    entityId: number; //can be replayid or dataasetId
    fieldId: number;
    fieldName: string;
    totalCount: number;
    emptyCount: number;
    invalidCount: number;
    validCount: number;

    exampleInvalidFields: string[];
    exampleInvalidFieldsOverLimit: boolean;
    ExampleInvalidFieldsSize: number;

    constructor(data) {
        this.entityId = data.id || 0;
        this.fieldId = data.fieldId || 0;
        this.fieldName = data.fieldName || '';
        this.totalCount = data.totalCount || 0;
        this.emptyCount = data.emptyCount || 0;
        this.invalidCount = data.invalidCount || 0;
        this.validCount = data.validCount || 0;

        this.exampleInvalidFields = data.exampleInvalidFields || [];
        this.exampleInvalidFieldsOverLimit = 'exampleInvalidFieldsOverLimit' in data ? data.exampleInvalidFieldsOverLimit : false ;
        this.ExampleInvalidFieldsSize = data.ExampleInvalidFieldsSize || 0;
    }

    getPercentageString(num: number) {
        let result: any = num * 100;
        result = result.toFixed(2);
        result = result.replace(new RegExp('.00$'),'') + '%';
        return result
    }
    get perCentage() {
        return {
            totalCount: this.getPercentageString(this.totalCount / this.totalCount),
            emptyCount: this.getPercentageString(this.emptyCount / this.totalCount),
            invalidCount: this.getPercentageString(this.invalidCount / this.totalCount),
            validCount: this.getPercentageString(this.validCount / this.totalCount)
        };
    }
    get hasError() {
        return this.invalidCount / this.totalCount >= MAX_INVALIDATE_RATE;
    }
}
export class ValidateResults {
    validateResults: ValidateResult[];
    constructor(list) {
        this.validateResults = [];
        let index = 0;
        list.forEach(item => {
            // if (item.invalidCount > 0 || item.emptyCount > 0 || item.validCount < item.totalCount) {
                const r = new ValidateResult(item) ;
                r.id = index++;
                this.validateResults.push(r);
            // }
        });
    }
    get totalAlertEvents() {
        let total = 0;
        this.validateResults.forEach(res => {
            total += res.invalidCount;
        });
        return total;
    }
    get totalAnalyzedEvents() {
        let max = 0;
        this.validateResults.forEach(res => {
            if (res.totalCount > max) {
                max = res.totalCount;
            }
        });
        return max;
    }
}
