import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { DsSelectorForFeatureService } from './ds-selector-for-feature.service';
import { I18NService } from '@src/app/modules/shared/services/i18n.service';
import { Option } from '@src/app/modules/shared/comps/components/data_table_filter/data_table_filter.entity';
import { DataSets } from '@src/app/modules/feature-platform/modules/feature-data-v2/commons/data_set.entity';
import { EntityNode } from '@shared/services/entity-management/entity.model';
import { DataSources } from '@src/app/modules/feature-platform/modules/datasource/commons/datasource.entity';
import { DataSourceDatasetRelations, DataSourceDatasetRelation } from '@src/app/modules/feature-platform/modules/commons/comps/ds-selector-for-features/datasource_dataset_relation.entity';

@Component({
    selector: 'dv-datasource-selector-for-features',
    templateUrl: './ds-selector-for-feature.component.html',
    styleUrls: ['./ds-selector-for-feature.component.scss']
})
export class DataSourceSelectorForFeaturesComponent implements OnChanges {

    @Input() featureIds;
    @Input() featureId;
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    @Output() onRelatedDatasourceChanged: EventEmitter<any> = new EventEmitter();
    dataSourceNames: string[] = [];
    dataSetNames: String[] = [];
    dataSets: DataSets;
    datasources: DataSources;

    placeholder: string;
    selectOptions: Option[];
    defaultDataSourceNames: string[] = [];
    defaultDataSetNames: string[] = [];

    dataSourceDatasetRelations: DataSourceDatasetRelations = new DataSourceDatasetRelations();

    constructor(public i18n: I18NService, private dsSelectorForFeatureService: DsSelectorForFeatureService) {
        setTimeout(() => {
            if (this.featureId) { this.featureIds = [this.featureId]; }
            this._getDatasourceDependency();
        });
        this.selectOptions = [];
        this.placeholder = this.i18n.trans('FP_SELECT_DATASOURCES_FOR_FEATURES');
        this.dsSelectorForFeatureService.getAllDataSets().subscribe(ds => {
            this.dataSets = ds;
        });
    }

    selectionChange() {
        this.onChange.emit(this.dataSourceDatasetRelations);
    }

    _getDatasourceDependency() {
        this.dsSelectorForFeatureService.getForwardNodesForFeatures(this.featureIds).subscribe((res: EntityNode[]) => {
            this.selectOptions = [];
            this.dataSourceNames = [];
            this.datasources = this.dsSelectorForFeatureService.datasources;
            res.forEach((nodeInfo: EntityNode) => {
                this.selectOptions.push(new Option({
                    value: nodeInfo.id,
                    title: nodeInfo.name
                }));
                this.dataSourceNames.push(nodeInfo.name);
            });
            if (this.dataSourceNames.length > 0) {
                this.defaultDataSourceNames = [this.dataSourceNames[0]];
            }
            this.onRelatedDatasourceChanged.emit(this.dataSourceNames);
        });
    }

    dataSourceChanged(e) {
        this.defaultDataSourceNames = e ;
        this._updateDataSetsForDataSource();
    }

    dataSetChanged(e) {
        this.defaultDataSetNames = e ;
    }

    _updateDataSetsForDataSource() {
        this.dataSetNames = this.dataSets.getDatasetsForDatasourceNames(this.defaultDataSourceNames).map(d => {
            return d.name;
        });
    }

    addRelationship() {
        this.defaultDataSourceNames.forEach((dsName: string) => {
            this.defaultDataSetNames.forEach((dseName: string) => {
                this.dataSourceDatasetRelations.addRelationship(
                    this.datasources.findByName(dsName),
                    this.dataSets.getByName(dseName)
                );
            });
        });
        this.defaultDataSetNames = [];
        this.selectionChange();
    }

    removeRelation(r: DataSourceDatasetRelation) {
        this.dataSourceDatasetRelations.remove(r);
        this.selectionChange();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            'featureIds' in changes &&
            !changes.featureIds.firstChange &&
            changes.featureIds.currentValue !==
            changes.featureIds.previousValue
        ) {
            this.featureIds = JSON.parse(JSON.stringify(changes.featureIds.currentValue));
            this._getDatasourceDependency();
        }

        if (
            'featureId' in changes &&
            !changes.featureId.firstChange &&
            changes.featureId.currentValue !==
            changes.featureId.previousValue &&
            changes.featureId.currentValue !== this.featureId
        ) {
            this.featureId = changes.featureId.currentValue;
            this.featureIds = [changes.featureId];
            this._getDatasourceDependency();
        }
    }
}
