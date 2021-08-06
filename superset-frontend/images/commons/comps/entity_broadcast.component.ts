import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { I18NService } from '@shared/services/i18n.service';
import { EntityBroadcastService } from './entity_broadcast.service';
import { AccessControlService } from '@shared/services/access-control.service';
import { ACCESSTASKS } from '@modules/access-control/entities/access-task';
import { GeneralFunctions } from '../../create/v2/modules/ui/entities/general_function';
import { MatDialog } from '@angular/material';
import { EntityBroadcastSelectorComponent } from './entity_broadcast_selector.component';

@Component({
    selector: 'app-entity-broadcaster',
    templateUrl: './entity_broadcast.component.html',
    styleUrls: ['./entity_broadcast.component.scss']
})
export class EntityBroadcastComponent implements OnChanges {
    @Input() entityList: any[] = [];
    @Input() items: string[] = [];
    @Input() entityType = '';
    @Input() selectedItemColumnKey: string;
    @Input() generalFunctions: GeneralFunctions;

    enabled: boolean;
    currentStatus: string = STATUSES.WAITING;

    total: number;
    processed: number;
    STATUSES = STATUSES;

    constructor(
        public dialog: MatDialog,
        private accessControlService: AccessControlService,
        private entityBroadcastService: EntityBroadcastService,
        public i18n: I18NService) {
        this.total = 0;
        this.processed = 0;
        this.enabled = this.accessControlService.hasAccess(ACCESSTASKS.CENTRALIZED_DATA_MANAGEMENT);
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('items' in changes &&
            !changes.items.firstChange &&
            changes.items.currentValue !==
            changes.items.previousValue) {
            this.items = changes.items.currentValue;
        }
    }

    start() {
        const selectorDialog = this.dialog.open(
            EntityBroadcastSelectorComponent,
            {
                width: '50%',
                panelClass: 'userActionDialog',
                data: {
                    type: this.entityType
                }
            }
        );
        selectorDialog.afterClosed().subscribe(result => {
            if (result) {
                if (result[0] === 'all') {
                    this.broadcastAll();
                } else {
                    this.broadcastEntitiesToClients(result);
                }
            }
        });
    }

    broadcastEntitiesToClients(tenants) {
        this.currentStatus = STATUSES.RUNNING;
        this.total = tenants.length;
        this.entityBroadcastService.broadCastUpdatesTo(
            this.entityType,
            this.selectedItemColumnKey,
            this.items,
            this.entityList,
            this.generalFunctions,
            tenants
        ).subscribe((resultObj: any) => {
            this.total = resultObj.total;
            this.processed = resultObj.processed;
            if (this.total === this.processed) {
                this.currentStatus = STATUSES.COMPLETED;
                setTimeout(() => {
                    this.currentStatus = STATUSES.WAITING;
                }, 10000);
            }
        });
    }

    broadcastAll() {
        this.currentStatus = STATUSES.RUNNING;
        this.entityBroadcastService.broadCastUpdates(
            this.entityType,
            this.selectedItemColumnKey,
            this.items,
            this.entityList,
            this.generalFunctions
        ).subscribe((resultObj: any) => {
            this.total = resultObj.total;
            this.processed = resultObj.processed;
            if (this.total === this.processed) {
                this.currentStatus = STATUSES.COMPLETED;
            }
        });
    }
}

enum STATUSES {
    WAITING = 'WAITING',
    RUNNING = 'RUNNING',
    COMPLETED = 'COMPLETED',
}

export enum BROADCAST_TYPES {
    FEATURE_DEFINITION = 'FEATURE_DEFINITION',
    FUNCTION = 'FUNCTION',
    PACKAGE = 'PACKAGE',
}
