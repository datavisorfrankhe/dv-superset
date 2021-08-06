import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NavigatorComponent } from './comps/navigator.component';
import { FeatureImportComponent } from './comps/feature_import.component';
import { FeatureImportExportService } from './feature_import_export.service';
import { EntityBroadcastComponent } from './comps/entity_broadcast.component';
import { EntityBroadcastService } from './comps/entity_broadcast.service';
import { PreviewFeatureComponent } from './comps/preview_feature.component';
import { ConditionsComponent } from './comps/conditions.component';
import { ConditionComponent } from './comps/condition.component';
import { EntityBroadcastSelectorComponent } from './comps/entity_broadcast_selector.component';
import { VersionSelectorComponent } from './comps/version_selector.component';
import { VersionSelectorDetailComponent } from '@src/app/modules/feature-platform/modules/commons/comps/version_selector_detail.component';
import { ValidateResultModule } from './validate_result/validate_result.module';
import { ImportExportService } from './import_export.service';
import { EntityImportComponent } from './comps/entity_importer.component';
import { FpErrorsComponent } from '@feature-platform/modules/commons/comps/fp-errors/fp-errors.component';
import { TestErrorComponent } from '@src/app/modules/feature-platform/modules/commons/comps/test_error.component';
import { VersionSelectorDetailOperatorComponent } from '@src/app/modules/feature-platform/modules/commons/comps/version_selector_detail_operator.component';
import { VersionSelectorDetailFeatureDefinitionComponent } from '@src/app/modules/feature-platform/modules/commons/comps/version_selector_detail_featuredefinition.component';
import { VersionSelectorDetailPackageComponent } from '@src/app/modules/feature-platform/modules/commons/comps/version_selector_detail_package.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestFileSelectorComponent } from '@src/app/modules/feature-platform/modules/commons/comps/test-file-selector/test-file-selector.component';
import { TestFileSelectorModule } from '@src/app/modules/feature-platform/modules/commons/comps/test-file-selector/test-file-selector.module';
import { DataSourceSelectorForFeaturesComponent } from '@src/app/modules/feature-platform/modules/commons/comps/ds-selector-for-features/ds-selector-for-features.component';
import { DsSelectorForFeatureService } from '@src/app/modules/feature-platform/modules/commons/comps/ds-selector-for-features/ds-selector-for-feature.service';
import { FeatureConverterService } from './feature_converter.service';
import { AccumulatorConditionTemplateTreeNodeComponent } from '../create/velocity_feature/accumulator-condition-template/accumulator-condition-template-tree-node.component';
import { AccumulatorConditionTemplateItemComponent } from '../create/velocity_feature/accumulator-condition-template/accumulator-condition-template-item.component';


@NgModule({
    declarations: [
        NavigatorComponent,
        FeatureImportComponent,
        EntityBroadcastComponent,
        PreviewFeatureComponent,
        ConditionsComponent,
        ConditionComponent,
        EntityBroadcastSelectorComponent,
        VersionSelectorComponent,
        VersionSelectorDetailComponent,
        VersionSelectorDetailOperatorComponent,
        VersionSelectorDetailFeatureDefinitionComponent,
        VersionSelectorDetailPackageComponent,
        EntityImportComponent,
        FpErrorsComponent,
        TestErrorComponent,
        DataSourceSelectorForFeaturesComponent,
        AccumulatorConditionTemplateTreeNodeComponent,
        AccumulatorConditionTemplateItemComponent
    ],
    entryComponents: [
        EntityBroadcastSelectorComponent,
        VersionSelectorDetailComponent,
        FpErrorsComponent,
        PreviewFeatureComponent
    ],
    imports: [
        SharedModule,
        ValidateResultModule,
        TestFileSelectorModule
    ],
    exports: [
        NavigatorComponent,
        FeatureImportComponent,
        EntityBroadcastComponent,
        PreviewFeatureComponent,
        ConditionsComponent,
        ConditionComponent,
        VersionSelectorComponent,
        ValidateResultModule,
        EntityImportComponent,
        TestErrorComponent,
        TestFileSelectorModule,
        DataSourceSelectorForFeaturesComponent,
        AccumulatorConditionTemplateTreeNodeComponent,
        AccumulatorConditionTemplateItemComponent
    ],
    providers: [
        FeatureImportExportService,
        EntityBroadcastService,
        ImportExportService,
        DsSelectorForFeatureService,
        FeatureConverterService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { } }
    ]
})
export class FeaturePlatformCommonModule { }
