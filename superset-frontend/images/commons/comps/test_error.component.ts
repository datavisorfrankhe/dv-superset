import { Component, Input, AfterViewInit } from '@angular/core';
import { ReplayTask } from '@src/app/modules/feature-platform/modules/replay/commons/replay.entity';
import { I18NService } from '@src/app/modules/shared/services/i18n.service';

@Component({
    selector: 'app-test-error',
    templateUrl: './test_error.component.html',
    styleUrls: ['./test_error.component.scss']
})
export class TestErrorComponent implements AfterViewInit {

    @Input() replayTask: ReplayTask;
    constructor(public i18n: I18NService) {}

    ngAfterViewInit(): void {
        console.error(this.replayTask.standardApiError);
    }
}
