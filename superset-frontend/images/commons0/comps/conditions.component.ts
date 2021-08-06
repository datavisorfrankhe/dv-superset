import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NewCondition, ConditionTerm } from '@modules/feature-platform/modules/create/entities/new_condition';
import { I18NService } from '@shared/services/i18n.service';
import { ToggleOption } from '@shared/comps/components/mat_button_toggle/dv-button-toggle.component';
import { Feature } from '@modules/feature-platform/modules/create/entities/feature';
import { Features } from '@modules/feature-platform/modules/create/entities/features';
import { RuleTemplates } from '@modules/feature-platform/modules/create/entities/rule_templates';

@Component({
    selector: 'app-dv-conditions',
    templateUrl: './conditions.component.html',
    styleUrls: ['./conditions.component.scss']
})
export class ConditionsComponent {

    @Input() conditions: any;
    @Input() totalLevels: number;
    @Input() currentLevel: number;
    @Input() viewOnly = false;
    conditionsOptions: ToggleOption[];
    loaded = false;

    toolTipRemoveCondition;
    toolTipRemoveBlock;

    constructor(public i18n: I18NService) {
        this.currentLevel = 0;
        this.conditionsOptions = [];
        this.conditionsOptions.push(new ToggleOption({
            value: ConditionTerm.AND, title: ConditionTerm.AND.toUpperCase()
        }));
        this.conditionsOptions.push(new ToggleOption({
            value: ConditionTerm.OR, title: ConditionTerm.OR.toUpperCase()
        }));
        this.toolTipRemoveBlock = this.i18n.trans('FP_VELOCITY_AGGREGATOR_RMV_BLOCK_TOOLTIP');
        this.toolTipRemoveCondition = this.i18n.trans('FP_VELOCITY_AGGREGATOR_RMV_CONDITION_TOOLTIP');

        setTimeout(() => {
            this.currentLevel++;
            //this is for initial display only, in order to remove all the children
            if (!this.isLeafObject(this.conditions) && this.currentLevel === 1 && this.isLeafObject(this.conditions.children[0])) {
                this.conditions.removeChild(this.conditions.children[0]);
            }
            this.loaded = true;
        });
    }
    remove(parentNode: NewCondition, childNode) {
        parentNode.removeChild(childNode);
    }
    removeSubChild(child: NewCondition, grandChild) {
        child.removeChild(grandChild);
        if (child.children.length === 0) {
            this.conditions.removeChild(child);
        }
    }

    get canAdd(): boolean {
        return this.currentLevel <= this.totalLevels;
    }

    isLeafObject = obj => {
        if (obj) {
            return !('children' in obj && 'condition' in obj);
        } else {
            return true;
        }
    }
}
