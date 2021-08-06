import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FileChooserPureComponent } from '@shared/comps/components/dv-file-chooser/file_chooser_pure.component';
import { I18NService } from '@services/i18n.service';
import { ImportExportService, IMPEXPENTITYTYPE } from '@src/app/modules/feature-platform/modules/commons/import_export.service';
import { StoreService } from '@src/app/modules/shared/services/redux/store.service';
import { RULES_ENGINE_ENTITY_TYPE } from '@src/app/modules/rules-engine/entities/entity_type';
import { RulesManagementService } from 'src/app/modules/rules-engine/components/rules/rules-management/rules-management.service';

@Component({
    selector: 'app-entity-importer',
    templateUrl: './entity-importer.component.html',
    styleUrls: ['../../../../../../scss/commons.scss'],
})
export class EntityImportComponent implements OnChanges {
    @Input() entityType;
    loadingStatus = 0;

    @ViewChild(FileChooserPureComponent) fileChooserPureComponent: FileChooserPureComponent;

    constructor(
        private storeService: StoreService,
        private importExportService: ImportExportService,
        private rmService: RulesManagementService,
        public i18n: I18NService
    ) {
        setTimeout(() => {
            this._updateRuleRuleSet();
        });
    }

    import() {
        if (this.loadingStatus === 0) {
            this.fileChooserPureComponent.readFileContentsForType(['json'], data => {
                this.loadingStatus = 1;
                this.importExportService.postImportEntities(data.data).subscribe(results => {
                    this.finish(results);
                });
            });
        }
    }

    async finish(results) {
        this.showSuccessMessage(results);
        //this is to guarantee backend cache is propogated
        const smallCacheWait = () => {
            return new Promise(resolver => {
                setTimeout(() => {
                    resolver();
                }, 500);
            });
        };
        await smallCacheWait();
        let url = '';
        switch (this.entityType) {
            case IMPEXPENTITYTYPE.FEATURE:
                url = 'feature_platform/list/features';
                break;
            case IMPEXPENTITYTYPE.OPERATOR:
                url = 'feature_platform/functions/list';
                break;
            case IMPEXPENTITYTYPE.FEATUREDEFINITION:
                url = 'feature_platform/feature_definitions';
                break;
            case IMPEXPENTITYTYPE.RULE:
                const ruleIds = results.map(rule => rule.id);
                await this.rmService.addRulesInCheckPoint(ruleIds, 'rt_rule_engine');
                url = 'rules_engine/home';
                break;
            case IMPEXPENTITYTYPE.RULE_SET:
                const rulesetIds = results.map(ruleset => ruleset.id);
                await this.rmService.addRuleSetsInCheckpoint(rulesetIds, 'rt_rule_engine');
                url = 'rules_engine/home';
                break;
            default:
                url = 'feature_platform/packages';
        }
        this.i18n.navigate(['']);
        setTimeout(() => {
            this.i18n.navigate([url]);
        });
    }

    showSuccessMessage(results) {
        if (isNaN(results)) {
            this.storeService.showMessage({
                title: this.i18n.trans('FP_ENTITY_IMPORT_SUCCESS_TITLE'),
                content: this.i18n.trans('FP_ENTITY_IMPORT_SUCCESS_CONTENT', results.length),
                type: 'SUCCESS',
            });
        } else {
            //this is for package import, which only return first package number
            this.storeService.showMessage({
                title: this.i18n.trans('FP_ENTITY_IMPORT_SUCCESS_TITLE'),
                content: this.i18n.trans('FP_ENTITY_IMPORT_SUCCESS_CONTENT_PACKAGE'),
                type: 'SUCCESS',
            });
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (
            'entityType' in changes &&
            !changes.entityType.firstChange &&
            changes.entityType.currentValue !== changes.entityType.previousValue
        ) {
            if (
                changes.entityType.currentValue === RULES_ENGINE_ENTITY_TYPE.AUTOMATED_RULES ||
                changes.entityType.currentValue === RULES_ENGINE_ENTITY_TYPE.GENERIC_RULES ||
                changes.entityType.currentValue === RULES_ENGINE_ENTITY_TYPE.RULE_SET
            ) {
                this.entityType = changes.entityType.currentValue;
                this._updateRuleRuleSet();
            }
        }
    }

    _updateRuleRuleSet() {
        if (this.entityType === RULES_ENGINE_ENTITY_TYPE.AUTOMATED_RULES || this.entityType === RULES_ENGINE_ENTITY_TYPE.GENERIC_RULES) {
            this.entityType = IMPEXPENTITYTYPE.RULE;
        } else if (this.entityType === RULES_ENGINE_ENTITY_TYPE.RULE_SET) {
            this.entityType = IMPEXPENTITYTYPE.RULE_SET;
        }
    }
}
