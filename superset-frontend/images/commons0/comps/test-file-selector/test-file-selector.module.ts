import { NgModule } from '@angular/core';
import { TestFileSelectorComponent } from './test-file-selector.component';
import { TestFileSelectorService } from './test-file-selector.service';
import { SharedModule } from '@src/app/modules/shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [TestFileSelectorComponent],
    exports: [TestFileSelectorComponent],
    providers: [TestFileSelectorService]
})
export class TestFileSelectorModule { }
