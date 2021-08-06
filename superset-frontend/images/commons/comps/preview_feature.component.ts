import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { I18NService } from '@shared/services/i18n.service';
import { Feature } from '../../create/entities/feature';
import { VelocityFeatureCreateCommmonService } from '../../create/commons/services/create-feature-common.service';
import { FeatureDefinition } from '../../feature_definitions/feature_definitions.entity';
import { AccessControlService } from '@shared/services/access-control.service';
import { ACCESSTASKS } from '@modules/access-control/entities/access-task';
import { FEATURETYPE, GeneralFeature } from '@src/app/modules/feature-platform/modules/create/v2/modules/ui/entities/general_feature';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthService } from '@src/app/modules/shared/auth/services/auth.service';
import { FeatureConverterService } from '@src/app/modules/feature-platform/modules/commons/feature_converter.service';
import { NewCondition } from '@src/app/modules/feature-platform/modules/create/entities/new_condition';
import { RulePackageTemplate } from '../../create/entities/rule_package_template';

@Component({
    selector: 'app-feature-preview',
    templateUrl: './preview_feature.component.html',
    styleUrls: ['./preview_feature.component.scss']
})
export class PreviewFeatureComponent {
    @Output() dvOnClose: EventEmitter<any> = new EventEmitter();
    @Input() defaultFeature: any;
    @Input() displayMode = 'normal'; // normal | simplified - this is used by dependencyGraph, no control button, with back button

    feature: any;
    featureType: string;
    categoryString: string;

    featureDefinition: boolean;
    accessTasks: any;
    scriptToShow: string;
    editable = true;
    passedInFD = null;

    preViewOnly = false;
    featureDefinitionCondition = null;
    constructor(
        private authService: AuthService,
        public accessControlService: AccessControlService,
        public i18n: I18NService,
        public fcService: VelocityFeatureCreateCommmonService,
        @Inject(MAT_DIALOG_DATA) public passedInData: any,
        public dialogRef: MatDialogRef<PreviewFeatureComponent>,
        private featureConverterService: FeatureConverterService,
    ) {
        this.defaultFeature = null;
        this.featureDefinition = false;
        this.accessTasks = ACCESSTASKS;
        setTimeout(() => {
            if (this.defaultFeature) {
                this.setSelected(this.defaultFeature);
            } else if (passedInData && passedInData.feature) {
                this.setSelected(passedInData.feature);
            } else if (passedInData && passedInData.featureDefinition) {
                this.passedInFD = passedInData.featureDefinition;
                this.setSelectedFeatureDefinition(passedInData.featureDefinition);
            }
            if (passedInData && 'preViewOnly' in passedInData) {
                this.preViewOnly = passedInData.preViewOnly;
            }
        });
    }

    setSelectedFeatureDefinition(featureDefinition: FeatureDefinition) {
        this.featureDefinition = true;
        try {
            this.featureDefinitionCondition = new RulePackageTemplate(featureDefinition.rulePackageTemplate).rawRuleTemplate.condition || null;
        } catch (e) {
            this.featureDefinitionCondition = null;
        }
        this.fcService.setFeatureDefinitionDetail(featureDefinition, () => {
            this.triggerUpdate();
            if (featureDefinition.createBy.toLowerCase() === 'datavisor' && this.authService.loggedInUser.company !== 'admin') {
                this.editable = false;
            }
        });
    }

    accumulatoConditions = null;
    updatedAccumulatorObj = null;
    passedInArguments = null;
    setSelected(feature: Feature) {
        if ('script' in feature) {
            this.scriptToShow = feature['script'];
        }
        this.featureConverterService.getUIFeatureObjById(feature.id).subscribe((gf: GeneralFeature) => {
            if (gf.contentObj && gf.contentObj.arguments) { this.passedInArguments = gf.contentObj.arguments; }
            if (gf.contentObj && gf.contentObj.accumulator) {
                this.accumulatoConditions = new NewCondition(gf.contentObj.accumulator._conditions);
                this.updatedAccumulatorObj = gf.contentObj.accumulator;
            }
            this.fcService.setFeatureDetail(feature, () => {
                if (feature.content !== '') {
                    this.triggerUpdate(gf);
                } else {
                    this.featureType = FEATURETYPE.SYSTEM;
                    //now using arguments to populate feature object
                    if (!('arguments' in feature) && 'arguments' in gf.contentObj) {
                        feature['arguments'] = gf.contentObj.arguments;
                    }
                    this.feature = feature;
                    if (this.scriptToShow) {
                        this.feature['script'] = this.scriptToShow;
                    }
                }
            });
        });
    }

    triggerUpdate(gf: GeneralFeature = null) {
        this.featureType = this.fcService.featureType;
        switch (this.featureType) {
            case 'basic':
                this.feature = this.fcService.featureCreateRequest;
                this.categoryString = this.fcService.featureCreateRequest.fraud_type;
                if (this.scriptToShow) {
                    this.feature['script'] = this.scriptToShow;
                }
                break;
            default:
                this.feature = this.fcService.newFeature;
                this.categoryString = this.fcService.newFeature.fraud_type.name;
                if (this.scriptToShow) {
                    this.feature['script'] = this.scriptToShow;
                }
        }
        //now using arguments to populate feature object
        if (this.featureConverterService.passedDirectlyFromApi && this.passedInArguments) {
            this.feature.arguments = this.passedInArguments;
        } else if (gf && !('arguments' in this.feature) && 'arguments' in gf.contentObj) {
            this.feature['arguments'] = gf.contentObj.arguments;
        } else if (gf && 'arguments' in this.feature && 'arguments' in gf.contentObj) {
            for (let i = 0; i < this.feature.arguments.length; i++) {
                if (i < gf.contentObj.arguments.length) {
                    this.feature.arguments[i]['argType'] =  gf.contentObj.arguments[i].argType;
                    this.feature.arguments[i]['argValue'] =  gf.contentObj.arguments[i].argValue;
                }
            }
        }
    }

    typeOf(obj) {
        return typeof obj;
    }

    closeme() {
        this.dialogRef.close();
    }

    test_me() {
        this.dialogRef.close(['test', this.feature]);
    }

    edit() {
        this.dialogRef.close(['edit', this.feature]);
    }

    editFeature(feature: Feature) {
        this.dialogRef.close(['edit', feature]);
    }

    isArray(t) {
        return Array.isArray(t);
    }

    isDvTag(data) {
        return typeof data === 'object' && '_usedByFeatures' in data;
    }

    back() {
        this.dvOnClose.emit();
    }
}
