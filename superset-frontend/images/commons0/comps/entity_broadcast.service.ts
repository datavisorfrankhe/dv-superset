import { Injectable } from '@angular/core';
import { FPSocketService } from '@shared/services/fp_socket.service';
import { Observable } from 'rxjs';
import { GeneralFunctions, GeneralFunction, FUNCTIONTYPE } from '../../create/v2/modules/ui/entities/general_function';

@Injectable()
export class EntityBroadcastService {
    tenants: any;
    constructor(
        private fpSocketService: FPSocketService) {
        this.tenants = null;
    }

    getAllFPTenants() {

        return new Observable(observer => {
            if (this.tenants) {
                observer.next(JSON.parse(JSON.stringify(this.tenants)));
            } else {
                this.fpSocketService.getAllFPTenants(res => {
                    this.tenants = [];
                    res.forEach(t => {
                        if (t !== 'admin') {
                            this.tenants.push({
                                value: t,
                                title: t
                            });
                        }
                    });
                    observer.next(this.tenants);
                });
            }

        });
    }

    broadCastUpdatesTo(entityType: string, columnKey: string, items: any[], entityList: any[], generalFunctions: GeneralFunctions, tenants: string[]) {
        const udpatedItems = extractNameValues(columnKey, items, entityList, generalFunctions);
        let finishedTenents = 0;
        return new Observable(observer => {
            this.fpSocketService.putBroadcastEntitiesToClients(entityType, udpatedItems, tenants, data => {
                finishedTenents++;
                observer.next({
                    total: 'total' in data ? data.total : Object.keys(data).length, //data format is not same, used for single compelness and total completeness together
                    processed: finishedTenents
                });
                if (!('total' in data)) {
                    //we need to remove the event listener here, as it is long lasting ones
                    //and not closing when response finished
                    this.fpSocketService.closePutBroadcastEntitiesToClients();
                }

            });
        });
    }

    broadCastUpdates(entityType: string, columnKey: string, items: any[], entityList: any[], generalFunctions: GeneralFunctions) {
        const udpatedItems = extractNameValues(columnKey, items, entityList, generalFunctions);
        let finishedTenents = 0;
        return new Observable(observer => {
            this.fpSocketService.putBroadcastEntitiesToAllClients(entityType, udpatedItems, data => {
                finishedTenents++;
                observer.next({
                    total: 'total' in data ? data.total : Object.keys(data).length, //data format is not same, used for single compelness and total completeness together
                    processed: finishedTenents
                });
                if (!('total' in data)) {
                    //we need to remove the event listener here, as it is long lasting ones
                    //and not closing when response finished
                    this.fpSocketService.closePutBroadcastEntitiesToAllClients();
                }

            });
        });
    }
}

const extractNameValues = function(columnKey: string, items: any[], entityList: any[], generalFunctions: GeneralFunctions) {
    if (generalFunctions) {
        const velocityNames: string[] = [];
        const nonVelocityNames: string[] = [];
        items.forEach(item => {
            const foundFunction: GeneralFunction = generalFunctions.findById(item);
            if (foundFunction.isVelocity) {
                velocityNames.push(foundFunction.name);
            } else {
                nonVelocityNames.push(foundFunction.name);
            }
        });
        return {
            velocity: velocityNames,
            noneVelocity: nonVelocityNames
        };
    } else {
        if (columnKey === 'name') {
            return items;
        } else {
            const results: string[] = [];
            items.forEach(item => {
                for (let i = 0; i < entityList.length; i++) {
                    if (entityList[i][columnKey] === item) {
                        results.push(entityList[i]['name']);
                        break;
                    }
                }
            });
            return results;
        }
    }

};
