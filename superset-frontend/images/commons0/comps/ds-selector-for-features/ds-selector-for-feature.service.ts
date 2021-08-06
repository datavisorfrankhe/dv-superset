import { Injectable } from '@angular/core';
import { FPSocketService } from '@src/app/modules/shared/services/fp_socket.service';
import { Observable, zip } from 'rxjs';
import { EntityDependencyRequest, EntityDependencyResponse } from '@shared/services/entity-management/entity.model';
import { EntityNode, EntityCategory } from '@shared/services/entity-management/entity.model';
import { DataSources } from '@src/app/modules/feature-platform/modules/datasource/commons/datasource.entity';
import { DataSets } from '@src/app/modules/feature-platform/modules/feature-data-v2/commons/data_set.entity';

@Injectable()
export class DsSelectorForFeatureService {
    datasources: DataSources;
    dependencyResults = {};

    constructor(private fpSocketService: FPSocketService) { }

    getForwardNodesForFeatures(featureIds): Observable<EntityNode[]> {
        return new Observable(observer => {
            if (this._getCacheKey(featureIds) in this.dependencyResults) {
                observer.next(this.dependencyResults[this._getCacheKey(featureIds)]);
            } else {
                zip(this._getAllDatasources(), this._getForwardDataSourceDependenciesForFeatures(featureIds)).subscribe((res: any) => {
                    const dependencyResponse: EntityDependencyResponse = res[1];
                    dependencyResponse.populateDataSourceNames(this.datasources);
                    this.dependencyResults[this._getCacheKey(featureIds)] =
                        dependencyResponse.getAllDependenciesForType(EntityCategory.DATA_SOURCE);
                    observer.next(this.dependencyResults[this._getCacheKey(featureIds)]);
                });
            }
        });
    }

    getAllDataSets(): Observable<DataSets> {
        return new Observable(observer => {
            this.fpSocketService.getAllDatasets(data => {
                observer.next(new DataSets(data));
            });
        });
    }

    getDataSourcesByIds(dataSourceIds) {
        return this.datasources.findByIds(dataSourceIds);
    }

    _getCacheKey(ids) {
        return ids.sort().join(',');
    }

    _getAllDatasources() {
        return new Observable(observer => {
            if (this.datasources) {
                observer.next();
            } else {
                this.fpSocketService.getAllDataSources(sources => {
                    this.datasources = new DataSources(sources);
                    observer.next();
                });
            }
        });
    }
    _getForwardDataSourceDependenciesForFeatures(featureIds) {
        return new Observable(observer => {
            const req: EntityDependencyRequest = new EntityDependencyRequest();
            req.setFeaturesIds(featureIds);
            req.categoryList = [EntityCategory.DATA_SOURCE];
            this.fpSocketService.postForwardDependency(req, data => {
                observer.next(new EntityDependencyResponse(data));
            });
        });
    }

}
