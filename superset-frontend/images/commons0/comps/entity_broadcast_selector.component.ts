import { Component, Inject } from '@angular/core';
import { I18NService } from '@services/i18n.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UtilService } from '@services/util.service';
import { EntityBroadcastService } from './entity_broadcast.service';
@Component({
    templateUrl: './entity_broadcast_selector.component.html',
    styleUrls: ['./entity_broadcast_selector.component.scss']
})
export class EntityBroadcastSelectorComponent {
    type: string;
    tenants: any;
    selectedTenants: any;
    error: string;
    constructor(
        private entityBroadcastService: EntityBroadcastService,
        public util: UtilService,
        public i18n: I18NService,
        private dialogRef: MatDialogRef<EntityBroadcastSelectorComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.tenants = null;
        this.selectedTenants = [];
        this.entityBroadcastService.getAllFPTenants().subscribe(tenants => {
            this.tenants = tenants;
            this.type = this.util.capitalize(data['type']) + 's';
        });
    }
    selectedChanged(e) {
        this.selectedTenants  = e;
    }
    cancel() {
        this.dialogRef.close();
    }
    confirm() {
        this.error = null;
        if (this.selectedTenants.length > 0 ) {
            this.dialogRef.close(this.selectedTenants);
        } else {
            this.error = this.i18n.trans('FP_BROADCAST_SELECTOR_ERROR');
        }
    }
}
