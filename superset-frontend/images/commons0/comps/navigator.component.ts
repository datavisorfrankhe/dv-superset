import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { I18NService } from '@services/i18n.service';
import { NavigateItem } from './navigator.entities';
import { StoreService } from '@services/redux/store.service';

@Component({
    selector: 'dv-fp-navigator',
    templateUrl: './navigator.component.html',
    styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnChanges {
    @Input() paths: NavigateItem[];
    pathsToDisplay: NavigateItem[];

    constructor(
        public storeService: StoreService,
        public i18n: I18NService,
    ) {
        this.paths = [];
        this.pathsToDisplay = [];
    }

    ngOnChanges(changes: SimpleChanges) {
        this.pathsToDisplay = [
            new NavigateItem({
                title: this.i18n.trans('FP_DASHBOARD'),
                url: 'home', icon: 'home'
            })
        ];
        this.paths.forEach(path => {
            this.pathsToDisplay.push(path);
        });
    }

    goTo(item: NavigateItem) {
        this.storeService.goToReplayHome();
        if (item.url === 'dcube') {
            this.i18n.navigate(['dcube']);
        } else if (item.url) {
            this.i18n.navigate(['feature_platform/' + item.url]);
        }
    }
}
