import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { ValidateResultService } from '@src/app/modules/feature-platform/modules/commons/validate_result/validate_result.service';
import { ValidateResults } from './valid_result.entity';
import { ReplayTask } from '@src/app/modules/feature-platform/modules/replay/commons/replay.entity';
import { I18NService } from '@src/app/modules/shared/services/i18n.service';
import { MatDialog } from '@angular/material';
import { ValidateResultDetailsComponent } from './validate_result_details.component';

@Component({
    selector: 'app-data-validate-result',
    templateUrl: './validate_result.component.html',
    styleUrls: ['./validate_result.component.scss']
})
export class ValidateResultComponent implements OnChanges, AfterViewInit {


    validateResults: ValidateResults;
    @Input() replayTask: ReplayTask;

    constructor(
        private dialog: MatDialog,
        private validateResultService: ValidateResultService,
        public i18n: I18NService) { }

    checkingResult() {
        this.validateResultService.checkingResult(this.replayTask.id).subscribe( (validateResults: ValidateResults) => {
            this.validateResults = validateResults;
        } );
    }

    ngAfterViewInit(): void {
        this.checkingResult();
    }

    showErrors() {
        this.dialog
            .open(ValidateResultDetailsComponent, {
                panelClass: 'full-size',
                data: {
                    validateResults: this.validateResults
                }
            });
    }


    ngOnChanges(changes: SimpleChanges) {
        if (
            'replayTask' in changes &&
            !changes.replayTask.firstChange &&
            changes.replayTask.currentValue !==
            changes.replayTask.previousValue
        ) {
            this.replayTask = changes.replayTask.currentValue;
            this.checkingResult();
        }
    }
}
