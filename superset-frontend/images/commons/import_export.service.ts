import { Injectable } from '@angular/core';
import { FPSocketService } from '@shared/services/fp_socket.service';
import { UtilService } from '@shared/services/util.service';
import { Observable } from 'rxjs';
import { Features } from '@src/app/modules/feature-platform/modules/create/entities/features';
import { MatDialog } from '@angular/material';
import { PopUpComponent } from '@src/app/modules/shared/comps/components/popup.component';
import { I18NService } from '@src/app/modules/shared/services/i18n.service';
import { GeneralFunction, GeneralFunctions } from '@src/app/modules/feature-platform/modules/create/v2/modules/ui/entities/general_function';
import { FeatureDefinitions } from '@src/app/modules/feature-platform/modules/feature_definitions/feature_definitions.entity';
import { map } from 'rxjs/operators';
import { PackageEntities } from '@src/app/modules/feature-platform/modules/feature-package/entities/package.entity';
import { StoreService } from 'src/app/modules/shared/services/redux/store.service';
export enum IMPEXPENTITYTYPE {
    OPERATOR = 'OPERATOR',
    FEATUREDEFINITION = 'FEATUREDEFINITION',
    PACKAGE = 'PACKAGE',
    FEATURE = 'FEATURE',
    RULE = 'RULE',
    RULE_SET = 'RULE_SET',
}

@Injectable()
export class ImportExportService {

    constructor(
        private i18n: I18NService,
        public dialog: MatDialog,
        private fpSocketService: FPSocketService,
        private utilService: UtilService,
        private storeService: StoreService) {
    }

    postExportEntities(entityType: string, ids: any[], fileName: string = '') {
        const statusDialogRef = this.dialog.open(PopUpComponent, {
            width: '50%',
            panelClass: 'userActionDialog',
            data: {
                'title': this.i18n.trans('FP_EXPORT_BATCH_TITLE', this.utilService.capitalize(entityType)),
                'content': this.i18n.trans('FP_EXPORT_BATCH_CONTENT', this.utilService.capitalize(entityType)),
                'checkBoxTitle': this.i18n.trans('FP_EXPORT_BATCH_CHECKALLVERSION'),
                'confirmButtonTitle': this.i18n.trans('FP_EXPORT_BATCH_EXPBUTTON')
            }
        });
        statusDialogRef.afterClosed().subscribe(result => {
            if (result !== false) {
                this.showMessagePopup(true);
                if (result.checkboxSelected) {
                    //select all versions
                    this.getAllVersionsEntities(entityType, ids).subscribe(newIds => {
                        this.export(entityType, newIds, fileName);
                    });
                } else {
                    this.export(entityType, ids, fileName);
                }
            }
        });
    }

    export(entityType, ids, fileName: string = '') {
        let promise;
        switch (entityType) {
            case IMPEXPENTITYTYPE.FEATURE:
                promise = new Promise(resolve => this.fpSocketService.postExportFeatures(ids, resolve));
                fileName = fileName || 'Features';
                break;
            case IMPEXPENTITYTYPE.OPERATOR:
                promise = new Promise(resolve => this.fpSocketService.postExportFunctions(ids, resolve));
                fileName = fileName || 'Functions';
                break;
            case IMPEXPENTITYTYPE.FEATUREDEFINITION:
                promise = new Promise(resolve => this.fpSocketService.postExportFeatureDefinitions(ids, resolve));
                fileName = fileName || 'Feature templates';
                break;
            case IMPEXPENTITYTYPE.PACKAGE:
                promise = new Promise(resolve => this.fpSocketService.postExportPackages(ids, resolve));
                fileName = fileName || 'Feature packages';
                break;
        }
        promise.then(data => {
            this.utilService.downloadContent(data, 'json', fileName);
            this.showMessagePopup(false);
        });
    }

    getAllVersionsEntities(type, ids) {
        return new Observable(observer => {
            switch (type) {
                case IMPEXPENTITYTYPE.OPERATOR:
                    const p1 = new Promise(resolve => {
                        this.fpSocketService.sendGetAllFeatureTemplates(templates => {
                            resolve(new GeneralFunctions(templates));
                        });
                    });
                    const p2 = new Promise(resolve => {
                        this.fpSocketService.sendGetAllVelocityFunctions(funcList => {
                            resolve(new GeneralFunctions(funcList));
                        });
                    });
                    Promise.all([p1, p2]).then((results: any) => {
                        const generalFunctions: GeneralFunctions = results[0].concatenate(results[1]);
                        observer.next(generalFunctions.getAllVersionedIdsFor(ids));
                    });
                    break;
                case IMPEXPENTITYTYPE.FEATUREDEFINITION:
                    this.fpSocketService.getAllFeatureTemplateWithArgs(dataList => {
                        observer.next(new FeatureDefinitions(dataList).getAllVersionedIdsFor(ids));
                    });
                    break;
                case IMPEXPENTITYTYPE.PACKAGE:
                    this.fpSocketService.request('FP_GET_PACKAGES').subscribe(data => {
                        observer.next(new PackageEntities(data).getAllVersionedIdsFor(ids));
                    });
                    break;
            }
        });
    }

    postImportEntities(body) {
        return new Observable(observer => {
            this.fpSocketService.importJson(body, data => {
                observer.next(data);
            });
        });
    }

    showMessagePopup(show) {
        switch (show) {
            case true:
                this.storeService.showMessage({
                    type: 'LOADER',
                });
                break;
            case false:
            default:
                this.storeService.showMessage({
                    type: 'CLOSER',
                });
        }
    }
}
