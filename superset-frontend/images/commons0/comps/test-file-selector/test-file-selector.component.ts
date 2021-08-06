import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TestFileSelectorService } from './test-file-selector.service';
import { DataSets, DATASETSTATUS, useableStatus } from '@src/app/modules/feature-platform/modules/feature-data-v2/commons/data_set.entity';
import { I18NService } from '@src/app/modules/shared/services/i18n.service';
import { DvPeriod } from '@src/app/modules/shared/comps/components/dv-period-selector/dv-period-selector.entity';

@Component({
    selector: 'dv-test-file-selector',
    templateUrl: './test-file-selector.component.html',
    styleUrls: ['./test-file-selector.component.scss'],
})
export class TestFileSelectorComponent {
    dataSets: DataSets;
    placeholderSelectDataset: string;
    placeholderSelectDatasetSup: string;
    @Output() onSelectChanged: EventEmitter<any> = new EventEmitter();
    @Output() onDataSetChanged: EventEmitter<any> = new EventEmitter();
    @Output() onSupplimentaryDataSetChanged: EventEmitter<any> = new EventEmitter();
    @Output() onUsingRT: EventEmitter<any> = new EventEmitter();

    @Input() onlyDataSet = false;
    @Input() clientName: string;
    @Input() showSupplementDataSet = false;

    _DATASETSTATUS;
    loaded = false;

    usingRT = false;
    periodOptions = [1, 3, 5, 7, 14, 30];
    defaultPeriod: DvPeriod;
    backDays = 3;
    rtFileList: string[] = [];
    dataSetNameOptions;
    constructor(public i18n: I18NService, private testFileSelectorService: TestFileSelectorService) {
        this.defaultPeriod = new DvPeriod({
            type: '' + this.backDays,
            start_dt: new Date(new Date().getTime() - 3600 * 24 * 1000 * this.backDays),
            end_dt: new Date()
        });
        this.dataSets = null;
        this.placeholderSelectDataset = this.i18n.trans('FP_FEATURTESTING_FILESELECTOR_SELECTDS');
        this.placeholderSelectDatasetSup = this.i18n.trans('FP_FEATURTESTING_FILESELECTOR_SELECTDS_HISTORICAL');
        setTimeout(() => {
            this.testFileSelectorService.fetchDataSets(this.clientName).subscribe((ds: DataSets) => {
                this.loaded = true;
                this.dataSets = ds;
                if (ds.dataSets.length > 0) {
                    this.dataSets.selectedDataSetId = ds.dataSets[0].id;
                    this.dataSetNameOptions = this.dataSets.dataSetNameOptions;
                    this.onDataSetChanged.emit(this.dataSets.selectedDataSet);
                }
            });
        });
        this._DATASETSTATUS = DATASETSTATUS;
    }
    onChange(e) {
        this.onSelectChanged.emit({
            dataset: this.dataSets.selectedDataSet,
            fileList: e
        });
    }
    get selectedDataSetReminder() {
        return this.i18n.trans('FP_REPLAY_DATASET_STATUS_REMINDER_' + this.dataSets.selectedDataSet.status);
    }
    showDetail() {
        const win = window.open(`${this.i18n.getLang()}/feature_platform/feature-data-v2/field_map/${this.dataSets.selectedDataSet.id}`, '_blank');
        win.focus();
    }
    showValidateResult() {
        const win = window.open(`${this.i18n.getLang()}/feature_platform/feature-data-v2/validation_summary/${this.dataSets.selectedDataSet.id}`, '_blank');
        win.focus();
    }
    selectDataSetId(e) {
        this.dataSets.selectedDataSetId = e[0].id;
        this.onDataSetChanged.emit(this.dataSets.selectedDataSet);
    }
    selectHistoricalDataSetId(e) {
        this.dataSets.historicalDataSetId =  e[0].id;
        this.onSupplimentaryDataSetChanged.emit(this.dataSets.historicDataSet);
    }
    removeHistoricalDataSet() {
        this.dataSets.historicalDataSetId = null;
        this.onSupplimentaryDataSetChanged.emit(this.dataSets.historicDataSet);
    }
    updateUsingRT(e) {
        this.usingRT = e.checked;
        this.onUsingRT.emit(e.checked);
        if (!e.checked && this.dataSets) {
            this.onDataSetChanged.emit(this.dataSets.selectedDataSet);
        }
    }
    periodUpdateForRT(e) {
        const startTS = e.startDate.getTime();
        const endTS = e.endDate.getTime();
        this.testFileSelectorService.getRTTestFileList(startTS, endTS).subscribe((data: string[]) => {
            this.rtFileList = data;
            if (this.rtFileList.length > 0) {
                this.onSelectChanged.emit({
                    fileList: data
                });
            } else {
                this.onSelectChanged.emit({
                    fileList: []
                });
            }
        });
    }
}
