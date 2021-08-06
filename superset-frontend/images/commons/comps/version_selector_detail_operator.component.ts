import { Component, Input, Output, EventEmitter, ViewChild, Inject, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { I18NService } from '@src/app/modules/shared/services/i18n.service';
import { GeneralFunction } from '@src/app/modules/feature-platform/modules/create/v2/modules/ui/entities/general_function';
import { FeatureTemplate, TemplateArg } from '@src/app/modules/feature-platform/modules/create/entities/feature_template';
import { Column, Table, DataList } from '@src/app/modules/shared/comps/components/data_table/data_table.entities';

@Component({
    selector: 'app-version-selector-detail-operator',
    templateUrl: './version_selector_detail_operator.component.html',
    styleUrls: ['./version_selector_detail_operator.component.scss']
})
export class VersionSelectorDetailOperatorComponent implements AfterViewInit, OnChanges {


    @Input() generalFunction: GeneralFunction;
    config: any = null;
    data: any = null;
    appId = 'version_selector_operator_dv';
    constructor(public i18n: I18NService) {
    }
    ngAfterViewInit(): void {
        this.update();
    }
    update() {
        if (!this.generalFunction.isVelocity) {
            const featureTemplate: any = this.generalFunction.currentFunction;
            const res = getParamDataConfig(this.i18n, featureTemplate.templateArgs);
            setTimeout(() => {
                this.config = res.config;
                this.data = res.data;
            }, 0);
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (
            'generalFunction' in changes &&
            !changes.generalFunction.firstChange &&
            changes.generalFunction.currentValue !==
            changes.generalFunction.previousValue
        ) {
            this.generalFunction = changes.generalFunction.currentValue;
            this.update();
        }
    }
}

const getParamDataConfig = function(i18n: I18NService, templateArgs: TemplateArg[]) {
    const idCol = new Column({
        key: 'id',
        fixed: true,
        primaryKey: true,
        hidden: true
    });
    const idParameterName = new Column({
        key: 'name',
        width: 100,
        title: i18n.trans('FP_VERSION_OPERATOR_ARGLIST_PARAM_NAME'),
        flexGrow: 1,
        primaryKey: false
    });
    const idParameterDesc = new Column({
        key: 'desc',
        width: 150,
        title: i18n.trans('FP_VERSION_OPERATOR_ARGLIST_PARAM_DESC'),
        flexGrow: 1,
        primaryKey: false
    });
    const idParameterType = new Column({
        key: 'dataType',
        width: 80,
        flexGrow: 0,
        title: i18n.trans('FP_VERSION_OPERATOR_ARGLIST_PARAM_TYPE'),
        primaryKey: false
    });
    const table = new Table({
        rowHeight: 60,
        tableSearch: false,
        columns: [idCol, idParameterName, idParameterDesc, idParameterType],
        height: 180,
        headerHeight: 60,
        global: false,
        rowExpandable: false,
        listView: true
    });

    const dataList = [];
    templateArgs.forEach((templateArg: TemplateArg) => {
        dataList.push({
            id: templateArg.id,
            name: templateArg.name,
            desc: templateArg.getDescription(i18n.getLang()),
            dataType: templateArg.dataType
        });
    });

    return {
        config: table,
        data: new DataList(dataList)
    };
};
