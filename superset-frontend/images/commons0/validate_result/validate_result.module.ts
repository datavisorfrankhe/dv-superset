import { NgModule, Inject } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ValidateResultService } from './validate_result.service';
import { ValidateResultComponent } from './validate_result.component';
import { ValidateResultDetailsComponent } from './validate_result_details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { I18NService } from '@src/app/modules/shared/services/i18n.service';
@NgModule({
    declarations: [ValidateResultComponent, ValidateResultDetailsComponent],
    entryComponents: [ValidateResultDetailsComponent],
    imports: [
        SharedModule
    ],
    exports: [ValidateResultComponent],
    providers: [
        ValidateResultService
    ]
})
export class ValidateResultModule {


}
