import { Injectable } from '@angular/core';
import { FPSocketService } from '@src/app/modules/shared/services/fp_socket.service';
import { Observable } from 'rxjs';
import { Accumulator } from '@src/app/modules/feature-platform/modules/create/entities/accumulator';
import { GeneralFeature, FEATURETYPE } from '@src/app/modules/feature-platform/modules/create/v2/modules/ui/entities/general_feature';
import { GeneralFunction } from '@src/app/modules/feature-platform/modules/create/v2/modules/ui/entities/general_function';
import { Features } from '@src/app/modules/feature-platform/modules/create/entities/features';
import { RuleTemplates } from '@src/app/modules/feature-platform/modules/create/entities/rule_templates';

@Injectable()
export class FeatureConverterService {

    constructor(private fpSocketService: FPSocketService) { }

    passedDirectlyFromApi = false;
    getUIFeatureObjById(id) {
        return new Observable(observer => {
            this.fpSocketService.getFetureById(id, data => {
                //if having dvTag, then using new solution,
                if (Array.isArray(data.attributeTags) && data.attributeTags.length > 0) {
                    this.passedDirectlyFromApi = true;
                    this._parseFetureData(data, id).subscribe((generalFeature: GeneralFeature) => {
                        observer.next(generalFeature);
                    });
                } else {
                    this.passedDirectlyFromApi = false;
                    //otherwise, fall back to old solution
                    this.fpSocketService._parseFeatureObject(data, id, obj => {
                        observer.next(new GeneralFeature(obj));
                    });
                }
            });
        });
    }

    _parseFetureData(dataObj, id) {
        let generalFeature: GeneralFeature = new GeneralFeature();
        return new Observable(observer => {
            if (this._isVelocity(dataObj)) {
                this._getVelocityFeatureAccumulatorAndFunction(dataObj.script).subscribe((results) => {
                    generalFeature.setVelocityFeatureObj(dataObj, {
                        accumulator: results[0],
                        velocityFunction: results[1],
                        features: results[2],
                        ruleTemplates: results[3],
                        window: results[4],
                        offset: results[5]
                    });
                    observer.next(generalFeature);
                });
            } else {
                if ('operatorArgs' in dataObj) {
                    //this is non-velocity feature, let's parse here
                    this._getNonVelocityDedpencencies(dataObj).subscribe(results => {
                        generalFeature.setNonVelocityFeatureObj(dataObj, {
                            featureTemplate: results[0]
                        });
                        observer.next(generalFeature);
                    });
                } else {
                    //otherwise, back to coding here
                    this.fpSocketService._parseFeatureObject(dataObj, id, obj => {
                        generalFeature = new GeneralFeature(obj);
                        //generalFeature.type = FEATURETYPE.CODING;
                        observer.next(generalFeature);
                    });
                }
            }
        });
    }


    _getNonVelocityDedpencencies(dataObj) {
        //1. get generalFunction
        const p0 = new Promise(resolver => {
            const id = JSON.parse(dataObj.content).selected_function.featureTemplate.id; // this needs to be updated by reading from dataObj direclty, not from content
            this.fpSocketService.getFeatureOperatorById(id, data => {
                resolver(new GeneralFunction({
                    velocityFunction: null,
                    featureTemplate: data
                }));
            });
        });
        return new Observable(observer => {
            Promise.all([p0]).then(results => {
                observer.next(results);
            });
        });
    }

    _getVelocityFeatureAccumulatorAndFunction(script: string) {
        return new Observable(observer => {
            // return $velocity(11, ip, 604800000, 0, time, "event_time", "count", "-1")
            //we need below four variables from velocity scripts, as they are not provided direclty
            const tmps = script.split('return $velocity(');
            const accId = parseInt(tmps[1].split(',')[0].trim(), 10);
            const velocityFunctionName = tmps[1].split(',')[6].split('"')[1];
            const window = parseInt(tmps[1].split(',')[2].trim(), 10);
            const offset = parseInt(tmps[1].split(',')[3].trim(), 10);
            const p1 = new Promise(resolver => {
                this.fpSocketService.sendGetAllVelocityAccumulators(data => {
                    resolver(data.find(item => item.accumulatorId === accId));
                });
            });
            const p2 = new Promise(resolver => {
                this.fpSocketService.getVelocityFunctionByName(velocityFunctionName, data => {
                    resolver(new GeneralFunction({
                        velocityFunction: data,
                        featureTemplate: null
                    }));
                });
            });
            const p3 = new Promise(resolver => {
                this.fpSocketService.sendGetAllFeatures(features => {
                    resolver(new Features(features));
                });
            });
            const p4 = new Promise(resolver => {
                this.fpSocketService.sendGetAllRuleTemplates(templates => {
                    resolver(new RuleTemplates(templates));
                });
            });
            Promise.all([p1, p2, p3, p4]).then(results => {
                observer.next([results[0], results[1], results[2], results[3], window, offset]);
            });
        });
    }

    _isVelocity(obj) {
        return 'script' in obj && obj.script.includes('$velocity(');
    }

}
