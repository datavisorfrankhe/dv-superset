export class NavigateItem {
    title: string;
    url: string;
    icon: string;

    constructor(data) {
        this.title = data.title || '';
        this.url = data.url || '';
        this.icon = data.icon || '';
    }
}
