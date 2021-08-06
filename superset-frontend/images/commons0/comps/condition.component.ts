import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { I18NService } from '@shared/services/i18n.service';
import { Condition } from '@modules/feature-platform/modules/create/entities/condition';
import { Feature } from '@modules/feature-platform/modules/create/entities/feature';
import { Features } from '@modules/feature-platform/modules/create/entities/features';
import { RuleTemplates } from '@modules/feature-platform/modules/create/entities/rule_templates';
import { standardizeType } from '@modules/feature-platform/modules/commons/utils';
import { VelocityFeatureCreateCommmonService } from '../../create/commons/services/create-feature-common.service';
import { TransformFeatureService } from '@modules/feature-platform/modules/create/transform_feature/transform_feature.service';

@Component({
    selector: 'app-dv-condition',
    templateUrl: './condition.component.html',
    styleUrls: ['./condition.component.scss']
})
export class ConditionComponent {

    @Input() condition: Condition;
    @Input() viewOnly = false;
    features: Feature[];
    featuresObj: Features;
    paramTypes: any;
    ruleTemplates: RuleTemplates;

    placeholderAddAttribute;
    placeholderAddOperator;
    placeholderOperaType;
    placeholderOperaType_Feature;
    placeholderOperaType_CONSTANT;

    constructor(
        private tfService: TransformFeatureService,
        private commmonService: VelocityFeatureCreateCommmonService,
        public i18n: I18NService) {
        this.condition = null;
        this.features = this.commmonService.conditionFeatures;
        this.featuresObj = this.commmonService.conditionFeaturesObj;
        this.ruleTemplates = this.commmonService.conditionRuleTemplates;

        this.placeholderAddAttribute = this.i18n.trans('VF_ADD_ATT');
        this.placeholderAddOperator = this.i18n.trans('VF_ADD_OPERATOR');
        this.placeholderOperaType = i18n.trans('VF_CONDITION_OUTPUT');
        this.placeholderOperaType_Feature = i18n.trans('TF_SEL_INPUT_PARAM_TYPE_Feature');
        this.placeholderOperaType_CONSTANT = i18n.trans('TF_SEL_INPUT_PARAM_TYPE_CONSTANT');

        this.paramTypes = this.tfService.getParamTypes();

        setTimeout(() => {
            if (this.condition && this.ruleTemplates) {
                this.condition.availableOperators = this.ruleTemplates.filterByFeature(this.condition.attribute);
            }
        });
    }
    addCondition_att(e) {
        this.condition.availableOperators = null;
        setTimeout(() => {
            const selectedFeature = this.featuresObj.getFeatureById(e[0].id);
            this.condition.attribute = selectedFeature;
            this.condition.availableOperators = this.ruleTemplates.filterByFeature(selectedFeature);
        }, 0);
    }
    addCondition_ope(e) {
        this.condition.operator = this.ruleTemplates.filterById(e[0].id);
        // available fetures are based on template return type here
        setTimeout(() => {
            this.condition.availableValueFeatures =
                this.featuresObj.getFeaturesFor(this.condition.operator.secondArgumentType);
        }, 0);
    }
    selParamType(e) {
        this.condition.valueType = e;
    }
    selFeature(e) {
        this.condition.value = this.featuresObj.getFeatureById(e[0].id);
    }
    getType() {
        return standardizeType(this.condition.operator.secondArgumentType);
    }
    selConstantValue(e) {
        this.condition.value = e;
    }
}
