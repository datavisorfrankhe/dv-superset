import { Component, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { FileChooserPureComponent } from '@shared/comps/components/dv-file-chooser/file_chooser_pure.component';
import { FeatureImportExportService } from '../feature_import_export.service';
import { I18NService } from '@services/i18n.service';
@Component({
    selector: 'app-feature-importer',
    template: `
        <button *ngIf="primaryButton" mat-button class='dvBtnPrimary' (click)="import()"
                disabled="{{loadingStatus===1}}">
            <mat-spinner diameter=20 *ngIf="loadingStatus===1"></mat-spinner>
            {{loadingStatus === 0 ? i18n.trans('IMPORT') : (loadingStatus === 1 ? i18n.trans('IMPORTING') : (loadingStatus === 2 ? i18n.trans('IMPORTED') : i18n.trans('IMPORT')))}}
        </button>
        <button *ngIf="!primaryButton" mat-button (click)="import()"
                disabled="{{loadingStatus===1}}">
            <mat-spinner diameter=20 *ngIf="loadingStatus===1"></mat-spinner>
            {{loadingStatus === 0 ? i18n.trans('IMPORT') : (loadingStatus === 1 ? i18n.trans('IMPORTING') : (loadingStatus === 2 ? i18n.trans('IMPORTED') : i18n.trans('IMPORT')))}}
        </button>
        <dv-file-chooser></dv-file-chooser>
    `,
    styleUrls: ['./feature_import.component.scss']
})
export class FeatureImportComponent {

    @Output() onImportFinished: EventEmitter<any> = new EventEmitter();
    @Input() primaryButton: boolean;

    @ViewChild(FileChooserPureComponent) fileChooserPureComponent: FileChooserPureComponent;
    loadingStatus = 0;
    constructor(public i18n: I18NService, private featureImportExportService: FeatureImportExportService) {
        this.primaryButton = true;
    }
    import() {
        if (this.loadingStatus === 0) {
            this.fileChooserPureComponent.readFileContentsForType(['json'], data => {
                this.loadingStatus = 1;
                this.featureImportExportService.postInputFeatures(data.data).subscribe(results => {
                    this.loadingStatus = 2;
                });
            });
        } else if (this.loadingStatus === 2) {
            this.onImportFinished.emit();
        }
    }
}
