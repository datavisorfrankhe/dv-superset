import { Component, Input, OnInit } from '@angular/core';
import { Column, Table } from '@shared/comps/components/data_table/data_table.entities';
import { Observable, Subject } from 'rxjs';
import { I18NService } from '@services/i18n.service';
import { ALERT_TYPE } from '@src/app/modules/shared/comps/components/messager.component';

export interface FpErrorsData {
    errors?: string[];
}

@Component({
    selector: 'fp-errors',
    templateUrl: './fp-errors.component.html',
    styleUrls: ['./fp-errors.component.scss']
})
export class FpErrorsComponent implements OnInit {
    @Input() data: FpErrorsData;
    @Input() type: string;
    tableConfig: Table;
    tableData: any;
    _ALERT_TYPE: any;
    private readonly _onClose = new Subject<any>();
    onClose: Observable<any> = this._onClose.asObservable();

    constructor(public i18n: I18NService) {
        this.type = ALERT_TYPE.ERROR;
        this._ALERT_TYPE = ALERT_TYPE;
    }

    ngOnInit() {
        const icon = `<i class="status-icon ${this.type} material-icons">warning</i>`;
        const dataList = this.data.errors.map((error, idx) => {
            return {
                id: idx,
                icon: icon,
                error: error,
            };
        });
        this.tableData = {
            dataList: dataList,
            total: dataList.length,
        };

        const columns = [
            new Column({
                key: 'id',
                type: 'text',
                hidden: true,
                primaryKey: true
            }),
            new Column({
                key: 'icon',
                title: '',
                type: 'pure_html',
                sortable: false,
                reordable: false,
                resizable: false,
                primaryKey: false,
                width: 60,
                flexGrow: 0
            }),
            new Column({
                key: 'error',
                title: 'Error Message',
                type: 'html',
                sortable: false,
                reordable: false,
                resizable: false,
                primaryKey: false,
                flexGrow: 1000
            })
        ];
        const messageI18nKey = (this.type === ALERT_TYPE.ERROR)
            ? 'FP_PACKAGE_GET_FEATURES_CONTACT_DATAVISOR_ERROR'
            : 'FP_PACKAGE_GET_FEATURES_CONTACT_DATAVISOR_WARNING';
        this.tableConfig = new Table({
            height: 600,
            headerHeight: 0,
            listView: true,
            hideSetting: true,
            global: false,
            totalTitle: this.i18n.trans(messageI18nKey, [this.data.errors.length]),
            columns: columns,
        });
    }

    close() {
        this._onClose.next();
    }

    contact() {
        //todo: do something
    }
}
