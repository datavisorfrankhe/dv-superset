import { Component, Input, Output, EventEmitter, ViewChild, Inject, AfterViewInit, SimpleChanges, OnChanges } from '@angular/core';
import { I18NService } from '@src/app/modules/shared/services/i18n.service';
import { FeatureDefinition } from '@src/app/modules/feature-platform/modules/feature_definitions/feature_definitions.entity';
import { VelocityFeatureCreateCommmonService } from '@src/app/modules/feature-platform/modules/create/commons/services/create-feature-common.service';

@Component({
    selector: 'app-version-selector-detail-featuredefinition',
    templateUrl: './version_selector_detail_featuredefinition.component.html',
    styleUrls: ['./version_selector_detail_featuredefinition.component.scss']
})
export class VersionSelectorDetailFeatureDefinitionComponent implements AfterViewInit, OnChanges {
    @Input() featureDefinition: FeatureDefinition;
    feature: any;
    featureType: string;
    constructor(
        public i18n: I18NService,
        public fcService: VelocityFeatureCreateCommmonService
    ) {
        this.feature = null;
        this.featureType = null;
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.fcService.setFeatureDefinitionDetail(this.featureDefinition, () => {
                this.triggerUpdate();
            });
        });
    }
    triggerUpdate() {
        this.feature = this.fcService.newFeature;
        this.featureType = this.fcService.featureType;
        switch (this.featureType) {
            case 'basic':
                this.feature = this.fcService.featureCreateRequest;
                break;
            default:
                this.feature = this.fcService.newFeature;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            'featureDefinition' in changes &&
            !changes.featureDefinition.firstChange &&
            changes.featureDefinition.currentValue !==
            changes.featureDefinition.previousValue
        ) {
            this.featureDefinition = changes.featureDefinition.currentValue;
            this.fcService.setFeatureDefinitionDetail(this.featureDefinition, () => {
                this.triggerUpdate();
            });
        }
    }

    typeOf(obj) {
        return typeof obj;
    }
    isArray(obj) {
        return Array.isArray(obj);
    }
}
