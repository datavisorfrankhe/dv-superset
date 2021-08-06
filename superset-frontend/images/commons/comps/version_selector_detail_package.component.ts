import { Component, Input, Output, EventEmitter, ViewChild, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { I18NService } from '@src/app/modules/shared/services/i18n.service';
import { PackageEntity } from '@src/app/modules/feature-platform/modules/feature-package/entities/package.entity';
import { FPSocketService } from '@src/app/modules/shared/services/fp_socket.service';
import { FeatureDefinitions, FeatureDefinition } from '@src/app/modules/feature-platform/modules/feature_definitions/feature_definitions.entity';
import { Features } from '@src/app/modules/feature-platform/modules/create/entities/features';
import { Column, Table, DataList } from '@src/app/modules/shared/comps/components/data_table/data_table.entities';

@Component({
    selector: 'app-version-selector-detail-package',
    templateUrl: './version_selector_detail_package.component.html',
    styleUrls: ['./version_selector_detail_package.component.scss']
})
export class VersionSelectorDetailPackageComponent implements OnChanges {

    @Input() packageEntity: PackageEntity;
    featureDefinitions: FeatureDefinitions;
    features: Features;
    config: any = null;
    data: any = null;
    appId = 'version_selector_package_dv';
    constructor(private fpSocketService: FPSocketService, public i18n: I18NService) {
        setTimeout(() => {
            this.getFeatureTemplates();
        });
    }

    getFeatureTemplates() {
        const packageId = this.packageEntity.id;
        this.fpSocketService.request('FP_GET_PACKAGE_FEATURE_TEMPLATES',
            { packageId }).subscribe(data => {
                this.featureDefinitions = new FeatureDefinitions(data);
                const res = getTemplateDataConfig(this.i18n, this.featureDefinitions);
                setTimeout(() => {
                    this.config = res.config;
                    this.data = res.data;
                }, 0);
            });

        this.fpSocketService.getAllFeaturesForUseCaseId(packageId, data => {
            this.features = new Features(data);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            'packageEntity' in changes &&
            !changes.packageEntity.firstChange &&
            changes.packageEntity.currentValue !==
            changes.packageEntity.previousValue
        ) {
            this.packageEntity = changes.packageEntity.currentValue;
            this.getFeatureTemplates();
        }
    }
}

const getTemplateDataConfig = function (i18n: I18NService, featureDefinitions: FeatureDefinitions) {
    const idCol = new Column({
        key: 'id',
        fixed: true,
        primaryKey: true,
        hidden: true
    });
    const idName = new Column({
        key: 'name',
        width: 100,
        title: i18n.trans('FP_VERSION_FEATURETEMPLATE_NAME'),
        flexGrow: 1,
        primaryKey: false
    });
    const idVersion = new Column({
        key: 'version',
        width: 100,
        title: i18n.trans('FP_VERSION_FEATURETEMPLATE_VERSION'),
        flexGrow: 1,
        primaryKey: false
    });
    const idDesc = new Column({
        key: 'description',
        width: 100,
        title: i18n.trans('FP_VERSION_FEATURETEMPLATE_DESC'),
        flexGrow: 1,
        primaryKey: false
    });
    const idTags = new Column({
        key: 'dvTags',
        width: 100,
        title: i18n.trans('FP_VERSION_FEATURETEMPLATE_DVFIELDS'),
        flexGrow: 1,
        primaryKey: false
    });
    const idCreatedBy = new Column({
        key: 'createBy',
        width: 100,
        title: i18n.trans('FP_VERSION_FEATURETEMPLATE_CREATEDBY'),
        flexGrow: 1,
        hidden: true,
        primaryKey: false
    });
    const idCreatedAt = new Column({
        key: 'createAt',
        width: 100,
        title: i18n.trans('FP_VERSION_FEATURETEMPLATE_CREATEDAT'),
        flexGrow: 1,
        hidden: true,
        primaryKey: false
    });
    const table = new Table({
        rowHeight: 60,
        tableSearch: false,
        columns: [idCol, idName, idVersion, idDesc, idTags, idCreatedBy, idCreatedAt],
        height: 220,
        headerHeight: 60,
        global: false,
        rowExpandable: false,
        listView: true
    });
    const dataList = [];
    featureDefinitions.featureDefinitions.forEach((f: FeatureDefinition) => {
        dataList.push({
            id: f.id,
            name: f.name,
            description: f.getDescription(i18n.getLang()),
            dvTags: f.attributeTags.attributeTags.map( item => item.name ).join(','),
            createBy: f.createBy,
            createAt: f.createAt,
            version: f.fullVersion
        });
    });
    return {
        config: table,
        data: new DataList(dataList)
    };
};
