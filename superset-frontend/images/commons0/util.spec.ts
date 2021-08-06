import {typeConvertable} from './utils';
describe('feature-platform/commons/util', () => {
    it('should check convertable or not based on order', () => {
        expect(typeConvertable('string', 'String')).toBeTruthy();
        expect(typeConvertable('int', 'String')).toBeTruthy();
        expect(typeConvertable('string', 'int')).toBeFalsy();
        expect(typeConvertable('datasource', 'datafield')).toBeFalsy();
        expect(typeConvertable('datasource', 'datasource')).toBeTruthy();
        expect(typeConvertable('int', 'long')).toBeTruthy();
        expect(typeConvertable('list', 'list')).toBeTruthy();
        expect(typeConvertable('list', 'set')).toBeTruthy();
        expect(typeConvertable('list', 'map')).toBeFalsy();
        expect(typeConvertable('long', 'int')).toBeFalsy();
    });
});
