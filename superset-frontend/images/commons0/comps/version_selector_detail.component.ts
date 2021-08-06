import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { I18NService } from '@src/app/modules/shared/services/i18n.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ControlPanel, ControlPanelButton, DataList, Table } from '@src/app/modules/shared/comps/components/data_table/data_table.entities';
import { VERSIONTYPE } from '@src/app/modules/feature-platform/modules/commons/comps/version_selector.entities';
import { AccessControlService } from '@src/app/modules/shared/services/access-control.service';
import { ACCESSTASKS } from '@src/app/modules/access-control/entities/access-task';

@Component({
    templateUrl: './version_selector_detail.component.html',
    styleUrls: ['./version_selector_detail.component.scss']
})
export class VersionSelectorDetailComponent {
    @Output() onClose: EventEmitter<any> = new EventEmitter();
    @Output() onConfirm: EventEmitter<any> = new EventEmitter();
    tableControlPanelConfig: ControlPanel;
    selectedRows: any[];
    config: Table = null;
    data: DataList = null;
    appId: string;

    passedInEntities: any;
    selectedEntity: any;

    type: string;

    versionToShow = null;
    versionDetailOpened = false;
    _VERSIONTYPE = VERSIONTYPE;
    deletable = true;

    constructor(
        private acService: AccessControlService,
        @Inject(MAT_DIALOG_DATA) public passedInData: any,
        public dialogRef: MatDialogRef<VersionSelectorDetailComponent>,
        public i18n: I18NService
    ) {
        this.selectedRows = [];
        this.config = passedInData.config;
        this.config.height = 500;
        this.data = passedInData.data;
        this.type = 'type' in passedInData ? passedInData.type : '';

        this.passedInEntities = null;
        this.selectedEntity = null;

        if ('entityList' in passedInData) {
            this.passedInEntities = passedInData.entityList;
        }

        if (this.type === 'package' && !this.acService.canEditTask(ACCESSTASKS.FEATURE_PACKAGE)) {
            this.deletable = false;
        }

        if (this.deletable) {
            this.tableControlPanelConfig = new ControlPanel({
                actionButtons: [
                    new ControlPanelButton({
                        text: this.i18n.trans('DELETE').toUpperCase(),
                        iconName: 'delete_forever',
                        isSvgIcon: false,
                        onClick: () => this.deleteAll(),
                        disabled: () => this.selectedRows.length === 0
                    })
                ]
            });
        }
        this.appId = 'version_select_table';
    }

    selectedRowChanged(e) {
        this.selectedRows = e;
    }
    onCellClicked(e) {
        this.versionToShow = e[0][e[1]];
        this.selectedEntity = this.passedInEntities.findById(e[0].id);
    }

    closeme() {
        this.dialogRef.close();
    }
    deleteAll() {
        this.dialogRef.close({ action: 'delete', payload: this.selectedRows });
    }
    exportAll() {
        this.dialogRef.close({ action: 'export', payload: this.selectedRows });
    }
    onMoreOptionItemClicked(e) {
        this.dialogRef.close({ action: e.clickedItem.value, payload: [e.row.id] });
    }
    edit() {
        this.dialogRef.close({ action: 'edit', payload: [this.selectedEntity.id] });
    }
    view() {
        this.dialogRef.close({ action: 'view', payload: [this.selectedEntity.id] });
    }
}
