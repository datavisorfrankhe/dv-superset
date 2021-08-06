const numberLists: string[] = ['short', 'int', 'integer', 'long', 'float', 'double'];

const isTypeLower = function(actType: string, expType: string) {
    //must be type (string, number) first
    if (numberLists.includes(actType) && !numberLists.includes(expType)
        || !numberLists.includes(actType) && numberLists.includes(expType)
    ) { return false; }

    if (actType === 'int') { actType = 'integer'; }
    if (expType === 'int') { expType = 'integer'; }
    return numberLists.indexOf(actType) <= numberLists.indexOf(expType);
};

export const comareWithTypeOrder = function(actType: string, expType: string) {
    actType = actType.toLowerCase();
    expType = expType.toLowerCase();

    const actTypeStandard = _standardizeType(actType);
    const expTypeStandard = _standardizeType(expType);

    if (actTypeStandard === expTypeStandard) {
        if (actTypeStandard === 'number') {
            return isTypeLower(actType, expType);
        } else {
            return true;
        }
    } else {
        return false;
    }
};

const _standardizeType = function(type) {
    //here, let's first convert the list type
    //1. .+Set--> set
    //2. .+List --> list
    //3. .+Map --> Map

    if (type.match(/.?Set/i)) {
        return type.replace(/.+Set/i, 'Set').toLowerCase();
    } else if (type.match(/.?List/i)) {
        return type.replace(/.+List/i, 'List').toLowerCase();
    } else if (type.match(/.?Map/i)) {
        return type.replace(/.+Map/i, 'Map').replace(/\ /ig, '').toLowerCase();
    } else {
        if (numberLists.includes(type.toLowerCase())) {
            return 'number';
        } else if (type.toLowerCase() === 'boolean') {
            return 'boolean';
        } else if (type.toLowerCase().includes('datasource')) {
            return 'datasource';
        } else if (type.toLowerCase().includes('datafield')) {
            return 'datafield';
        } else {
            return 'string';
        }
    }
};
//to make sure fromType can be cast to toType
const _typeConvertable = function(fromType: string, toType: string) {
    const standarizedFromType = _standardizeType(fromType);
    const standarizedToType = _standardizeType(toType);
    const listTypes = ['set', 'list', 'map'];

    const bFromTypeList = listTypes.includes(standarizedFromType);
    const bToTypeList = listTypes.includes(standarizedToType);
    let bConvertable = false;
    if (bFromTypeList && bToTypeList) {
        if (standarizedFromType === 'map' && standarizedToType === 'map'
            ||
            ['set', 'list'].includes(standarizedFromType) && ['set', 'list'].includes(standarizedToType)
        ) {
            bConvertable = true;
        }
    } else if (!bFromTypeList && !bToTypeList) {
        if (['datasource', 'datafield'].includes(standarizedFromType) && ['datasource', 'datafield'].includes(standarizedToType) && standarizedFromType === standarizedToType) {
            bConvertable = true;
        } else if (!['datasource', 'datafield'].includes(standarizedFromType) && !['datasource', 'datafield'].includes(standarizedToType)) {
            if (standarizedToType === 'string') {
                bConvertable = true; //everything can be casted to string
            } else if (standarizedFromType !== 'string') {
                // now we have both from/to to be number
                bConvertable = isTypeLower(fromType, toType);
            }
        }
    }
    return bConvertable;
};

const _standardizeDefaultValue = function(type) {
    if (_standardizeType(type) === 'number') {
        return 0;
    } else if (_standardizeType(type) === 'boolean') {
        return true;
    } else if (_standardizeType(type) === 'string') {
        return '';
    } else {
        return null;
    }
};
export const standardizeType = _standardizeType;
export const standardizeDefaultValue = _standardizeDefaultValue;
export const typeConvertable = _typeConvertable;

export const stringifyBytes = function(bytes: number) {
    const counter = {
        B: bytes % 1024,
        KB: Math.floor(bytes / 1024) % 1024,
        MB: Math.floor(bytes / Math.pow(1024, 2)) % 1024,
        GB: Math.floor(bytes / Math.pow(1024, 3)) % 1024,
        TB: Math.floor(bytes / Math.pow(1024, 4)),
    };
    if (counter.TB) {
        return `${counter.TB}.${(counter.GB / 1024).toString()[2] || 0}TB`;
    } else if (counter.GB) {
        return `${counter.GB}.${(counter.MB / 1024).toString()[2] || 0}GB`;
    } else if (counter.MB) {
        return `${counter.MB}.${(counter.KB / 1024).toString()[2] || 0}MB`;
    } else if (counter.KB) {
        return `${counter.KB}.${(counter.B / 1024).toString()[2] || 0}KB`;
    } else if (counter.B) {
        return `${counter.B}B`;
    } else {
        return '0B';
    }
};
