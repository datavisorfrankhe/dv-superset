import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { I18NService } from '@src/app/modules/shared/services/i18n.service';
import { ValidateResults } from './valid_result.entity';
import { Table, DataList, Column } from '@src/app/modules/shared/comps/components/data_table/data_table.entities';

@Component({
    templateUrl: './validate_result_details.component.html',
    styleUrls: ['./validate_result_details.component.scss']
})
export class ValidateResultDetailsComponent {
    validateResults: ValidateResults;
    config: Table = null;
    data: DataList = null;
    constructor(
        @Inject(MAT_DIALOG_DATA) public passedInData: any,
        public dialogRef: MatDialogRef<ValidateResultDetailsComponent>,
        public i18n: I18NService
    ) {
        this.validateResults = passedInData.validateResults;
        this.config = getTableConfig();
        this.data = new DataList(this.validateResults.validateResults);
    }
    closeme() {
        this.dialogRef.close();
    }
}

const getTableConfig = function() {
    const idCol = new Column({
        key: 'id',
        hidden: true,
        primaryKey: true
    }, 0);
    const idEventAttributeName = new Column({
        key: 'fieldName',
        title: 'fieldName',
        hidden: false,
        primaryKey: false
    }, 1);
    const idTotalCount = new Column({
        key: 'totalCount',
        title: 'totalCount',
        hidden: false,
        primaryKey: false
    }, 2);
    const idEmptyCount = new Column({
        key: 'emptyCount',
        title: 'emptyCount',
        hidden: false,
        primaryKey: false
    }, 3);
    const idInvalidCount = new Column({
        key: 'invalidCount',
        title: 'Invalid Count',
        hidden: false,
        primaryKey: false
    }, 4);
    const idValidCount = new Column({
        key: 'validCount',
        title: 'Valid Count',
        hidden: false,
        primaryKey: false
    }, 5);
    return new Table({
        rowHeight: 60,
        tableSearch: true,
        columns: [idCol, idEventAttributeName, idTotalCount, idEmptyCount, idInvalidCount, idValidCount],
        height: 600,
        headerHeight: 60,
        global: false,
        rowExpandable: false,
        enableCheckBox: false,
        listView: true
    });
};
