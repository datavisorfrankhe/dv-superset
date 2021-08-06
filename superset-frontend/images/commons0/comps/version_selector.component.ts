import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VersionSelectorDetailComponent } from './version_selector_detail.component';
import { Table, DataList } from '@src/app/modules/shared/comps/components/data_table/data_table.entities';
import { I18NService } from '@src/app/modules/shared/services/i18n.service';
import { AccessControlService } from '@src/app/modules/shared/services/access-control.service';
import { ACCESSTASKS } from '@src/app/modules/access-control/entities/access-task';

@Component({
    selector: 'app-version-selector',
    template: ''
})
export class VersionSelectorComponent {
    @Output() onDelete: EventEmitter<any> = new EventEmitter();
    @Output() onExport: EventEmitter<any> = new EventEmitter();
    @Output() onEdit: EventEmitter<any> = new EventEmitter();
    @Output() onView: EventEmitter<any> = new EventEmitter();
    constructor(private dialog: MatDialog, private i18n: I18NService) {
    }
    open(table: Table, dataList: DataList, entityList: any = null, type: string = '') {
        this.dialog
            .open(VersionSelectorDetailComponent, {
                panelClass: 'full-size',
                data: {
                    config: table,
                    data: dataList,
                    entityList: entityList,
                    type: type
                }
            })
            .afterClosed()
            .subscribe(ret => {
                if (ret) {
                    if (ret.action === 'delete') {
                        this.onDelete.emit(ret.payload);
                    }
                    if (ret.action === 'export') {
                        this.onExport.emit(ret.payload);
                    }
                    if (ret.action === 'edit') {
                        this.onEdit.emit(ret.payload);
                    }
                    if (ret.action === 'view') {
                        this.onView.emit(ret.payload);
                    }
                }
            });
    }
}
