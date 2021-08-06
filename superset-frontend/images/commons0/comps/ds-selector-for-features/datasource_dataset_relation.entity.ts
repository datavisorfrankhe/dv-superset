import { DataSources, DataSource } from '@src/app/modules/feature-platform/modules/datasource/commons/datasource.entity';
import { DataSets, DataSet } from '@src/app/modules/feature-platform/modules/feature-data-v2/commons/data_set.entity';


export class DataSourceDatasetRelation {
    dataSource: DataSource;
    dataset: DataSet;
    constructor(ds, dse) {
        this.dataSource = ds;
        this.dataset = dse;
    }
}

export class DataSourceDatasetRelations {
    dataSourceDatasetRelations: DataSourceDatasetRelation[];
    constructor() {
        this.dataSourceDatasetRelations = [];
    }

    findByDataSourceDataSet(datasource: DataSource, dataset: DataSet) {
        return this.dataSourceDatasetRelations.find(item => {
            return item.dataSource.name === datasource.name && item.dataset.name === dataset.name;
        });
    }

    addRelationship(datasource: DataSource, dataset: DataSet) {
        if (!this.findByDataSourceDataSet(datasource, dataset)) {
            this.dataSourceDatasetRelations.push(new DataSourceDatasetRelation(datasource, dataset));
        }
    }

    remove(dataSourceDatasetRelation: DataSourceDatasetRelation) {
        this.dataSourceDatasetRelations.splice(this.dataSourceDatasetRelations.indexOf(dataSourceDatasetRelation), 1);
    }

    get createBody() {
        const bodyList = [];
        this.dataSourceDatasetRelations.forEach(r => {
            bodyList.push({
                dataSource: {
                    id: r.dataSource.id
                },
                dataset: {
                    id: r.dataset.id
                }
            });
        });
        return bodyList;
    }
}
